import Category from "../models/category.js"
import Question from "../models/question.js"

// Get all questions under one chapter
const getAllQuestions = async (req, res) => {
    const { chapterId } = req.params
    const questions = await Question.find({ chapter: chapterId })
    res.json(questions)
}

// Create question under one chapter
const createQuestion = async (req, res) => {
    const {
        _category_id,
        _subcategory_id,
        _class_id,
        _subject_id,
        _chapter_id,
        ...rest
    } = req.body
    const category = await Category.findById(_category_id)
    try {
        if (category) {
            const subCategory = await category.sub_categories.id(_subcategory_id)
            if (subCategory) {
                const classes = await subCategory.classes.id(_class_id)
                if (classes) {
                    const subject = await classes.subjects.id(_subject_id)
                    if (subject) {
                        const chapter = await subject.chapters.id(_chapter_id)
                        if (chapter) {
                            const newQuestion = new Question({
                                _chapter_id,
                                ...rest,
                            })
                            await Category.findOneAndUpdate(
                                {
                                    _id: _category_id,
                                    "sub_categories._id": _subcategory_id,
                                    "sub_categories.classes._id": _class_id,
                                    "sub_categories.classes.subjects._id": _subject_id,
                                    "sub_categories.classes.subjects.chapters._id": _chapter_id,
                                },
                                { $push: { questions: newQuestion._id } }
                            )
                            const new_question = await newQuestion.save()

                            res.success(res.statusCode, "question created!", new_question)
                        } else {
                            res.error(res.statusCode, "chapter not found!")
                        }
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

export { getAllQuestions, createQuestion }
