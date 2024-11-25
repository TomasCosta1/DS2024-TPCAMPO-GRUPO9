const express = require('express');
const pool = require('../config/database');
const router = express.Router();

router.get('/', async (req, res) => {
    const query = 'SELECT * FROM Priority';

    try{
        const [results] = await pool.query(query);
        res.status(200).json(results);
    } catch(error){
        console.log('Error al buscar las categorías', error);
        res.status(400).json({message: 'Error al buscar las categorías', error: error.message});
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Priority WHERE id = ?';

    try{
        const [results] = await pool.query(query, [id]);
        res.status(200).json(results);
    } catch(error){
        console.log('Error al buscar la categoría', error);
        res.status(400).json({message: 'Error al buscar la categoría', error: error.message});
    }
})

module.exports = router;