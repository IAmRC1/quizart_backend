const errorCode = 422
const errorMessage = "Validation Error!"

const createValidator = (schema) => (payload) => schema.validate(payload)

const validation = (schema) => (req, res, next) => {
    const payload = req.body
    const result = createValidator(schema)(payload)
    if (result.error) {
        return res.error(errorCode, errorMessage, result.error.details[0].message)
    }
    next()
}

export default validation

// Used this to create a generic middleware https://mannhowie.com/express-validation
