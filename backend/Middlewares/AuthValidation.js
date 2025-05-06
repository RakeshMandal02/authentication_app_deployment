const joi = require('joi')
const registerValidation = (req, res, next) => {
    const schema = joi.object({
        username: joi.string().min(3).max(100).required(),
        email: joi.string().email().max(100).required(),
        password: joi.string().min(8).max(100).required()
    })

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400)
            .json({ message: error.details[0].message })
    }
    next()
}



const loginValidation = (req,res,next) => {
   const schema =  joi.object({
    email: joi.string().email().max(100).required(),
    password: joi.string().min(6).max(100).required()
})
    const{error} = schema.validate(req.body)
    if(error){
        return res.status(400)
        .json({message: error.details[0].message})
    }
    next()
}

module.exports = {
    registerValidation,
    loginValidation
}
