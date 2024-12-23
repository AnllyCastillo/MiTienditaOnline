import {
  obtenerProductos,
  obtenerProductosconStock,
  obtenerProductoporId,
  crearProducto,
  actualizarProducto,
  inactivarProducto,
  eliminarProducto,
} from "../services/productoService.js";

//Controlador para obtener Productos

export const obtenerProductosController = async (req, res) => {
  try {
    const mensaje = await obtenerProductos(req.body);
    res.status(201).json({ mensaje });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

//Controlador para obtener Productos con Stock

export const obtenerProductosconStockController = async (req, res) => {
  try {
    const mensaje = await obtenerProductosconStock(req.body);
    res.status(201).json({ mensaje });
  } catch (error) {
    console.error("Error al obtener Productos con Stock:", error);
    res.status(500).json({ error: "Error al obtener Productos con Stock" });
  }
};

//Controlador para obtener un producto con el ID

export const obtenerProductoporIdController = async (req, res) => {
  const idProducto = req.params.idProducto;

  try {
    const producto = await obtenerProductoporId(idProducto);

    if (producto.error_message) {
      return res.status(404).json({ mensaje: producto.error_message });
    }

    res.status(200).json(producto);
  } catch (error) {
    console.error("Error al obtener Producto por Id:", error);
    res.status(500).json({ error: "Error al obtener el producto por ID" });
  }
};

//Crear Producto Controller

export const crearProductoController = async (req, res) => {
  try {
    const mensaje = await crearProducto(req.body);
    res.status(201).json({ mensaje });
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ error: "Error al crear el producto" });
  }
};

//Controlador para Actualizar un Producto

export const actualizarProductoController = async (req, res) => {
  const idProducto = req.params.idProducto;
  const producto = req.body;

  if (!producto) {
    return res
      .status(400)
      .json({ error: "Los datos del producto son necesarios" });
  }

  producto.idProducto = idProducto;

  try {
    const mensaje = await actualizarProducto(producto);

    if (mensaje.includes("correctamente")) {
      return res.status(200).json({ mensaje });
    } else {
      return res.status(400).json({ error: mensaje });
    }
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).json({ error: "Hubo un error al actualizar el producto" });
  }
};

//Controlador para Inactivar un Producto

export const inactivarProductoController = async (req, res) => {
  const idProducto = req.params.idProducto;
  const { idUsuario } = req.body;

  if (!idUsuario) {
    return res.status(400).json({ error: "El ID del usuario es necesario" });
  }

  try {
    const mensaje = await inactivarProducto(idProducto, idUsuario);

    if (mensaje.includes("correctamente")) {
      return res.status(200).json({ mensaje });
    } else {
      return res.status(400).json({ error: mensaje });
    }
  } catch (error) {
    console.error("Error al inactivar el producto:", error);
    res.status(500).json({ error: "Hubo un error al inactivar el producto" });
  }
};

//Controlador para Eliminar un Producto

export const eliminarProductoController = async (req, res) => {
  const idProducto = req.params.idProducto;
  const { idUsuario } = req.body;

  if (!idUsuario) {
    return res.status(400).json({ error: "El ID del usuario es necesario" });
  }

  try {
    const mensaje = await eliminarProducto(idProducto, idUsuario);

    if (mensaje.includes("correctamente")) {
      return res.status(200).json({ mensaje });
    } else {
      return res.status(400).json({ error: mensaje });
    }
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).json({ error: "Hubo un error al eliminar el producto" });
  }
};
