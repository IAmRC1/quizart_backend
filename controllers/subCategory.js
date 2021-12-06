import Category from "../models/category.js"

// Get all subcategories under one category
const getAllSubCategories = async (req, res) => {
    const { _category_id } = req.query
    try {
        const category = await Category.findById(_category_id)
        if (category) {
            res.success(
                res.statusCode,
                "all subcategories fetched!",
                category.sub_categories
            )
        } else {
            res.error(res.statusCode, "category not found!")
        }
    } catch (err) {
        res.error(res.statusCode, err.message)
    }
}

// Create a new subcategory under one category
const createSubCategory = async (req, res) => {
    const { _category_id, ...rest } = req.body
    try {
        const category = await Category.findById(_category_id)
        if (category) {
            await Category.updateOne(
                { _id: _category_id },
                { $push: { sub_categories: rest } }
            )
            res.success(res.statusCode, "subcategory created!")
        } else {
            res.error(res.statusCode, "category not found!")
        }
    } catch (err) {
        res.error(res.statusCode, err.message)
    }
}

// Update a subcategory under one category
const updateSubCategory = async (req, res) => {
    const { _category_id, ...rest } = req.body
    try {
        const category = await Category.findById(_category_id)
        if (category) {
            const updatedCategory = await Category.findByIdAndUpdate(_category_id, {
                $set: { "sub_categories.$": rest },
            })
            res.success(res.statusCode, "subcategory updated!", updatedCategory)
        } else {
            res.error(res.statusCode, "category not found!")
        }
    } catch (err) {
        res.error(res.statusCode, err.message)
    }
}

// Delete a subcategory under one category
const deleteSubCategory = async (req, res) => {
    const { _category_id, _id } = req.query
    try {
        const category = await Category.findById(_category_id)
        if (category) {
            const newSubCategory = await Category.findByIdAndUpdate(_category_id, {
                $pull: { sub_categories: { _id } },
            })
            res.success(res.statusCode, "subcategory deleted!", newSubCategory)
        } else {
            res.error(res.statusCode, "category not found!")
        }
    } catch (err) {
        res.error(res.statusCode, err.message)
    }
}

export {
    getAllSubCategories,
    createSubCategory,
    updateSubCategory,
    deleteSubCategory,
}
