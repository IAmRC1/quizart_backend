import mongoose from "mongoose"
import { nanoid } from "nanoid"
import Joi from "joi"
import classSchema from "./class.js"

export const subCategoryType = Joi.object({
  _category_id: Joi.string().required(),
  title: Joi.string().min(6).max(32).required(),
  description: Joi.string().min(32).max(256).required(),
  yearly_price: Joi.number().min(0).max(10000),
  is_active: Joi.boolean().required(),
  image_url: Joi.string().uri(),
})

const { Schema } = mongoose

const subCategorySchema = new Schema(
  {
    _id: {
      type: String,
      default: () => nanoid(),
    },
    title: String,
    description: String,
    yearly_price: {
      type: Number,
      default: 6500,
    },
    is_active: {
      type: Boolean,
      default: false,
    },
    image_url: {
      type: String,
      default: "https://picsum.photos/200",
    },
    classes: [classSchema],
  },
  {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
  }
)

export default subCategorySchema
