const express = require('express');
const pool = require('../config/database');
const router = express.Router();

router.get("/:email", async (req, res) => {
    const email = req.params.email;
    const query = "SELECT * FROM User WHERE email = ?";
    try {
        const response = await pool.query(query, [email]);
        const userData = {
            id: response[0][0].id,
            email: response[0][0].email,
            name: response[0][0].name,
            lastname: response[0][0].lastname,
            company: response[0][0].company,
            cuil: response[0][0].cuil,
            username: response[0][0].username,
            password: response[0][0].password,
            description: response[0][0].description,
            photo: response[0][0].photo
        }
        res.status(200).json({success: true, user: userData});
    } catch (error) {
        console.log('Error:', error);
        res.status(400).json({message: 'Error', error: error.message});
    }
})

module.exports = router;