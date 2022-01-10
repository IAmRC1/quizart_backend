import express from "express"
import {
    getAllChapters,
    createChapter,
    getChapter,
    updateChapter,
    deleteChapter,
} from "../controllers/chapter.js"
import validation from "../utils/validation.js"
import { chapterType } from "../models/chapter.js"

const chapterRoutes = express.Router()

chapterRoutes.get("/", getAllChapters)
chapterRoutes.post("/", validation(chapterType), createChapter)
chapterRoutes.get("/:id", getChapter)
chapterRoutes.patch("/:id", updateChapter)
chapterRoutes.delete("/:id", deleteChapter)

// Todo Add Swagger Docs

export default chapterRoutes
