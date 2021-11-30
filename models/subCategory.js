import mongoose from "mongoose"
import { nanoid } from "nanoid"
import Joi from "joi"

export const subCategory = Joi.object({
  _category_id: Joi.string().alphanum().required(),
  title: Joi.string().min(6).max(32).required(),
})

const { Schema } = mongoose

const subCategorySchema = new Schema(
  {
    _category_id: String,
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
  },
  {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
  }
)

const SubCategory = mongoose.model("SubCategory", subCategorySchema)

export default SubCategory
