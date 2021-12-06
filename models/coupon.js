import mongoose from "mongoose"
import { nanoid } from "nanoid"
import Joi from "joi"

export const couponType = Joi.object({
    code: Joi.alphanum().min(3).max(6).required(),
    d_percent: Joi.number().positive().required(),
    d_amount: Joi.number().positive().required(),
    is_active: Joi.boolean().required(),
}).xor("d_percent", "d_amount")

const { Schema } = mongoose

const couponSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => nanoid(),
    },
    code: String,
    d_percent: Number,
    d_amount: Number,
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

export default couponSchema;