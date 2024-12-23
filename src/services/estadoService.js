import { getConnection } from "../config/bd.js";
import mssql from "mssql";

// Obtiene todas los estados usando el procedimiento almacenado dbo.Estados

export const obtenerEstados = async () => {
  const pool = await getConnection();

  const result = await pool.request().execute("dbo.ObtenerEstados");

  return result.recordset;
};

// Obtiene una estado por su id usando el procedimiento almacenado dbo.EstadoPorId

export const obtenerEstadoporId = async (idEstado) => {
  try {
    const pool = await getConnection();
    console.log("Conexión a la base de datos exitosa");

    const result = await pool
      .request()
      .input("idEstado", mssql.Int, idEstado)
      .output("resultado", mssql.VarChar)
      .execute("dbo.ObtenerEstadoPorId");

    console.log("Resultado del procedimiento:", result.output.resultado);

    if (result.output.resultado) {
      return { error_message: result.output.resultado };
    }

    return result.recordset;
  } catch (error) {
    console.error("Error al obtener el estado por ID:", error);
    throw error;
  }
};

// Obtiene un estado usando el procedimiento almacenado dbo.ObtenerEstadoPorNombre

export const obtenerEstadoporNombre = async (nombre) => {
  try {
    const pool = await getConnection();
    console.log("Conexión a la base de datos exitosa");

    const result = await pool
      .request()
      .input("nombre", mssql.VarChar, nombre)
      .output("resultado", mssql.VarChar)
      .execute("dbo.ObtenerEstadoPorNombre");

    console.log("Resultado del procedimiento:", result.output.resultado);

    if (result.output.resultado) {
      return { error_message: result.output.resultado };
    }

    return result.recordset;
  } catch (error) {
    console.error("Error al obtener el estado por nombre:", error);
    throw error;
  }
};

//Inserta un nuevo estado en la base de datos utilizando el procedimiento almacenado dbo.CrearEstado

export const crearEstado = async (estado) => {
  const { nombre } = estado;

  const pool = await getConnection();

  const result = await pool
    .request()
    .input("nombre", mssql.VarChar, nombre)
    .output("resultado", mssql.VarChar(100))
    .execute("dbo.CrearEstado");

  return result.output.resultado;
};

// Actualiza un estado en la bd utilizando el procedimiento almacenado dbo.ActualizarEstado

export const actualizarEstado = async (estado) => {
  const { idEstado, nombre } = estado;

  const pool = await getConnection();

  const result = await pool
    .request()
    .input("idEstado", mssql.Int, idEstado)
    .input("nombre", mssql.VarChar, nombre)
    .output("resultado", mssql.VarChar(100))
    .execute("dbo.ActualizarEstado");

  return result.output.resultado;
};

// Eliminar un estado en la bd utilizando el procedimiento almacenado EliminarEstadoPorId
export const eliminarEstado = async (idEstado) => {
  const pool = await getConnection();

  const result = await pool
    .request()
    .input("idEstado", mssql.Int, idEstado)
    .output("resultado", mssql.VarChar(100))
    .execute("EliminarEstadoPorId");

  return result.output.resultado;
};
