"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("./auth.route");
const apiRouter = (0, express_1.Router)();
apiRouter.use('/', (0, auth_route_1.authRouter)());
exports.default = apiRouter;
