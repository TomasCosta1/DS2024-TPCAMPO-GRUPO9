const express = require('express');
const pool = require('../config/database');
const router = express.Router();

router.get('/', async (req, res) => {
    const query = 'SELECT * FROM Requirement';

    try{
        const [results] = await pool.query(query);
        res.status(200).json(results);
    } catch(error){
        console.log('Error al buscar los requerimientos', error);
        res.status(400).json({message: 'Error al buscar los requerimientos', error: error.message});
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Requirement WHERE id = ?';

    try{
        const [results] = await pool.query(query, [id]);
        res.status(200).json(results);
    } catch(error){
        console.log('Error al buscar el requerimiento', error);
        res.status(400).json({message: 'Error al buscar el requerimiento', error: error.message});
    }
});

router.post('/', async (req, res) => {
    const { subject, description, status_id, priority_id, category_id, user_id } = req.body;
    const query = 'INSERT INTO Requirement (subject, description, status_id, priority_id, category_id, user_id) VALUES (?, ?, ?, ?, ?, ?)';

    try{
        await pool.query(query, [subject, description, status_id, priority_id, category_id, user_id]);
        res.status(201).json({message: 'Requerimiento creado'});
    } catch(error){
        console.log('Error al crear el requerimiento', error);
        res.status(400).json({message: 'Error al crear el requerimiento', error: error.message});
    }
});

module.exports = router;