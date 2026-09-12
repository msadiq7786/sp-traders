import { Router } from "express";
import { getProducts } from "./products.controller.js";
import { requireAuth } from "../auth/auth.middleware.js";

export const productRouter = Router();

productRouter.use(requireAuth);

productRouter.get("/", getProducts); // public/user
