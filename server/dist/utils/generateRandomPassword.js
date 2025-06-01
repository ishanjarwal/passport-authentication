"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generateRandomPassword;
function generateRandomPassword(length = 8) {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * letters.length);
        password += letters[randomIndex];
    }
    return password;
}
