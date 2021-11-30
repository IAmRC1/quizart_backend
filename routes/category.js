import express from "express"
import {
    getAllCategories,
    createCategory,
} from "../controllers/category.js"
import validation from "../utils/validation.js"
import { category } from "../models/category.js"

const categoryRoutes = express.Router()

categoryRoutes.get("/", getAllCategories)
categoryRoutes.post("/", validation(category), createCategory)

// Todo Add Swagger Docs

export default categoryRoutes
