import {
  obtenerClientes,
  obtenerClienteporId,
  obtenerClienteporCorreo,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
} from "../services/clienteService.js";

//Controlador para obtener los clientes

export const obtenerClientesController = async (req, res) => {
  try {
    const mensaje = await obtenerClientes(req.body);
    res.status(201).json({ mensaje });
  } catch (error) {
    console.error("Error al obtener los clientes:", error);
    res.status(500).json({ error: "Error al obtener los clientes" });
  }
};

//Controlador para obtener un cliente con el ID

export const obtenerClienteporIdController = async (req, res) => {
  const idCliente = req.params.idCliente;

  try {
    const cliente = await obtenerClienteporId(idCliente);

    if (cliente.error_message) {
      return res.status(404).json({ mensaje: cliente.error_message });
    }

    res.status(200).json(cliente);
  } catch (error) {
    console.error("Error al obtener el cliente por Id:", error);
    res.status(500).json({ error: "Error al obtener el cliente por ID" });
  }
};

//Controlador para obtener un cliente con el correo

export const obtenerClienteporCorreoController = async (req, res) => {
  const correo_electronico = req.params.correo_electronico;

  try {
    const cliente = await obtenerClienteporCorreo(correo_electronico);

    if (cliente.error_message) {
      return res.status(404).json({ mensaje: cliente.error_message });
    }

    res.status(200).json(cliente);
  } catch (error) {
    console.error("Error al obtener el cliente por correo:", error);
    res.status(500).json({ error: "Error al obtener el cliente por correo" });
  }
};

//Controlador para  Crear un cliente

export const crearClienteController = async (req, res) => {
  try {
    const mensaje = await crearCliente(req.body);
    res.status(201).json({ mensaje });
  } catch (error) {
    console.error("Error al crear el cliente:", error);
    res.status(500).json({ error: "Error al crear el cliente" });
  }
};

//Controlador para Actualizar un cliente

export const actualizarClienteController = async (req, res) => {
  const idCliente = req.params.idCliente;
  const cliente = req.body;

  if (!cliente) {
    return res
      .status(400)
      .json({ error: "Los datos del cliente son necesarios" });
  }

  cliente.idCliente = idCliente;

  try {
    const mensaje = await actualizarCliente(cliente);

    if (mensaje.includes("correctamente")) {
      return res.status(200).json({ mensaje });
    } else {
      return res.status(400).json({ error: mensaje });
    }
  } catch (error) {
    console.error("Error al actualizar el cliente :", error);
    res.status(500).json({ error: "Hubo un error al el cliente" });
  }
};

//Controlador para Eliminar un cliente

export const eliminarClienteController = async (req, res) => {
  const idCliente = req.params.idCliente;

  try {
    const mensaje = await eliminarCliente(idCliente);

    if (mensaje.includes("correctamente")) {
      return res.status(200).json({ mensaje });
    } else {
      return res.status(400).json({ error: mensaje });
    }
  } catch (error) {
    console.error("Error al eliminar el cliente:", error);
    res.status(500).json({ error: "Hubo un error al eliminar el cliente" });
  }
};
