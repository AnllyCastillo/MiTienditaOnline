import {
  obtenerCategorias,
  obtenerCategoriaporId,
  obtenerCategoriaporNombre,
  crearCategoria,
  actualizarCategoria,
  inactivarCategoria,
  eliminarCategoria,
} from "../services/categoriaService.js";

//Controlador para obtener las categorias de los productos

export const obtenerCategoriasController = async (req, res) => {
  try {
    const mensaje = await obtenerCategorias(req.body);
    res.status(201).json({ mensaje });
  } catch (error) {
    console.error("Error al obtener categorias de productos:", error);
    res
      .status(500)
      .json({ error: "Error al obtener las categorias de productos" });
  }
};

//Controlador para obtener una categoria con el ID

export const obtenerCategoriaporIdController = async (req, res) => {
  const idCategoriaProducto = req.params.idCategoriaProducto;

  try {
    const categoria = await obtenerCategoriaporId(idCategoriaProducto);

    if (categoria.error_message) {
      return res.status(404).json({ mensaje: categoria.error_message });
    }

    res.status(200).json(categoria);
  } catch (error) {
    console.error("Error al obtener Categoria de Productos por Id:", error);
    res
      .status(500)
      .json({ error: "Error al obtener la Categoria de Productos por ID" });
  }
};

//Controlador para obtener una categoria con el ID

export const obtenerCategoriaporNombreController = async (req, res) => {
  const nombre = req.params.nombre;

  try {
    const categoria = await obtenerCategoriaporNombre(nombre);

    if (categoria.error_message) {
      return res.status(404).json({ mensaje: categoria.error_message });
    }

    res.status(200).json(categoria);
  } catch (error) {
    console.error("Error al obtener Categoria de Productos por Nombre:", error);
    res
      .status(500)
      .json({ error: "Error al obtener la Categoria de Productos por Nombre" });
  }
};

//Crear Categoria Controller

export const crearCategoriaController = async (req, res) => {
  try {
    const mensaje = await crearCategoria(req.body);
    res.status(201).json({ mensaje });
  } catch (error) {
    console.error("Error al crear la categoria:", error);
    res.status(500).json({ error: "Error al crear la categoria" });
  }
};

//Controlador para Actualizar una Categoria

export const actualizarCategoriaController = async (req, res) => {
  const idCategoriaProducto = req.params.idCategoriaProducto;
  const categoria = req.body;

  if (!categoria) {
    return res
      .status(400)
      .json({ error: "Los datos de la categoria son necesarios" });
  }

  categoria.idCategoriaProducto = idCategoriaProducto;

  try {
    const mensaje = await actualizarCategoria(categoria);

    if (mensaje.includes("correctamente")) {
      return res.status(200).json({ mensaje });
    } else {
      return res.status(400).json({ error: mensaje });
    }
  } catch (error) {
    console.error("Error al actualizar la categoria :", error);
    res.status(500).json({ error: "Hubo un error al actualizar la categoria" });
  }
};

//Controlador para Inactivar una Categoria

export const inactivarCategoriaController = async (req, res) => {
  const idCategoriaProducto = req.params.idCategoriaProducto;
  const { idUsuario } = req.body;

  if (!idUsuario) {
    return res.status(400).json({ error: "El ID del usuario es necesario" });
  }

  try {
    const mensaje = await inactivarCategoria(idCategoriaProducto, idUsuario);

    if (mensaje.includes("correctamente")) {
      return res.status(200).json({ mensaje });
    } else {
      return res.status(400).json({ error: mensaje });
    }
  } catch (error) {
    console.error("Error al inactivar la categoria:", error);
    res.status(500).json({ error: "Hubo un error al inactivar la categoria" });
  }
};

//Controlador para Eliminar una Categoria

export const eliminarCategoriaController = async (req, res) => {
  const idCategoriaProducto = req.params.idCategoriaProducto;
  const { idUsuario } = req.body;

  if (!idUsuario) {
    return res.status(400).json({ error: "El ID del usuario es necesario" });
  }

  try {
    const mensaje = await eliminarCategoria(idCategoriaProducto, idUsuario);

    if (mensaje.includes("correctamente")) {
      return res.status(200).json({ mensaje });
    } else {
      return res.status(400).json({ error: mensaje });
    }
  } catch (error) {
    console.error("Error al eliminar la categoria:", error);
    res.status(500).json({ error: "Hubo un error al eliminar la categoria" });
  }
};
