import conectarDB from "./config/DB.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";


dotenv.config();
console.log(process.env.MONGODB_URI)
conectarDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);


/* Ruta para probar el middleware de errores */
app.get("/error", (req, res, next) => {

    next(new Error("Error de prueba"));

});


/* Middleware de errores */
app.use(errorHandler);

app.get("/", (req, res) => {
    res.send("Servidor Full Stack funcionando correctamente");
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});








