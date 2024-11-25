const express = require('express');
const pool = require('../config/database');
const router = express.Router();

router.get('/', async (req, res) => {
    const query = 'SELECT * FROM Comment';

    try{
        const [results] = await pool.query(query);
        res.status(200).json(results);
    } catch(error){
        console.log('Error al buscar los comentarios', error);
        res.status(400).json({message: 'Error al buscar los comentarios', error: error.message});
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Comment WHERE requirement_id = ?';

    try{
        const [results] = await pool.query(query, [id]);
        res.status(200).json(results);
    } catch(error){
        console.log('Error al buscar el comentario', error);
        res.status(400).json({message: 'Error al buscar el comentario', error: error.message});
    }
})

module.exports = router;