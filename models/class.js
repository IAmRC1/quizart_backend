import mongoose from "mongoose"
import { nanoid } from "nanoid"
import Joi from "joi"

export const classType = Joi.object({
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
    subjects: [],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
)

export default classSchema;