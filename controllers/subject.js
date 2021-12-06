import Category from "../models/category.js";

// Get all subjects under one class
const getAllSubjects = async (req, res) => {
    const { _category_id, _subcategory_id, _class_id } = req.query
    try {
        const category = await Category.findById(_category_id)
        if(category){
            const subCategory = await category.sub_categories.id(_subcategory_id)
            if(subCategory){
                const classes = await category.sub_categories.classes(_class_id)
                if(classes){
                    res.success(res.statusCode, "all subjects fetched!", classes.subjects)
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

// Create one subject under one class
const createSubject = async (req, res) => {
    const { _category_id, _subcategory_id, _class_id, ...rest } = req.body
    try {
        const category = await Category.findById(_category_id)
        if(category){
            const subCategory = await category.sub_categories.id(_subcategory_id)
            if(subCategory){
                const classes = await subCategory.classes.id(_class_id)
                if(classes){
                    await Category.updateOne({ 
                        _id: _category_id, 
                    }, { 
                        $push: { 'sub_categories.$[i].classes.$[j].subjects': rest } 
                    }, {
                        arrayFilters: [{
                            "i._id": _subcategory_id
                        }, {
                            "j._id": _class_id
                        }]
                    })
                    res.success(res.statusCode, "subject created!")
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

export {
    getAllSubjects,
    createSubject,
}