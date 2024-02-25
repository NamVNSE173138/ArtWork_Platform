const jwt = require('jsonwebtoken');

const createToken = (data) => {
    const token = jwt.sign(
        { data },
        "ARTWORK",
        { expiresIn: "5y" }
    );
    return token;
};


module.exports = createToken;