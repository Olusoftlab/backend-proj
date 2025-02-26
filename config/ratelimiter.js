const rateLimit = require("express-rate-limit")

const rateLimiter = rateLimit({

    windowMs: 50000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next) => {

        const resetTime = req.rateLimit.reset
        const retryAfter = resetTime / 1000

        res.status(429).header("Retry-After", retryAfter).json({

            error: "time limit exceeded",
            message: "request limit exceeded, try again",
            retryAfter: `retry after 50s`  //retry time calculated =50000ms/1000
        })

    }
})

module.exports = rateLimiter