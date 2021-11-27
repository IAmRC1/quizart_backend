import Course from "../models/course.js"

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({})
        res.success(res.statusCode, 'all courses fetched!', courses)
    } catch (err) {
        res.error(res.statusCode, err.message)
    }
}

const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
        res.success(res.statusCode, 'single course fetched!', course)
    } catch (err) {
        res.error(res.statusCode, err.message)
    }
}

const createCourse = async (req, res) => {
    const course = new Course(req.body)
    try {
        const newCourse = await course.save()
        res.success(res.statusCode, 'course created!', newCourse)
    }
    catch (err) {
        res.error(res.statusCode, err.message)
    }
}

const updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(course)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const deleteCourse = async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'Course deleted' })
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

export {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
}