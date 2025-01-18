const bcrypt = require('bcrypt')

// Hash password
const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) throw err

            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err)
                }

                resolve(hash)

            })
        })
    })
}


// Compare passwords during login
const comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed)
}

module.exports = {
    hashPassword,
    comparePassword
}