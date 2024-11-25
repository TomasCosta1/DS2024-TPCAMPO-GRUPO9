const express = require('express');
const pool = require('../config/database');
const router = express.Router();

router.get("/", async (req, res) => {
    const query = "SELECT * FROM User";
    const result = await pool.query(query);
    res.status(200).json({success: true, message: result})
})

router.get("/:email/:pass", async (req, res) => {
    const email = req.params.email;
    const password = req.params.pass;
    
        try {
            // Buscar el usuario por email
            const [user] = await pool.query("SELECT * FROM User WHERE email = ?", [email]);
            
            if (user.length === 0) {
                // Si no encuentra el usuario, devuelve error
                return res.status(404).json({ success: false, message: "Usuario no encontrado" });
            }
    
            const userPassword = user[0].password;

            if (userPassword.trim() === password.trim()) {
                // Si coinciden, login exitoso


                return res.status(200).json({ success: true, message: "Inicio de sesión exitoso", user:user[0] });
            } else {
                // Si no coinciden, devuelve error
                return res.status(401).json({ success: false, message: "Credenciales inválidas" });
            }
        } catch (error) {
            console.error("Error al verificar la contraseña:", error);
            return res.status(500).json({ message: "Error en el servidor" });
        }
    
});

router.put("/", async (req, res) => {
    const userData = req.body;
    const query = "UPDATE User SET username = ?, password = ?, email = ? WHERE id = ?"
    try {
        const response = await pool.query(query, [userData.username, userData.password, userData.email, userData.id]);
        res.status(200).json({success: true, message: "Datos Actualizados"})
    } catch (error) {
        console.log('Error:', error);
        res.status(400).json({message: 'Error', error: error.message});
    }
    
})

router.get("/test", (req, res) => {
    res.send("Ruta de prueba funcionando");
});

module.exports = router;