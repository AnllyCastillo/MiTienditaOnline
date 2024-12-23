import express from "express";
import {
  obtenerClientesController,
  obtenerClienteporIdController,
  obtenerClienteporCorreoController,
  crearClienteController,
  actualizarClienteController,
  eliminarClienteController,
} from "../controllers/clienteController.js";

const router = express.Router();

// Endpoint para obtener todos los clientes
router.get("/", obtenerClientesController);

// Endpoint para obtener un cliente por su ID
router.get("/:idCliente", obtenerClienteporIdController);

// Endpoint para obtener un cliente por su correo
router.get("/obtener/:correo_electronico", obtenerClienteporCorreoController);

// Endpoint para insertar un cliente
router.post("/crear/", crearClienteController);

// Endpoint para actualizar un cliente
router.put("/actualizar/:idCliente", actualizarClienteController);

// Endpoint para eliminar una cliente
router.put("/eliminar/:idCliente", eliminarClienteController);

export default router;
