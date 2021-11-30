import Category from "../models/category.js"

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({}).populate({
            path: "sub_categories",
            select: "title"
        })
        res.success(res.statusCode, "all categories fetched!", categories)
    } catch (err) {
        res.error(res.statusCode, err.message)
    }
}

const createCategory= async (req, res) => {
    const category = new Category(req.body)
    try {
        const newCategory = await category.save()
        res.success(res.statusCode, "category created!", newCategory)
    } catch (err) {
        res.error(res.statusCode, err.message)
    }
}

export {
    getAllCategories,
    createCategory,
}
