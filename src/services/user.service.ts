import { IUser, UserModel } from "../models/user.schema";
import {Icheckin, IQuery, IReviewProducts, IUploadProduct, IUserLocation, ServiceRes} from"./types/auth.types";
import moment from 'moment';
import { IProduct, ProductModel } from "../models/product.schema";
import { ReviewModel } from "../models/review.schema";
import { uploadImage } from "../utils/cloudinary";
export class UserService {
    public async getUser(authorizer: any): Promise<ServiceRes> {
        const {id} = authorizer;
        const user = UserModel.findOne({_id: id})
        if(!user) return {
            success: false,
            message: 'Unauthorized access'
        }
        return {
            success: true,
            message: "Success",
            data: user
        }
    }

    public async seedUserAndProducts(): Promise<ServiceRes>{
        let newUser = await UserModel.findOne({
            email: "d1headphones@gmail.com",
        })

        if(!newUser){
            newUser = await UserModel.create({
                firstName: "Test",
                lastName: "Tester",
                middleName: "Testerer",
                email: "d1headphones@gmail.com",
                phoneNumber: "23408089344676",
                isComplete: true,
                location: {
                    "type": "Point",
                    "coordinates": [3.3792, 6.5244]
                }

            })
        }

        await ProductModel.deleteMany({
            user_id: newUser._id
        })

        await ProductModel.insertMany([
            {
              user_id: newUser._id,
              name: "Nike Air Max 270",
              price: 45000,
              currency: "NGN",
              image: "https://example.com/images/nike-air-max-270.jpg",
              category: 'fashion'
            },
            {
              user_id: newUser._id,
              "name": "Apple iPhone 13",
              "price": 450000,
              "currency": "NGN",
              "image": "https://example.com/images/iphone-13.jpg",
              category: 'gadget'
            },
            {
              user_id: newUser._id,
              "name": "Samsung 55\" 4K TV",
              "price": 230000,
              "currency": "NGN",
              "image": "https://example.com/images/samsung-4k-tv.jpg",
              category: 'gadget'
            },
            {
              user_id: newUser._id,
              "name": "PlayStation 5",
              "price": 300000,
              "currency": "NGN",
              "image": "https://example.com/images/ps5.jpg",
              category: 'gadget'
            },
            {
              user_id: newUser._id,
              "name": "LG Washing Machine",
              "price": 150000,
              "currency": "NGN",
              "image": "https://example.com/images/lg-washing-machine.jpg",
              category: 'gadget'
            },
            {
               user_id: newUser._id,
              "name": "Adidas Ultraboost",
              "price": 38000,
              "currency": "NGN",
              "image": "https://example.com/images/adidas-ultraboost.jpg",
              category: 'fashion'
            },
            {
               user_id: newUser._id,
              "name": "Sony WH-1000XM4 Headphones",
              "price": 120000,
              "currency": "NGN",
              "image": "https://example.com/images/sony-headphones.jpg",
              category: 'gadget'
            },
            {
               user_id: newUser._id,
              "name": "Dell XPS 13 Laptop",
              "price": 550000,
              "currency": "NGN",
              "image": "https://example.com/images/dell-xps-13.jpg",
              category: 'gadget'
            },
            {
               user_id: newUser._id,
              "name": "Beats Studio Buds",
              "price": 75000,
              "currency": "NGN",
              "image": "https://example.com/images/beats-studio-buds.jpg",
              category: 'gadget'
            },
            {
               user_id: newUser._id,
              "name": "HP LaserJet Printer",
              "price": 85000,
              "currency": "NGN",
              "image": "https://example.com/images/hp-laserjet.jpg",
              category: 'gadget'
            }
        ])
        return {
            success: true,
            message: "Seeded successfully."
        }
    }

    public async viewProducts({params = null, query}: {params: string | null; query: IQuery }): Promise<ServiceRes>{
        const searchQuery = {
            ...((query?.startDate && query?.endDate) && { createdAt : {
                $gte: new Date(query.startDate),
                $lte: new Date(query.endDate)
            }}),
            ...(query?.search && {name: { $regex: query.search, $options: 'i' }}),
            ...(params && {category: params})
        }
        const products = await ProductModel.find(searchQuery)
                                           .skip(query?.skip)  // Skip the number of documents
                                           .limit(query.perPage) // Limit the number of documents returned
                                           .exec();
        const countProducts = await ProductModel.countDocuments(searchQuery)
        return {
            success: true,
            message: "Products gotten successfully",
            data: products,
            options: {
                currentPage: query.page,
                totalCount: countProducts,
                totalPages: Math.ceil(countProducts/query.perPage)
            }
        }
    }

