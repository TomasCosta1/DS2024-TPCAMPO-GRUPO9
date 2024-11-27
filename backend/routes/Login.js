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
            

            if (userPassword.trim() === password.trim()) {
                const userData = {
                    id: user[0].id,
                    email: user[0].email
                }
                // Si coinciden, login exitoso


                return res.status(200).json({ success: true, message: "Inicio de sesión exitoso", id:userData.id, email:userData.email });
            } else {
                // Si no coinciden, devuelve error
                return res.status(401).json({ success: false, message: "Credenciales inválidas" });
            }
        } catch (error) {
            console.error("Error al verificar la contraseña:", error);
            return res.status(500).json({ message: "Error en el servidor" });
        }
    
});

router.get("/:email", async (req, res) => {
    const email = req.params.email;
    const query = "SELECT * FROM User WHERE email = ?";
    try {
        const response = await pool.query(query, [email]);
        const userData = {
            id: response[0][0].id,
            email: response[0][0].email
        }
        res.status(200).json({success: true, id: userData.id, email: userData.email});
    } catch (error) {
        console.log('Error:', error);
        res.status(400).json({message: 'Error', error: error.message});
    }
})

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