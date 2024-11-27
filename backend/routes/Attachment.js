const express = require('express');
const pool = require('../config/database');
const router = express.Router();

router.get('/', async (req, res) => {
    const query = 'SELECT * FROM Attachment';

    try{
        const [results] = await pool.query(query);
        res.status(200).json(results);
    } catch(error){
        console.log('Error al buscar los adjuntos', error);
        res.status(400).json({message: 'Error al buscar los adjuntos', error: error.message});
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Attachment WHERE requirement_id = ?';

    try{
        const [results] = await pool.query(query, [id]);
        res.status(200).json(results);
    } catch(error){
        console.log('Error al buscar el adjunto', error);
        res.status(400).json({message: 'Error al buscar el adjunto', error: error.message});
    }
});

router.post('/', async (req, res) => {
    const { size, name, comment_id, requirement_id } = req.body;
    const query = 'INSERT INTO Attachment (size, name, comment_id, requirement_id) VALUES (?, ?, ?, ?)';

    try{
        await pool.query(query, [size, name, comment_id, requirement_id]);
        res.status(201).json({message: 'Adjunto creado'});
    } catch(error){
        console.log('Error al crear el adjunto', error);
        res.status(400).json({message: 'Error al crear el adjunto', error: error.message});
    }
});

module.exports = router;