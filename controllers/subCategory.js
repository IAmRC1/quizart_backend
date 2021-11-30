import Category from "../models/category.js"
import SubCategory from '../models/subCategory.js';

const getAllSubCategories = async (req, res) => {
    try {
        const subCategories = await SubCategory.find({})
        res.success(res.statusCode, "all subcategories fetched!", subCategories)
    } catch (err) {
        res.error(res.statusCode, err.message)
    }
}

const createSubCategory = async (req, res) => {
    const subCategory = await SubCategory(req.body)
    try {
        const category = await Category.findById({ _id: req.body._category_id })
        if(category){
            const newSubCategory = await subCategory.save()
            await Category.updateOne({ _id: req.body._category_id }, { $push: { sub_categories: newSubCategory._id } })
            res.success(res.statusCode, "subcategory created!", newSubCategory)
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
}