import express from "express"
import {
    getAllSubjects,
    createSubject,
    // updateSubject,
    // deleteSubject,
} from "../controllers/subject.js"
import validation from "../utils/validation.js"
import { subjectType } from "../models/subject.js"

const subjectRoutes = express.Router()

subjectRoutes.get("/", getAllSubjects)
subjectRoutes.post("/", validation(subjectType), createSubject)
// subjectRoutes.get("/:id", getSubject)
// subjectRoutes.put("/:id", updateSubject)
// subjectRoutes.delete("/:id", deleteSubject)

// Todo Add Swagger Docs

export default subjectRoutes
