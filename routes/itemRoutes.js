import express from "express";
import Item from "../models/Item.js";

import verificarToken from "../middleware/authMiddleware.js";
import validarItem from "../middleware/validationMiddleware.js";

const router = express.Router();

/* CREATE */
/*router.post("/", async (req, res) => {*/


/* Protegemos create*/
/*router.post("/", verificarToken, async (req, res) => {  */


/* aqui modificamos para la validacion de l middleware*/ 
router.post("/", verificarToken, validarItem, async (req, res) => {  

    try {

        const nuevoItem = new Item(req.body);

        const itemGuardado =
            await nuevoItem.save();

        res.status(201).json(itemGuardado);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });
    }
});

/* READ */
router.get("/", async (req, res) => {

    try {

        const items =
            await Item.find();

        res.json(items);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });
    }
});

/* UPDATE */
/* router.put("/:id", async (req, res) => { */
/* protegemos update */

/*router.put("/:id", verificarToken, async (req, res) => { */

/* aqui modificamos para la validacion de l middleware*/ 
router.put("/:id", verificarToken, validarItem, async (req, res) => {   

    try {

        const itemActualizado =
            await Item.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

        res.json(itemActualizado);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });
    }
});

/* DELETE */
/*router.delete("/:id", async (req, res) => {*/
/* protegemos delete */
router.delete("/:id", verificarToken, async (req, res) => {

    try {

        await Item.findByIdAndDelete(
            req.params.id
        );

        res.json({
            mensaje: "Item eliminado correctamente"
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });
    }
});

export default router;
