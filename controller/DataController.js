const { User } = require("../models");
const { validateRequestBody, ValidateEmail, doesuserExist } = require("../validations/validator");

const createNewUser = async (req, res) => {
    try {
        const { username, email } = req.body;

        // Validate request body
        if (!(await validateRequestBody(username, email))) {
            return res.status(400).json({ message: "Username and email are required" });
        }

        // Validate email format
        if (!ValidateEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Check if the user already exists
        if (await doesuserExist(email)) { // Await correctly
            return res.status(400).json({ message: "Email already exists" });
        }

        // Create new user
        const user = await User.create({ username, email });

        res.status(200).json({ message: "User created successfully", user });

    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createNewUser };
