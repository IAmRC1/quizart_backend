import Category from "../models/category.js"

// Get all subcategories under one category
const getAllSubCategories = async (req, res) => {
    const { _category_id } = req.query
    try {
        const category = await Category.findById(_category_id)
        if (category) {
            res.success(res.statusCode, "all subcategories fetched!", category.sub_categories)
        } else {
            res.error(404, "category not found!")
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
            const newSubCategory = await category.sub_categories.create(rest)
            await Category.updateOne(
                { _id: _category_id }, 
                { $push: { sub_categories: newSubCategory } })
            res.success(201, "subcategory created!", newSubCategory)
        } else {
            res.error(404, "category not found!")
        }
    } catch (err) {
        res.error(res.statusCode, err.message)
    }
}

// Get one subcategory under one category
const getSubCategory = async (req, res) => {
    const { _category_id, } = req.query
    const { _subcategory_id } = req.params
    try {
        const category = await Category.findById(_category_id)
        if (category) {
            const subCategory = await category.sub_categories.id(_subcategory_id)
            if (subCategory) {
                res.success(
                    res.statusCode,
                    "subcategory fetched!",
                    subCategory
                )
            } else {
                res.error(404, "subcategory not found!")
            }
        } else {
            res.error(404, "category not found!")
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
            res.error(404, "category not found!")
        }
    } catch (err) {
        res.error(res.statusCode, err.message)
    }
}

// Delete a subcategory under one category
const deleteSubCategory = async (req, res) => {
    const { _category_id } = req.query
    const { _subcategory_id } = req.params
    try {
        const category = await Category.findById(_category_id)
        if (category) {
            const newSubCategory = category.sub_categories.id(_subcategory_id)
            await Category.findByIdAndUpdate(
                _category_id,
                {
                    $pull: { sub_categories: { _id: _subcategory_id } },
                }
            )
            res.success(200, "subcategory deleted!", newSubCategory)
        } else {
            res.error(404, "category not found!")
        }
    } catch (err) {
        res.error(res.statusCode, err.message)
    }
}

export {
    getAllSubCategories,
    createSubCategory,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory,
}
