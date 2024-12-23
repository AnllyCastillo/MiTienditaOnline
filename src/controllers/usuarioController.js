import {
  obtenerUsuarios,
  obtenerUsuarioporId,
  obtenerUsuarioporCorreo,
  crearUsuario,
  actualizarUsuario,
  inactivarUsuario,
  eliminarUsuario,
  loginUsuario,
} from "../services/usuarioService.js";

//Controlador para obtener usuarios

export const obtenerUsuariosController = async (req, res) => {
  try {
    const mensaje = await obtenerUsuarios(req.body);
    res.status(201).json({ mensaje });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

//Controlador para obtener un usuario con el ID

export const obtenerUsuarioporIdController = async (req, res) => {
  const idUsuario = req.params.idUsuario;

  try {
    const usuario = await obtenerUsuarioporId(idUsuario);

    if (usuario.error_message) {
      return res.status(404).json({ mensaje: usuario.error_message });
    }

    res.status(200).json(usuario);
  } catch (error) {
    console.error("Error al obtener usuario por Id:", error);
    res.status(500).json({ error: "Error al obtener el usuario por ID" });
  }
};

//Controlador para obtener un usuario con el correo

export const obtenerUsuarioporCorreoController = async (req, res) => {
  const correo_electronico = req.params.correo_electronico;

  try {
    const usuario = await obtenerUsuarioporCorreo(correo_electronico);

    if (usuario.error_message) {
      return res.status(404).json({ mensaje: usuario.error_message });
    }

    res.status(200).json(usuario);
  } catch (error) {
    console.error("Error al obtener usuario por correo:", error);
    res.status(500).json({ error: "Error al obtener el usuario por correo" });
  }
};

//Controlador para crear un usuario

export const crearUsuarioController = async (req, res) => {
  try {
    const mensaje = await crearUsuario(req.body);
    res.status(201).json({ mensaje });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};

//Controlador para Actualizar un Usuario

export const actualizarUsuarioController = async (req, res) => {
  const idUsuario = req.params.idUsuario;
  const usuario = req.body;

  if (!usuario) {
    return res
      .status(400)
      .json({ error: "Los datos del usuario son necesarios" });
  }

  usuario.idUsuario = idUsuario;

  try {
    const mensaje = await actualizarUsuario(usuario);

    if (mensaje.includes("correctamente")) {
      return res.status(200).json({ mensaje });
    } else {
      return res.status(400).json({ error: mensaje });
    }
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res.status(500).json({ error: "Hubo un error al actualizar el usuario" });
  }
};

//Controlador para Inactivar un Usuario
export const inactivarUsuarioController = async (req, res) => {
  const idUsuario = req.params.idUsuario;

  try {
    const mensaje = await inactivarUsuario(idUsuario);

    if (mensaje === "Usuario no encontrado") {
      return res.status(404).json({ error: mensaje });
    }

    return res.status(200).json({ mensaje });
  } catch (error) {
    console.error("Error al inactivar el usuario:", error);
    res.status(500).json({ error: "Hubo un error al inactivar el usuario" });
  }
};

//Controlador para Eliminar un usuario

export const eliminarUsuarioController = async (req, res) => {
  const idUsuario = req.params.idUsuario;

  try {
    const mensaje = await eliminarUsuario(idUsuario);

    if (mensaje.includes("correctamente")) {
      return res.status(200).json({ mensaje });
    } else {
      return res.status(400).json({ error: mensaje });
    }
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    res.status(500).json({ error: "Hubo un error al eliminar el usuario" });
  }
};

// Controlador de login
export const loginController = async (req, res) => {
  const { correo_electronico, password } = req.body;

  try {
    const token = await loginUsuario(correo_electronico, password);
    res.json({ token }); // Devolver el JWT al usuario
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
