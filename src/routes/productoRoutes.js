import express from "express";
import {
  obtenerProductosController,
  obtenerProductosconStockController,
  obtenerProductoporIdController,
  crearProductoController,
  actualizarProductoController,
  inactivarProductoController,
  eliminarProductoController,
} from "../controllers/productoController.js";

const router = express.Router();

// Endpoint para obtener todos los productos
router.get("/", obtenerProductosController);

// Endpoint para obtener todos los productos con Stock
router.get("/con-stock", obtenerProductosconStockController);

// Endpoint para obtener un producto por su ID
router.get("/:idProducto", obtenerProductoporIdController);

// Endpoint para insertar un producto
router.post("/crear/", crearProductoController);

// Endpoint para actualizar un producto
router.put("/actualizar/:idProducto", actualizarProductoController);

// Endpoint para inactivar un producto
router.put("/inactivar/:idProducto", inactivarProductoController);

// Endpoint para eliminar un producto
router.put("/eliminar/:idProducto", eliminarProductoController);

export default router;
