import mongoose from "mongoose"
import { nanoid } from "nanoid"
import Joi from "joi"
import subCategorySchema from "./subCategory.js"

export const categoryType = Joi.object({
    title: Joi.string().min(6).max(32).required(),
})

const { Schema } = mongoose

const categorySchema = new Schema(
  {
    _id: {
        type: String,
        default: () => nanoid(),
    },
    title: String,
    sub_categories: [subCategorySchema],
  },
  {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
  }
)

const Category = mongoose.model("Category", categorySchema)

export default Category
