const express = require('express');
const pool = require('../config/database');
const router = express.Router();

router.get('/', async (req, res) => {
    const query = 'SELECT * FROM RequirementType';

    try{
        const [results] = await pool.query(query);
        res.status(200).json(results);
    } catch(error){
        console.log('Error al buscar los tipos', error);
        res.status(400).json({message: 'Error al buscar los tipos', error: error.message});
    }
});

router.get('/:code', async (req, res) => {
    const { code } = req.params;
    const query = 'SELECT * FROM RequirementType WHERE code = ?';

    try{
        const [results] = await pool.query(query, [code]);
        res.status(200).json(results);
    } catch(error){
        console.log('Error al buscar el tipo', error);
        res.status(400).json({message: 'Error al buscar el tipo', error: error.message});
    }
})

module.exports = router;