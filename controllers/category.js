import Category from "../models/category.js"

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({})
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

const updateCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params._id)
        if (!category) {
            res.error(res.statusCode, "category not found!")
        } else {
            const updatedCategory = await Category.updateOne(req.params._id, req.body, { new: true })
            res.success(res.statusCode, "category updated!", updatedCategory)
        }
    } catch (err) {
        res.error(res.statusCode, err.message)
    }
}

const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params._id)
        if (!category) {
            res.error(res.statusCode, "category not found!")
        } else {
            await category.remove()
            res.success(res.statusCode, "category deleted!")
        }
    } catch (err) {
        res.error(res.statusCode, err.message)
    }
}

export {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
}
