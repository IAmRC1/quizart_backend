import mongoose from 'mongoose'
import { nanoid } from 'nanoid';

const { Schema } = mongoose

const courseSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => nanoid()
    },
    title: String,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
)

const Course = mongoose.model("Course", courseSchema)

export default Course
