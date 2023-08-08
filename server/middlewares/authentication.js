const jwt = require('jsonwebtoken');
const env = require('dotenv')
env.config({ path: '.env.local' });



const checkAuthentication = async (req, res, next) => {

    if (!req.headers.authorization) {

        console.log('----------------');
        return res.status(403).json({ message: "Unauthorized user." })
    }
    // console.log(req.headers.authorization);
    // console.log(req.headers.authorization.split(" ")[1]);





    try {
        // console.log('------1-');
        const decodedUser = jwt.verify(req.headers.authorization.split(" ")[1], 'thisismysecretcode')
        // console.log(decodedUser);
        console.log('next auth');
        next()


    }
    catch (error) {
        console.log(error.message);

        return res.status(401).json({
            message: "Unauthorized user."
        })

    }




}

module.exports = { checkAuthentication: checkAuthentication }

