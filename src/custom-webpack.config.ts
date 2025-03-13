const DOTENV = require('dotenv-webpack')

module.exports ={
    plugins: [
        new DOTENV({
            path: './.env',
            systemvars: true,
        })
        
    ],
}