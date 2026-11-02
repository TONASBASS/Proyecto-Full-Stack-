const validarItem = (req, res, next) => {

    const { nombre, descripcion } = req.body;

    if (!nombre || !descripcion) {

        return res.status(400).json({
            mensaje: "Nombre y descripción son obligatorios"
        });
    }

    next();
};

export default validarItem;
