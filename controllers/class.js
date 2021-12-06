import Category from "../models/category.js"

// Get all classes under one subcategory
const getAllClasses = async (req, res) => {
    const { _category_id, _subcategory_id } = req.query
    try {
        const category = await Category.findById(_category_id)
        if (category) {
            const subCategory = await category.sub_categories.id(_subcategory_id)
            if (subCategory) {
                res.success(res.statusCode, "all classes fetched!", subCategory.classes)
            } else {
                res.error(res.statusCode, "subcategory not found!")
            }
        } else {
            res.error(res.statusCode, "category not found!")
        }
    } catch (err) {
        res.error(res.statusCode, err.message)
    }
}

// Create a class under one subcategory
const createClass = async (req, res) => {
    const { _category_id, _subcategory_id, ...rest } = req.body
    try {
        const category = await Category.findById(_category_id)
        if (category) {
            const subCategory = await category.sub_categories.id(_subcategory_id)
            if (subCategory) {
                const newClass = await subCategory.classes.create(rest)
                await Category.updateOne(
                    { _id: _category_id, "sub_categories._id": _subcategory_id },
                    { $push: { "sub_categories.$.classes": newClass } }
                )
                res.success(res.statusCode, "class created!", newClass)
            } else {
                res.error(res.statusCode, "subcategory not found!")
            }
        } else {
            res.error(res.statusCode, "category not found!")
        }
    } catch (err) {
        res.error(res.statusCode, err.message)
    }
}

// Update a class under one subcategory
const updateClass = async (req, res) => {
    const { _category_id, _subcategory_id, _class_id, ...rest } = req.body
    try {
        const category = await Category.findById(_category_id)
        if (category) {
            const subCategory = await category.sub_categories.id(_subcategory_id)
            if (subCategory) {
                const classToUpdate = await subCategory.classes.id(_class_id)
                if (classToUpdate) {
                    const updatedClass = await classToUpdate.update(rest)
                    res.success(res.statusCode, "class updated!", updatedClass)
                } else {
                    res.error(res.statusCode, "class not found!")
                }
            } else {
                res.error(res.statusCode, "subcategory not found!")
            }
        } else {
            res.error(res.statusCode, "category not found!")
        }
    } catch (err) {
        res.error(res.statusCode, err.message)
    }
}

// Delete a class under one subcategory
const deleteClass = async (req, res) => {
    const { _category_id, _subcategory_id, _class_id } = req.query
    try {
        const category = await Category.findById(_category_id)
        if (category) {
            const subCategory = await category.sub_categories.id(_subcategory_id)
            if (subCategory) {
                const classToDelete = await subCategory.classes.id(_class_id)
                if (classToDelete) {
                    await classToDelete.remove()
                    res.success(res.statusCode, "class deleted!")
                } else {
                    res.error(res.statusCode, "class not found!")
                }
            } else {
                res.error(res.statusCode, "subcategory not found!")
            }
        } else {
            res.error(res.statusCode, "category not found!")
        }
    } catch (err) {
        res.error(res.statusCode, err.message)
    }
}

export { getAllClasses, createClass, updateClass, deleteClass }
