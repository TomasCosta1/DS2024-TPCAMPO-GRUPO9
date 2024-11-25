const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Obtener datos del usuario
router.get('/user/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM User WHERE id = ?', [1]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener datos del usuario' });
  }
});

// Actualizar datos del usuario
router.put('/user/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, correo, empresa, cuil, usuario, descripcion, contraseña } = req.body;
  try {
    await pool.query(
      'UPDATE User SET nombre = ?, apellido = ?, correo = ?, empresa = ?, cuil = ?, usuario = ?, descripcion = ?, contraseña = ? WHERE id = ?',
      [nombre, apellido, correo, empresa, cuil, usuario, descripcion, contraseña, id]
    );
    res.json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar datos del usuario' });
  }
});

module.exports = router;
