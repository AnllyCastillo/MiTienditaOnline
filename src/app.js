import { getConnection } from "./config/bd.js";
import verifyToken from "./middleware/auth.js";
import dotenv from "dotenv";
import express from "express";
import productoRoutes from "./routes/productoRoutes.js";
import categoriaRoutes from "./routes/categoriaRoutes.js";
import estadoRoutes from "./routes/estadoRoutes.js";
import clienteRoutes from "./routes/clienteRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import ordendetalleRoutes from "./routes/ordendetalleRoutes.js";
getConnection();

dotenv.config();
const app = express();
app.use(express.json());

// Rutas de productos
app.use("/api/productos", verifyToken, productoRoutes);

// Rutas de categorias productos
app.use("/api/categoriasproductos", verifyToken, categoriaRoutes);

// Rutas de estados
app.use("/api/estados", verifyToken, estadoRoutes);

// Rutas de usuarios
app.use("/api/clientes", verifyToken, clienteRoutes);

// Rutas de usuarios
app.use("/api/usuarios", usuarioRoutes);

// Rutas de ordedentalles
app.use("/api/ordenesdetalles", verifyToken, ordendetalleRoutes);

app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
});
