const express = require('express');
const pool = require('../config/database');
const router = express.Router();

router.get('/:id', async (req, res) => {
    const userId = req.params.id
    try {
        const query = `
            SELECT r.id, r.name, r.created_at, r.subject, 
                r.user_id,
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
        console.error('Error al obtener los requerimientos:', error);
        res.status(500).json({ message: 'Error al obtener los requerimientos', error: error.message });
    }
});

router.get('/', async (req, res) => {
    const { name, category, priority, type, created_at, page, limit = 10, user_id } = req.query;

    if (!user_id) {
        return res.status(400).json({ message: 'El user_id es obligatorio.' });
    }

    const offset = (page - 1) * limit;

    try {
        let query = `
            SELECT r.id, r.name, r.created_at, r.subject, 
                r.user_id,
                p.description AS priority, 
                c.description AS category, 
                ct.description AS type, 
                s.description AS status
            FROM Requirement r
            LEFT JOIN Priority p ON r.priority_id = p.id
            LEFT JOIN Category c ON r.category_id = c.id
            LEFT JOIN RequirementType ct ON c.requirementType_code = ct.code
            LEFT JOIN Status s ON r.status_id = s.id
            WHERE r.user_id = ?
        `;

        const params = [user_id];

        if (name) {
            query += ' AND r.name LIKE ?';
            params.push(`%${name}%`);
        }
        if (category) {
            query += ' AND c.description LIKE ?';
            params.push(`%${category}%`);
        }
        if (priority) {
            query += ' AND p.description LIKE ?';
            params.push(`%${priority}%`);
        }
        if (type) {
            query += ' AND ct.description LIKE ?';
            params.push(`%${type}%`);
        }

        query += ' LIMIT ? OFFSET ?';
        params.push(parseInt(limit), parseInt(offset));

        const [results] = await pool.query(query, params);

        // Total de resultados
        const [totalResults] = await pool.query(
            `
            SELECT COUNT(*) AS total FROM Requirement r
            LEFT JOIN Priority p ON r.priority_id = p.id
            LEFT JOIN Category c ON r.category_id = c.id
            LEFT JOIN RequirementType ct ON c.requirementType_code = ct.code
            LEFT JOIN Status s ON r.status_id = s.id
            WHERE r.user_id = ?
        `,
            params.slice(0, -2) 
        );

        res.json({
            data: results,
            total: totalResults[0].total,
            page: parseInt(page),
            limit: parseInt(limit),
        });
    } catch (error) {
        console.error('Error al obtener los requerimientos:', error);
        res.status(500).json({ message: 'Error al obtener los requerimientos', error: error.message });
    }
});



module.exports = router;