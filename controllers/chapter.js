import Category from "../models/category.js"

// Get all chapters under one subject
const getAllChapters = async (req, res) => {
    const { _category_id, _subcategory_id, _class_id, _subject_id } = req.query
    try {
        const category = await Category.findById(_category_id)
        if (category) {
            const subCategory = await category.sub_categories.id(
                _subcategory_id
            )
            if (subCategory) {
                const classes = await subCategory.classes.id(_class_id)
                if (classes) {
                    const subject = await classes.subjects.id(_subject_id)
                    if (subject) {
                        res.success(
                            res.statusCode,
                            "all chapters fetched!",
                            subject.chapters
                        )
                    } else {
                        res.error(res.statusCode, "subject not found!")
                    }
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

// Create a new chapter under one subject
const createChapter = async (req, res) => {
    const { _category_id, _subcategory_id, _class_id, _subject_id, ...rest } = req.body
    try {
        const category = await Category.findById(_category_id)
        if (category) {
            const subCategory = await category.sub_categories.id(_subcategory_id)
            console.log(`subCategory`, subCategory)
            if (subCategory) {
                const classes = await subCategory.classes.id(_class_id)
                console.log(`classes`, classes)
                if (classes) {
                    const subject = await classes.subjects.id(_subject_id)
                    console.log('subject', subject)
                    if (subject) {
                        await Category.updateOne(
                            {
                                _id: _category_id,
                            },
                            {
                                $push: {
                                    "sub_categories.$[i].classes.$[j].subjects.$[k].chapters":
                                        rest,
                                },
                            },
                            {
                                arrayFilters: [
                                    {
                                        "i._id": _subcategory_id,
                                    },
                                    {
                                        "j._id": _class_id,
                                    },
                                    {
                                        "k._id": _subject_id,
                                    },
                                ],
                            }
                        )
                        res.success(res.statusCode, "chapter created!")
                    } else {
                        res.error(res.statusCode, "subject not found!")
                    }
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

export { getAllChapters, createChapter }
