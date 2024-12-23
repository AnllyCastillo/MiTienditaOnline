import express from "express";
import {
  obtenerEstadosController,
  obtenerEstadoporIdController,
  obtenerEstadoporNombreController,
  crearEstadoController,
  actualizarEstadoController,
  eliminarEstadoController,
} from "../controllers/estadoController.js";

const router = express.Router();

// Endpoint para obtener todos los estados
router.get("/", obtenerEstadosController);

// Endpoint para obtener un estados por su ID
router.get("/:idEstado", obtenerEstadoporIdController);

// Endpoint para obtener un estados por su nombre
router.get("/obtener/:nombre", obtenerEstadoporNombreController);

// Endpoint para insertar un estado
router.post("/crear/", crearEstadoController);

// Endpoint para actualizar un estado
router.put("/actualizar/:idEstado", actualizarEstadoController);

// Endpoint para eliminar una estado
router.put("/eliminar/:idEstado", eliminarEstadoController);

export default router;
