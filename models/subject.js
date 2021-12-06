import mongoose from "mongoose"
import { nanoid } from "nanoid"
import Joi from "joi"
import chapterSchema from "./chapter.js"

export const subjectType = Joi.object({
    _category_id: Joi.string().required(),
    _subcategory_id: Joi.string().required(),
    _class_id: Joi.string().required(),
    title: Joi.string().min(6).max(32).required(),
})

const { Schema } = mongoose

const subjectSchema = new Schema(
    {
        _id: {
            type: String,
            default: () => nanoid(),
        },
        title: String,
        chapters: [chapterSchema],
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
)

export default subjectSchema
