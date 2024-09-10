"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_routes_1 = require("./auth.routes");
const company_routes_1 = require("./company.routes");
const user_routes_1 = require("./user.routes");
const BASE_PATH = "/api/v1";
exports.default = (app) => {
    const routes = () => {
        app.use(`${BASE_PATH}/auth`, auth_routes_1.authRoutes.routes());
        app.use(`${BASE_PATH}/company`, company_routes_1.companyRoutes.routes());
        app.use(`${BASE_PATH}/user`, user_routes_1.userRoutes.routes());
    };
    routes();
};
//# sourceMappingURL=index.js.map