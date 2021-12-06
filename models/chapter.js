import mongoose from "mongoose"
import { nanoid } from "nanoid"
import Joi from "joi"

export const chapterType = Joi.object({
	_category_id: Joi.string().required(),
	_subcategory_id: Joi.string().required(),
    _class_id: Joi.string().required(),
    _subject_id: Joi.string().required(),
	title: Joi.string().min(6).max(32).required(),
})

const { Schema } = mongoose

const chapterSchema = new Schema(
	{
		_id: {
			type: String,
			default: () => nanoid(),
		},
		title: String,
		questions: [{ type: String, ref: "Question" }],
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at",
		},
	}
)

export default chapterSchema;