import mongoose from "mongoose"
import { nanoid } from "nanoid"
import Joi from "joi"
import subjectSchema from "./subject.js"

export const classType = Joi.object({
    _category_id: Joi.string().required(),
    _subcategory_id: Joi.string().required(),
    title: Joi.string().min(6).max(32).required(),
})

const { Schema } = mongoose

const classSchema = new Schema(
    {
        _id: {
            type: String,
            default: () => nanoid(),
        },
        title: String,
        subjects: [subjectSchema],
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
)

export default classSchema
