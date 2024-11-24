const express = require('express');
const pool = require('../config/database');
const router = express.Router();

router.get('/', async (req, res) => {
    const query = 'SELECT * FROM Category';

    try{
        const [results] = await pool.query(query);
        res.status(200).json(results);
    } catch(error){
        console.log('Error al buscar las categorías', error);
        res.status(400).json({message: 'Error al buscar las categorías', error: error.message});
    }
})

module.exports = router;