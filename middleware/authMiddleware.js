import jwt from "jsonwebtoken";

const verificarToken = (req, res, next) => {

    const token =
        req.header("Authorization");

    if (!token) {

        return res.status(401).json({
            mensaje: "Acceso denegado"
        });
    }

    try {

        jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        next();

    } catch (error) {

        return res.status(401).json({
            mensaje: "Token inválido"
        });
    }
};

export default verificarToken;