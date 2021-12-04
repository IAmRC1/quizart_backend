import express from "express"
import {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../controllers/category.js"
import validation from "../utils/validation.js"
import { categoryType } from "../models/category.js"

const categoryRoutes = express.Router()

categoryRoutes.get("/", getAllCategories)
categoryRoutes.post("/", validation(categoryType), createCategory)
// categoryRoutes.get("/:id", getCategory)
categoryRoutes.put("/:id", validation(categoryType), updateCategory)
categoryRoutes.delete("/:id", deleteCategory)

// Todo Add Swagger Docs

export default categoryRoutes
