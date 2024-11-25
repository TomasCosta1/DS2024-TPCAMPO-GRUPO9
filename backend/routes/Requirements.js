const express = require('express');
const pool = require('../config/database');
const router = express.Router();

router.get('/:id', async (req, res) => {
    const userId = req.params.id
    try {
        const query = `
            SELECT r.id, r.name, r.created_at, r.subject, 
                p.description AS priority, 
                c.description AS category, 
                ct.description AS type, 
                s.description AS status
            FROM Requirement r
            LEFT JOIN Priority p ON r.priority_id = p.id
            LEFT JOIN Category c ON r.category_id = c.id
            LEFT JOIN RequirementType ct ON c.requirementType_code = ct.code
            LEFT JOIN Status s ON r.status_id = s.id
            WHERE user_id = ?;
        `;
        
        const [result] = await pool.query(query, userId);
        res.json(result);
    } catch (error) {
        console.log('Error al obtener los requerimientos:', error);
        res.status(500).json({ message: 'Error al obtener los requerimientos', error: error.message });
    }
});

module.exports = router;