import { getConnection } from "../config/bd.js";
import mssql from "mssql";

// Obtiene todos los productos usando el procedimiento almacenado dbo.ObtenerProductos

export const obtenerProductos = async () => {
  const pool = await getConnection();

  const result = await pool.request().execute("dbo.ObtenerProductos");

  return result.recordset;
};

// Obtiene todos los productos con stock usando el procedimiento almacenado dbo.ObtenerProductosconStock

export const obtenerProductosconStock = async () => {
  const pool = await getConnection();

  const result = await pool.request().execute("dbo.ObtenerProductosconStock");

  return result.recordset;
};

// Obtiene el producto con el id usando el procedimiento almacenado dbo.ObtenerProductoPorId

export const obtenerProductoporId = async (idProducto) => {
  try {
    const pool = await getConnection();
    console.log("Conexión a la base de datos exitosa");

    const result = await pool
      .request()
      .input("idProducto", mssql.Int, idProducto)
      .output("resultado", mssql.VarChar)
      .execute("dbo.ObtenerProductoPorId");

    console.log("Resultado del procedimiento:", result.output.resultado);

    if (result.output.resultado) {
      return { error_message: result.output.resultado };
    }

    return result.recordset;
  } catch (error) {
    console.error("Error al obtener el producto por ID:", error);
    throw error;
  }
};

// Inserta un nuevo producto en la base de datos utilizando el procedimiento almacenado dbo.CrearProducto

export const crearProducto = async (producto) => {
  const {
    nombre,
    marca,
    codigo,
    stock,
    precio,
    foto,
    idCategoriaProducto,
    idUsuario,
  } = producto;

  const pool = await getConnection();

  const result = await pool
    .request()
    .input("nombre", mssql.VarChar, nombre)
    .input("marca", mssql.VarChar, marca)
    .input("codigo", mssql.VarChar, codigo)
    .input("stock", mssql.Float, stock)
    .input("precio", mssql.Float, precio)
    .input("foto", mssql.VarChar, foto)
    .input("idCategoriaProducto", mssql.Int, idCategoriaProducto)
    .input("idUsuario", mssql.Int, idUsuario)
    .output("resultado", mssql.VarChar(100))
    .execute("dbo.CrearProducto");

  return result.output.resultado;
};

// Actualiza un producto en la base de datos utilizando el procedimiento almacenado dbo.ActualizarProducto

export const actualizarProducto = async (producto) => {
  const {
    idProducto,
    nombre,
    marca,
    codigo,
    stock,
    precio,
    foto,
    idCategoriaProducto,
    idUsuario,
  } = producto;

  const pool = await getConnection();

  const result = await pool
    .request()
    .input("idProducto", mssql.Int, idProducto)
    .input("nombre", mssql.VarChar, nombre)
    .input("marca", mssql.VarChar, marca)
    .input("codigo", mssql.VarChar, codigo)
    .input("stock", mssql.Float, stock)
    .input("precio", mssql.Float, precio)
    .input("foto", mssql.VarChar, foto)
    .input("idCategoriaProducto", mssql.Int, idCategoriaProducto)
    .input("idUsuario", mssql.Int, idUsuario)
    .output("resultado", mssql.VarChar(100))
    .execute("dbo.ActualizarProducto");

  return result.output.resultado;
};

// Inactiva  un producto en la base de datos utilizando el procedimiento almacenado dbo.DarBajaProducto

export const inactivarProducto = async (idProducto, idUsuario) => {
  const pool = await getConnection();

  const result = await pool
    .request()
    .input("idProducto", mssql.Int, idProducto)
    .input("idUsuario", mssql.Int, idUsuario)
    .output("resultado", mssql.VarChar(100))
    .execute("dbo.DarBajaProducto");

  return result.output.resultado;
};

// Elimina un producto en la base de datos utilizando el procedimiento almacenado dbo.EliminarProducto
export const eliminarProducto = async (idProducto, idUsuario) => {
  const pool = await getConnection();

  const result = await pool
    .request()
    .input("idProducto", mssql.Int, idProducto)
    .input("idUsuario", mssql.Int, idUsuario)
    .output("resultado", mssql.VarChar(100))
    .execute("dbo.EliminarProducto");

  return result.output.resultado;
};
