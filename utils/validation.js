import Joi from 'joi';

const courseSchema = (req, res, next) => {
    const titleSchema = Joi.object({
        title: Joi.string().min(6).max(32).required(),
    });

    const result = titleSchema.validate(req.body);
    if (result.error) {
        return res.error(res.statusCode, "Validation Error!", result.error.details[0].message);
    }
    next();
};

export {
    courseSchema
}