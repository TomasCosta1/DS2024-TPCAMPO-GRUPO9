const express = require('express');
const pool = require('../config/database');
const router = express.Router();

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

            console.log("Contraseña enviada:", password);
            console.log("Contraseña almacenada:", userPassword);
            console.log("Tipo enviada:", typeof password);
            console.log("Tipo almacenada:", typeof userPassword);
            console.log("Longitud enviada:", password.length);
            console.log("Longitud almacenada:", userPassword.length);

            if (userPassword.trim() === password.trim()) {
                // Si coinciden, login exitoso


                return res.status(200).json({ success: true, message: "Inicio de sesión exitoso", name:user[0].name });
            } else {
                // Si no coinciden, devuelve error
                return res.status(401).json({ success: false, message: "Credenciales inválidas" });
            }
        } catch (error) {
            console.error("Error al verificar la contraseña:", error);
            return res.status(500).json({ message: "Error en el servidor" });
        }
    
});

router.get("/test", (req, res) => {
    res.send("Ruta de prueba funcionando");
});

module.exports = router;