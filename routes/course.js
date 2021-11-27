import express from "express"
import {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
} from "../controllers/course.js"
import { courseSchema } from "../utils/validation.js"

const courseRoutes = express.Router()

courseRoutes.get("/", getAllCourses)
courseRoutes.post("/", courseSchema, createCourse)

courseRoutes.get("/:id", getCourseById)
courseRoutes.put("/:id", updateCourse)
courseRoutes.delete("/:id", deleteCourse)

// Todo Add Swagger Docs

export default courseRoutes
