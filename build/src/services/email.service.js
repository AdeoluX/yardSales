"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const handlebars_1 = __importDefault(require("handlebars"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const readHTMLFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs_1.default.readFile(filePath, { encoding: 'utf-8' }, (err, html) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(html);
            }
        });
    });
};
const sendEmail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ to, subject, templateName, replacements }) {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail', // you can use any email service
        auth: {
            user: 'd1headphones@gmail.com',
            pass: process.env.SMTP_PASSWORD,
        },
    });
    const templatePath = path_1.default.join(__dirname, `../templates/${templateName}.hbs`);
    const html = yield readHTMLFile(templatePath);
    const template = handlebars_1.default.compile(html);
    const htmlToSend = template(replacements);
    const mailOptions = {
        from: 'your-email@gmail.com',
        to,
        subject,
        html: htmlToSend,
    };
    try {
        const info = yield transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    }
    catch (error) {
        console.error('Error sending email: ', error);
    }
});
exports.sendEmail = sendEmail;
//# sourceMappingURL=email.service.js.map