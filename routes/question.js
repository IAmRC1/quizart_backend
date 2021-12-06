import express from "express"
import {
    //     getAllQuestions,
    createQuestion,
    //     updateQuestion,
    //     deleteQuestion,
} from "../controllers/question.js"
import validation from "../utils/validation.js"
import { questionType } from "../models/question.js"

const questionRoutes = express.Router()

// questionRoutes.get("/", getAllQuestions)
questionRoutes.post("/", validation(questionType), createQuestion)
// // questionRoutes.get("/:id", getQuestion)
// questionRoutes.put("/:id", updateQuestion)
// questionRoutes.delete("/:id", deleteQuestion)

// Todo Add Swagger Docs

export default questionRoutes
