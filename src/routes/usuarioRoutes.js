import express from "express";

import {
  obtenerUsuariosController,
  obtenerUsuarioporIdController,
  obtenerUsuarioporCorreoController,
  crearUsuarioController,
  actualizarUsuarioController,
  inactivarUsuarioController,
  eliminarUsuarioController,
  loginController,
} from "../controllers/usuarioController.js";

const router = express.Router();

// Endpoint para obtener todos los usuarios
router.get("/", obtenerUsuariosController);

// Endpoint para obtener un usuario por su ID
router.get("/:idUsuario", obtenerUsuarioporIdController);

// Endpoint para obtener un usuario por Correo
router.get("/obtener/:correo_electronico", obtenerUsuarioporCorreoController);

// Endpoint para insertar un usuario
router.post("/crear/", crearUsuarioController);

// Endpoint para actualizar un usuario
router.put("/actualizar/:idUsuario", actualizarUsuarioController);

// Endpoint para inactivar un usuario
router.put("/inactivar/:idUsuario", inactivarUsuarioController);

// Endpoint para eliminar un usuario
router.put("/eliminar/:idUsuario", eliminarUsuarioController);

// Endpoint para login
router.put("/eliminar/:idUsuario", eliminarUsuarioController);

// Endpoint para login
router.post("/login/", loginController);

export default router;
