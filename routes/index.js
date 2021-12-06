import express from "express"
import categoryRoutes from "./category.js"
import subCategoryRoutes from "./subCategory.js"
import classRoutes from "./class.js"
import subjectRoutes from "./subject.js"
import chapterRoutes from "./chapter.js"
import questionRoutes from "./question.js"

const app = express()

app.use("/categories", categoryRoutes)
app.use("/subcategories", subCategoryRoutes)
app.use("/classes", classRoutes)
app.use("/subjects", subjectRoutes)
app.use("/chapters", chapterRoutes)
app.use("/questions", questionRoutes)
// app.use("/coupons", couponRoutes)

// Further routes can be added here

export default app
