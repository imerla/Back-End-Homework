const jwt = require("jsonwebtoken")

function getToken(headers){
    if(!headers.authorization){
        return null
    }
    return headers.authorization.split(" ")[1]
}

async function isAuth(req, res, next){
    const token = getToken(req.headers)

    if(!token){
        return res.status(401).json({message: "Unauthorized", data: null})
    }
    
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = payload
        next()
    } catch (error) {
        return res.status(401).json({message: "Unauthorized", data: null})
    }
}

module.exports = isAuth
