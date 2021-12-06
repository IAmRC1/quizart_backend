import express from "express"
import {
    getAllSubCategories,
    createSubCategory,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory,
} from "../controllers/subCategory.js"
import validation from "../utils/validation.js"
import { subCategoryType } from "../models/subCategory.js"

const subCategoryRoutes = express.Router()

subCategoryRoutes.get("/", getAllSubCategories)
subCategoryRoutes.post("/", validation(subCategoryType), createSubCategory)
subCategoryRoutes.get("/:_subcategory_id", getSubCategory)
subCategoryRoutes.patch("/:_subcategory_id", updateSubCategory)
subCategoryRoutes.delete("/:_subcategory_id", deleteSubCategory)

// Todo Add Swagger Docs

export default subCategoryRoutes
