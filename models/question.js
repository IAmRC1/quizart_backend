import mongoose from "mongoose"
import { nanoid } from "nanoid"
import Joi from "joi"

export const questionType = Joi.object({
    _category_id: Joi.string().required(),
    _subcategory_id: Joi.string().required(),
    _class_id: Joi.string().required(),
    _subject_id: Joi.string().required(),
    _chapter_id: Joi.string().required(),
    title: Joi.string().min(8).max(128).required(),
    option_a: Joi.string().min(1).max(128).required(),
    option_b: Joi.string().min(1).max(128).required(),
    option_c: Joi.string().min(1).max(128).required(),
    option_d: Joi.string().min(1).max(128).required(),
    answer: Joi.string()
        .valid("option_a", "option_b", "option_c", "option_d")
        .required(),
    score: Joi.number().integer().min(1).max(10).required(),
    explanation: Joi.string().min(32).max(256),
    is_approved: Joi.boolean(),
})

const { Schema } = mongoose

const questionSchema = new Schema(
    {
        _chapter_id: String,
        _id: {
            type: String,
            default: () => nanoid(),
        },
        title: String,
        option_a: String,
        option_b: String,
        option_c: String,
        option_d: String,
        answer: String,
        score: Number,
        explanation: String,
        is_approved: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
)

const Question = mongoose.model("Question", questionSchema)

export default Question
