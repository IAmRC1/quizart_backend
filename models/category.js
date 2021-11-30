import mongoose from "mongoose"
import { nanoid } from "nanoid"
import Joi from "joi"

export const category = Joi.object({
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
    sub_categories: [{ type: String, ref: 'SubCategory' }]
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