    public async productsNearby({authorizer, query, params = null}: {authorizer: any; query: IQuery; params: string | null;}) : Promise<ServiceRes>{
        const { id } = authorizer;
        const user = await UserModel.findById(id)
        let selectQuery = {
            location: {
              $near: {
                $geometry: {
                  type: 'Point',
                  coordinates: [user?.location?.coordinates?.[0], user?.location?.coordinates?.[1]]  // Coordinates as [longitude, latitude]
                },
                $maxDistance: 3000  // Search within this distance in meters
              }
            }
        }
        const nearbyUsers: IUser[] = await UserModel.find(selectQuery).select('_id');

        const userIds: string[] = nearbyUsers.map(user => user._id.toString());
        const products: IProduct[] = await ProductModel.find({
            user_id: { $in: userIds },
            ...((query?.startDate && query?.endDate) && { createdAt : {
                $gte: new Date(query.startDate),
                $lte: new Date(query.endDate)
            }}),
            ...(params && {category: params}),
            ...(query?.search && {name: { $regex: query.search, $options: 'i' }}),
        }).skip(query?.skip)  // Skip the number of documents
          .limit(query.perPage) // Limit the number of documents returned
          .exec();  // Optionally populate user details
        console.log(products)
        return {
            success: true,
            message: "Products gotten successfully.",
            data: products
        };
    }

    public async viewProduct(id: string) : Promise<ServiceRes>{
        const product = await ProductModel.findById(id)
        if(!product) return {
            success: false,
            message: 'Product not found'
        }
        const reviews = await ReviewModel.find({
            product: id
        })
        const reviewCount = await ReviewModel.countDocuments({
            product: id
        })
        const ratingsSum: any = await ReviewModel.aggregate([
            {
              $group: {
                _id: null, // Group all documents (null groups them all)
                totalRatings: { $sum: "$rating" } // Sum the salary field
              }
            }
          ])
        const sumOfRatings = ratingsSum[0]?.totalRatings
        return {
            success: true,
            data: product,
            options: { reviews, averageRatings: sumOfRatings/reviewCount }
        }
    }

    public async reviewProduct(payload: IReviewProducts) : Promise<ServiceRes>{
        const { comment, rating, authorizer, product } = payload;
        const { id } = authorizer;
        let review = await ReviewModel.findOne({
            user: id,
            product
        })
        if(review){
            await ReviewModel.deleteOne({
                user: id,
                product
            })
        }
        review = await ReviewModel.create({
            comment, rating, user: id, product
        })
        return {
            success: true,
            data: { review: review.toJSON() }
        }
    }

    public async uploadProduct(payload: IUploadProduct) : Promise<ServiceRes>{
        const { authorizer, ...rest } = payload;
        const { id } = authorizer;
        const user = await UserModel.findById(id);
        if(!user) return {
            success: false,
            message: "User not found."
        }
        const folder = 'products'
        let image: string | string[]
        if (Array.isArray(rest?.image)) {
            image = []
            for(let item of rest.image){
                const secureUrl = await uploadImage(item, folder)
                image.push(secureUrl)
            }
        } else {
            image = await uploadImage(rest.image, folder)
        }
        const product = await ProductModel.create({...rest, image, user_id: id})
        return {
            success: true,
            message: "Product created successfully",
            data: product.toJSON()
        }
    }

    public async updateUserLocation(payload: IUserLocation)  : Promise<ServiceRes> {
        const { id } = payload.authorizer;
        const { authorizer, ...rest } = payload;
        const user = await UserModel.findById(id)
        if(!user) return {
            success: false,
            message: "User does not exist."
        }
        const newUser = await UserModel.findOneAndUpdate({_id: id}, {location: rest}, { new: true })
        return {
            success: true,
            message: "Location added successfully",
            data: { data : newUser?.toJSON()}
        }
    }

}