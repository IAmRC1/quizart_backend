import express from "express"
import {
    getAllClasses,
    createClass,
    getClass,
    updateClass,
    deleteClass,
} from "../controllers/class.js"
import validation from "../utils/validation.js"
import { classType } from "../models/class.js"

const classRoutes = express.Router()

classRoutes.get("/", getAllClasses)
classRoutes.post("/", validation(classType), createClass)
classRoutes.get("/:id", getClass)
classRoutes.patch("/:id", updateClass)
classRoutes.delete("/:id", deleteClass)

// Todo Add Swagger Docs

export default classRoutes
