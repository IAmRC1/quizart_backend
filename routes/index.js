import express from "express"
import categoryRoutes from "./category.js"
import subCategoryRoutes from "./subCategory.js"

const app = express()

app.use("/categories", categoryRoutes)
app.use("/subcategories", subCategoryRoutes)
// Further routes can be added here

export default app
