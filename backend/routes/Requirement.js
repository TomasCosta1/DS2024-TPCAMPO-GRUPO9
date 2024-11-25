const express = require('express');
const pool = require('../config/database');
const router = express.Router();

const getSequenceNumber = async (year) => {
    const query = 'SELECT sequence_number FROM RequirementSequence WHERE year = ?';
    const result = await pool.query(query, [year]);
    
    if (result.length > 0 && result[0].length > 0) {
        console.log('Número secuencial obtenido:', result[0][0].sequence_number); // Mostrar el número secuencial
        return result[0][0].sequence_number; // El último número secuencial
    } else {
        console.log('No existe secuencia para este año. Inicializando desde 0');
        return 0; // Si no existe, inicializar el número secuencial en 0
    }
};

// Actualizar el número secuencial en la base de datos
const updateSequenceNumber = async (year, nextNumber) => {
    const query = 'UPDATE RequirementSequence SET sequence_number = ? WHERE year = ?';
    await pool.query(query, [nextNumber, year]);
    console.log('Número secuencial actualizado:', nextNumber);
};

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
    const { subject, description, status_id, priority_id, category_id, user_id, files, relatedReq } = req.body;
    const currentYear = new Date().getFullYear(); // Obtener el año actual
    
    try {
        // Obtener el número secuencial actual
        let sequenceNumber = await getSequenceNumber(currentYear);
        
        // Incrementar el número secuencial
        const nextNumber = sequenceNumber + 1;
        
        // Actualizar el número secuencial en la base de datos
        await updateSequenceNumber(currentYear, nextNumber);
        
        // Generar el nombre del requerimiento
        const requirementName = `REH-${currentYear}-${String(nextNumber).padStart(10, '0')}`;
        
        // Insertar el requerimiento en la tabla Requirement
        const query = 'INSERT INTO Requirement (name, subject, description, status_id, priority_id, category_id, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const [result] = await pool.query(query, [requirementName, subject, description, status_id, priority_id, category_id, user_id]);
        
        const requirementId = result.insertId;

        // Insertar archivos si hay
        if (files && files.length > 0) {
            const fileQueries = files.map(file => {
                return pool.query(
                    'INSERT INTO Attachment (requirement_id, name, size) VALUES (?, ?, ?)',
                    [requirementId, file.name, file.size]
                );
            });

            await Promise.all(fileQueries);
        }

        // Insertar requerimientos relacionados si los hay
        if (relatedReq && relatedReq.length > 0) {
            const relatedQueries = relatedReq.map(relatedId => {
                return pool.query(
                    'INSERT INTO RequirementRelationships (requirement_id_a, requirement_id_b) VALUES (?, ?)',
                    [requirementId, relatedId]
                );
            });

            await Promise.all(relatedQueries);
        }

        // Responder con el mensaje de éxito
        res.status(201).json({ message: 'Requerimiento creado', requirementId });
    } catch (error) {
        console.log('Error al crear el requerimiento:', error);
        res.status(400).json({ message: 'Error al crear el requerimiento', error: error.message });
    }
});

module.exports = router;