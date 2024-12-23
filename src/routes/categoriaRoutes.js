import express from "express";
import {
  obtenerCategoriasController,
  obtenerCategoriaporIdController,
  obtenerCategoriaporNombreController,
  crearCategoriaController,
  actualizarCategoriaController,
  inactivarCategoriaController,
  eliminarCategoriaController,
} from "../controllers/categoriaController.js";

const router = express.Router();

// Endpoint para obtener todos las categorias de productos
router.get("/", obtenerCategoriasController);

// Endpoint para obtener una categoria por su ID
router.get("/:idCategoriaProducto", obtenerCategoriaporIdController);

// Endpoint para obtener una categoria por su nombre
router.get("/obtener/:nombre", obtenerCategoriaporNombreController);

// Endpoint para insertar una categoria
router.post("/crear/", crearCategoriaController);

// Endpoint para actualizar una categoria
router.put("/actualizar/:idCategoriaProducto", actualizarCategoriaController);

// Endpoint para inactivar una categoria
router.put("/inactivar/:idCategoriaProducto", inactivarCategoriaController);

// Endpoint para eliminar una ruta
router.put("/eliminar/:idCategoriaProducto", eliminarCategoriaController);

export default router;
