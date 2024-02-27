const jwt = require('jsonwebtoken');

const createToken = (data) => {
    const token = jwt.sign(
        { data },
        "ARTWORK",
        { expiresIn: "10m" }
    );
    return token;
};

const checkToken = (token) => {
    return jwt.verify(token, "ARTWORK");
};

// decode token
const decodeToken = (token) => {
    return jwt.decode(token);
};

// khoá api và chặn ko cho người ngoài truy cập(bảo mật cấp 1)
const lockApi = (req, res, next) => {
    try {
        let { token } = req.headers;
        checkToken(token);
        next();
    } catch (exception) {
        res.status(401).send("No permission to get access!!");
    }
}


module.exports = { createToken, checkToken, decodeToken, lockApi };