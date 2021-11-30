const responseHandler = (req, res, next) => {
    /**
     * Success response
     */
    res.success = (code = 200, message = "Success!", data = [], ...rest) =>
        res.json({
            code,
            message,
            error: false,
            result: {
                data,
                pagination: rest[0],
            },
        })
    /**
     * Error response
     */
    res.error = function (code = 500, message = "Error!", errors = {}) {
        return res.json({
            code,
            message,
            error: true,
            errors,
        })
    }
    /**
     * (status 403)
     * Forbidden request response
     */
    // res.forbidden = function({errors={}, code=403, message="", result={}}) {
    //     return res.status(403).error({ errors, code, message, result })
    // }

    /**
     * (status 401)
     * Unauthorize request response
     */
    // res.unauth = function({errors={}, code=401, message="", result={}}) {
    //     return res.status(401).error({ errors, code, message, result })
    // }

    /**
     * (status 500)
     * Internal request response
     */
    // res.ise = function(code = 500, message = "", errors = {}) {
    //     return res.sendStatus(500)
    // }
    next()
}

export default responseHandler
