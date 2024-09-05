const { Validator } = require('node-input-validator');

const BookCreate = {
    title: "required|string",
    author: "required|string",
    year: "required|integer",
    genre: "required|string",
};

// ne treba da ima required for UPDATE funkcija!
const BookUpdate = {
    author: "required|string",
    title: "string",
    year: "required|dateFormat:DD-MM-YYYY",   
    genre: "string",
};
// ne treba da ima required for UPDATE funkcija!

const validateBook = async (data, schema) => {
    const validator = new Validator(data, schema);
    const isValid = await validator.check();
    
    if (!isValid) {
        throw {
            code: 400,
            error: validator.errors,
        };
    }
};

module.exports = {
    BookCreate,
    BookUpdate,
    validateBook,
};