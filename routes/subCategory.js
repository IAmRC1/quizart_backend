import express from "express"
import {
    getAllSubCategories,
    createSubCategory,
    updateSubCategory,
    deleteSubCategory,
} from "../controllers/subCategory.js"
import validation from "../utils/validation.js"
import { subCategoryType } from "../models/subCategory.js"

const subCategoryRoutes = express.Router()

subCategoryRoutes.get("/", getAllSubCategories)
subCategoryRoutes.post("/", validation(subCategoryType), createSubCategory)
// subCategoryRoutes.get("/:id", getSubCategory)
subCategoryRoutes.put("/:id", updateSubCategory)
subCategoryRoutes.delete("/:id", deleteSubCategory)

// Todo Add Swagger Docs

export default subCategoryRoutes
