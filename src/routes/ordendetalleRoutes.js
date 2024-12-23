import express from "express";
import {
  obtenerOrdenesDetallesController,
  obtenerOrdenconDetallesporIDController,
  crearOrdenconDetallesController,
  actualizarOrdenconDetallesController,
  inactivarOrdenController,
  eliminarOrdenconDetallesController,
} from "../controllers/ordedetalleController.js";

const router = express.Router();

// Endpoint para obtener todos las ordenes con  detalles
router.get("/", obtenerOrdenesDetallesController);

// Endpoint para obtener una orden una orden con detalles
router.get("/:idOrden", obtenerOrdenconDetallesporIDController);

// Endpoint para insertar una orden con detalles
router.post("/crear/", crearOrdenconDetallesController);

// Endpoint para actualizar una orden con detalles
router.put("/actualizar/:idOrden", actualizarOrdenconDetallesController);

// Endpoint para inactivar una orden
router.put("/inactivar/:idOrden", inactivarOrdenController);

// Endpoint para eliminar una orden con detalles
router.put("/eliminar/:idOrden", eliminarOrdenconDetallesController);

export default router;
