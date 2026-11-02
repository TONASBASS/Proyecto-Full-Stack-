import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", (req, res) => {

    const { usuario, password } = req.body;

    if (
        usuario === "admin" &&
        password === "1234"
    ) {

        const token = jwt.sign(
            { usuario },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        return res.json({
            token
        });
    }

    res.status(401).json({
        mensaje: "Credenciales incorrectas"
    });
});

export default router;