import {
  obtenerEstados,
  obtenerEstadoporId,
  obtenerEstadoporNombre,
  crearEstado,
  actualizarEstado,
  eliminarEstado,
} from "../services/estadoService.js";

//Controlador para obtener los estados

export const obtenerEstadosController = async (req, res) => {
  try {
    const mensaje = await obtenerEstados(req.body);
    res.status(201).json({ mensaje });
  } catch (error) {
    console.error("Error al obtener los estados:", error);
    res.status(500).json({ error: "Error al obtener los estados" });
  }
};

//Controlador para obtener un estado con el ID

export const obtenerEstadoporIdController = async (req, res) => {
  const idEstado = req.params.idEstado;

  try {
    const estado = await obtenerEstadoporId(idEstado);

    if (estado.error_message) {
      return res.status(404).json({ mensaje: estado.error_message });
    }

    res.status(200).json(estado);
  } catch (error) {
    console.error("Error al obtener el estado por Id:", error);
    res.status(500).json({ error: "Error al obtener el estado por ID" });
  }
};

//Controlador para obtener un estado con el nombre

export const obtenerEstadoporNombreController = async (req, res) => {
  const nombre = req.params.nombre;

  try {
    const estado = await obtenerEstadoporNombre(nombre);

    if (estado.error_message) {
      return res.status(404).json({ mensaje: estado.error_message });
    }

    res.status(200).json(estado);
  } catch (error) {
    console.error("Error al obtener el estado por Nombre:", error);
    res.status(500).json({ error: "Error al obtener el estado por Nombre" });
  }
};

//Controlador para  Crear un estado

export const crearEstadoController = async (req, res) => {
  try {
    const mensaje = await crearEstado(req.body);
    res.status(201).json({ mensaje });
  } catch (error) {
    console.error("Error al crear el estado:", error);
    res.status(500).json({ error: "Error al crear el estado" });
  }
};

//Controlador para Actualizar un estado

export const actualizarEstadoController = async (req, res) => {
  const idEstado = req.params.idEstado;
  const estado = req.body;

  if (!estado) {
    return res
      .status(400)
      .json({ error: "Los datos del estado son necesarios" });
  }

  estado.idEstado = idEstado;

  try {
    const mensaje = await actualizarEstado(estado);

    if (mensaje.includes("correctamente")) {
      return res.status(200).json({ mensaje });
    } else {
      return res.status(400).json({ error: mensaje });
    }
  } catch (error) {
    console.error("Error al actualizar el estado :", error);
    res.status(500).json({ error: "Hubo un error al el estado" });
  }
};

//Controlador para Eliminar un estado

export const eliminarEstadoController = async (req, res) => {
  const idEstado = req.params.idEstado;

  try {
    const mensaje = await eliminarEstado(idEstado);

    if (mensaje.includes("correctamente")) {
      return res.status(200).json({ mensaje });
    } else {
      return res.status(400).json({ error: mensaje });
    }
  } catch (error) {
    console.error("Error al eliminar el estado:", error);
    res.status(500).json({ error: "Hubo un error al eliminar el estado" });
  }
};
