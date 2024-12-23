import { getConnection } from "../config/bd.js";
import mssql from "mssql";

// Obtiene todas las categorias de productos usando el procedimiento almacenado dbo.ObtenerCategorias

export const obtenerCategorias = async () => {
  const pool = await getConnection();

  const result = await pool.request().execute("dbo.ObtenerCategorias");

  return result.recordset;
};

// Obtiene una categoria por su id usando el procedimiento almacenado dbo.ObtenerCategoriaPorId

export const obtenerCategoriaporId = async (idCategoriaProducto) => {
  try {
    const pool = await getConnection();
    console.log("Conexión a la base de datos exitosa");

    const result = await pool
      .request()
      .input("idCategoriaProducto", mssql.Int, idCategoriaProducto)
      .output("resultado", mssql.VarChar)
      .execute("dbo.ObtenerCategoriaPorId");

    console.log("Resultado del procedimiento:", result.output.resultado);

    if (result.output.resultado) {
      return { error_message: result.output.resultado };
    }

    return result.recordset;
  } catch (error) {
    console.error("Error al obtener la categoria por ID:", error);
    throw error;
  }
};

// Obtiene una categoria por su nmbre usando el procedimiento almacenado dbo.ObtenerCategoriaPorNombre

export const obtenerCategoriaporNombre = async (nombre) => {
  try {
    const pool = await getConnection();
    console.log("Conexión a la base de datos exitosa");

    const result = await pool
      .request()
      .input("nombre", mssql.VarChar, nombre)
      .output("resultado", mssql.VarChar)
      .execute("dbo.ObtenerCategoriaPorNombre");

    console.log("Resultado del procedimiento:", result.output.resultado);

    if (result.output.resultado) {
      return { error_message: result.output.resultado };
    }

    return result.recordset;
  } catch (error) {
    console.error("Error al obtener la categoria por nombre:", error);
    throw error;
  }
};

//Inserta una nueva categoria en la base de datos utilizando el procedimiento almacenado dbo.CrearCategoria

export const crearCategoria = async (categoria) => {
  const { nombre, idUsuario } = categoria;

  const pool = await getConnection();

  const result = await pool
    .request()
    .input("nombre", mssql.VarChar, nombre)
    .input("idUsuario", mssql.Int, idUsuario)
    .output("resultado", mssql.VarChar(100))
    .execute("dbo.CrearCategoria");

  return result.output.resultado;
};

// Actualiza una categoria en la bd utilizando el procedimiento almacenado dbo.ActualizarCategoria

export const actualizarCategoria = async (categoria) => {
  const { idCategoriaProducto, nombre, idUsuario } = categoria;

  const pool = await getConnection();

  const result = await pool
    .request()
    .input("idCategoriaProducto", mssql.Int, idCategoriaProducto)
    .input("nombre", mssql.VarChar, nombre)
    .input("idUsuario", mssql.Int, idUsuario)
    .output("resultado", mssql.VarChar(100))
    .execute("dbo.ActualizarCategoria");

  return result.output.resultado;
};

// Inactiva  una categoria en la bd utilizando el procedimiento almacenado DarBajaCategoriaPorId

export const inactivarCategoria = async (idCategoriaProducto, idUsuario) => {
  const pool = await getConnection();

  const result = await pool
    .request()
    .input("idCategoriaProducto", mssql.Int, idCategoriaProducto)
    .input("idUsuario", mssql.Int, idUsuario)
    .output("resultado", mssql.VarChar(100))
    .execute("DarBajaCategoriaPorId");

  return result.output.resultado;
};

// Eliminar una categoria en la bd utilizando el procedimiento almacenado EliminarCategoriaPorId
export const eliminarCategoria = async (idCategoriaProducto, idUsuario) => {
  const pool = await getConnection();

  const result = await pool
    .request()
    .input("idCategoriaProducto", mssql.Int, idCategoriaProducto)
    .input("idUsuario", mssql.Int, idUsuario)
    .output("resultado", mssql.VarChar(100))
    .execute("EliminarCategoriaPorId");

  return result.output.resultado;
};
