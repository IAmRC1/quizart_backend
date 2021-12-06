import Category from "../models/category.js"

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({}).select("-sub_categories")
        res.success(res.statusCode, "all categories fetched!", categories)
    } catch (err) {
        res.error(res.statusCode, err.message)
    }
}

const createCategory = async (req, res) => {
    const category = new Category(req.body)
    try {
        const newCategory = await category.save()
        res.success(201, "category created!", newCategory)
    } catch (err) {
        res.error(res.statusCode, err.message)
    }
}

const getCategory = async (req, res) => {
    const { _id } = req.params
    try {
        const category = await Category.findById(_id)
        res.success(res.statusCode, "category fetched!", category)
    } catch (err) {
        res.error(res.statusCode, err.message)
    }
}

const updateCategory = async (req, res) => {
    const { _id } = req.params
    try {
        const category = await Category.findById(_id)
        if (category) {
            const updatedCategory = await Category.findByIdAndUpdate(_id, req.body, {
                new: true,
            })
            res.success(res.statusCode, "category updated!", updatedCategory)
        } else {
            res.error(404, "category not found!")
        }
    } catch (err) {
        res.error(res.statusCode, err.message)
    }
}

const deleteCategory = async (req, res) => {
    const { _id } = req.params
    try {
        await Category.findByIdAndRemove(_id)
        res.success(res.statusCode, "category deleted!")
    } catch (err) {
        res.error(res.statusCode, err.message)
    }
}

export { getAllCategories, createCategory, getCategory, updateCategory, deleteCategory }
