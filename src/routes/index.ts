import { Application } from "express";
import { authRoutes } from "./auth.routes";
import { userRoutes } from "./user.routes";


const BASE_PATH = "/api/v1";

export default (app: Application) => {
  const routes = () => {
    app.use(`${BASE_PATH}/auth`, authRoutes.routes());
    app.use(`${BASE_PATH}/user`, userRoutes.routes());

  };
  routes();
};
