import {
  obtenerOrdenesConDetalles,
  obtenerOrdenconDetalleporId,
  crearOrdenConDetalles,
  actualizarOrdenConDetalles,
  inactivarOrden,
  eliminarOrdenconDetalles,
} from "../services/ordendetalleService.js";

//Controlador para obtener las ordenes detalles

export const obtenerOrdenesDetallesController = async (req, res) => {
  try {
    const mensaje = await obtenerOrdenesConDetalles(req.body);
    res.status(201).json({ mensaje });
  } catch (error) {
    console.error("Error al obtener ordenes detalles:", error);
    res.status(500).json({ error: "Error al obtener las ordenes detalles" });
  }
};

//Controlador para obtener una orden con detalle por ID

export const obtenerOrdenconDetallesporIDController = async (req, res) => {
  const idOrden = req.params.idOrden;

  try {
    const orden = await obtenerOrdenconDetalleporId(idOrden);

    if (orden.error_message) {
      return res.status(404).json({ mensaje: orden.error_message });
    }

    res.status(200).json(orden);
  } catch (error) {
    console.error("Error al obtener la orden con detalles por Id:", error);
    res
      .status(500)
      .json({ error: "Error al obtener la orden con detalles por ID" });
  }
};

//Controlador para crear una orden con detalle¨

export const crearOrdenconDetallesController = async (req, res) => {
  const {
    nombre_completo,
    direccion,
    telefono,
    correo_electronico,
    fecha_entrega,
    idUsuario,
    detalles,
  } = req.body;

  try {
    const resultado = await crearOrdenConDetalles(
      nombre_completo,
      direccion,
      telefono,
      correo_electronico,
      fecha_entrega,
      idUsuario,
      detalles
    );

    if (resultado.error_message) {
      return res.status(400).json({ mensaje: resultado.error_message });
    }

    res.status(201).json({ mensaje: resultado });
  } catch (error) {
    console.error("Error al crear la orden con detalles:", error);
    res.status(500).json({ error: "Error al crear la orden con detalles." });
  }
};

//Controlador para Actualizar una Orden con Detalles

export const actualizarOrdenconDetallesController = async (req, res) => {
  const idOrden = req.params.idOrden;
  const ordencondetalles = req.body;

  if (!ordencondetalles) {
    return res
      .status(400)
      .json({ error: "Los datos de la orden con detalles son necesarios" });
  }

  ordencondetalles.idOrden = idOrden;

  try {
    const mensaje = await actualizarOrdenConDetalles(ordencondetalles);

    if (mensaje.includes("correctamente")) {
      return res.status(200).json({ mensaje });
    } else {
      return res.status(400).json({ error: mensaje });
    }
  } catch (error) {
    console.error("Error al actualizar la orden con detalles:", error);
    res
      .status(500)
      .json({ error: "Hubo un error al actualizar la orden con detalles" });
  }
};

//Controlador para Inactivar una Orden

export const inactivarOrdenController = async (req, res) => {
  const idOrden = req.params.idOrden;
  const { idUsuario } = req.body;

  if (!idUsuario) {
    return res.status(400).json({ error: "El ID del usuario es necesario" });
  }

  try {
    const mensaje = await inactivarOrden(idOrden, idUsuario);

    if (mensaje.includes("correctamente")) {
      return res.status(200).json({ mensaje });
    } else {
      return res.status(400).json({ error: mensaje });
    }
  } catch (error) {
    console.error("Error al inactivar la orden:", error);
    res.status(500).json({ error: "Hubo un error al inactivar la orden" });
  }
};

//Controlador para Eliminar una orden con detalles

export const eliminarOrdenconDetallesController = async (req, res) => {
  const idOrden = req.params.idOrden;
  const { idUsuario } = req.body;

  if (!idUsuario) {
    return res.status(400).json({ error: "El ID del usuario es necesario" });
  }

  try {
    const mensaje = await eliminarOrdenconDetalles(idOrden, idUsuario);

    if (mensaje.includes("correctamente")) {
      return res.status(200).json({ mensaje });
    } else {
      return res.status(400).json({ error: mensaje });
    }
  } catch (error) {
    console.error("Error al eliminar la orden con detalles:", error);
    res
      .status(500)
      .json({ error: "Hubo un error al eliminar la orden con detalles" });
  }
};
