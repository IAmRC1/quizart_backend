import express from "express"
import {
    getAllSubCategories,
    createSubCategory,
} from "../controllers/subCategory.js"
import validation from "../utils/validation.js"
import { subCategory } from "../models/subCategory.js"

const subCategoryRoutes = express.Router()

subCategoryRoutes.get("/", getAllSubCategories)
subCategoryRoutes.post("/", validation(subCategory), createSubCategory)

// Todo Add Swagger Docs

export default subCategoryRoutes
