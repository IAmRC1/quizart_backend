import express from "express"
import {
    getAllSubjects,
    createSubject,
    getSubject,
    updateSubject,
    deleteSubject,
} from "../controllers/subject.js"
import validation from "../utils/validation.js"
import { subjectType } from "../models/subject.js"

const subjectRoutes = express.Router()

subjectRoutes.get("/", getAllSubjects)
subjectRoutes.post("/", validation(subjectType), createSubject)
subjectRoutes.get("/:id", getSubject)
subjectRoutes.patch("/:id", updateSubject)
subjectRoutes.delete("/:id", deleteSubject)

// Todo Add Swagger Docs

export default subjectRoutes
