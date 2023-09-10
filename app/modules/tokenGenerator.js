const jsonwebtoken = require('jsonwebtoken');

const tokenGenerator = (payload) => {
    const token = jsonwebtoken.sign(payload, process.env.SECRET_KEY, { expiresIn: '1 days' });
    return token;
};

module.exports = {
    tokenGenerator
};
