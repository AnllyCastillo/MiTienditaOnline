import { getConnection } from "../config/bd.js";
import mssql from "mssql";

// Obtiene todos las ordenes detalles usando el procedimiento almacenado dbo.ObtenerOrdenesConDetalles

export const obtenerOrdenesConDetalles = async () => {
  const pool = await getConnection();

  const result = await pool.request().execute("dbo.ObtenerOrdenesConDetalles");

  return result.recordset;
};

// Obtiene la orden con detalles con el id usando el procedimiento almacenado dbo.ObtenerOrdenPorIdConDetalles

export const obtenerOrdenconDetalleporId = async (idOrden) => {
  const pool = await getConnection();
  console.log("Conexión a la base de datos exitosa");

  const result = await pool
    .request()
    .input("idOrden", mssql.Int, idOrden)
    .output("resultado", mssql.VarChar)
    .execute("dbo.ObtenerOrdenPorIdConDetalles");

  if (result.output.resultado) {
    return { error_message: result.output.resultado };
  }

  console.log("Resultado del procedimiento:", result.recordset);

  return result.recordset;
};

// Inserta la orden con detalles con el id usando el procedimiento almacenado dbo.CrearOrdenConDetalles
export const crearOrdenConDetalles = async (
  nombre_completo,
  direccion,
  telefono,
  correo_electronico,
  fecha_entrega,
  idUsuario,
  detalles
) => {
  try {
    const pool = await getConnection();
    console.log("Conexión exitosa a la base de datos.");

    const result = await pool
      .request()
      .input("nombre_completo", mssql.VarChar, nombre_completo)
      .input("direccion", mssql.VarChar, direccion)
      .input("telefono", mssql.VarChar, telefono)
      .input("correo_electronico", mssql.VarChar, correo_electronico)
      .input("fecha_entrega", mssql.Date, fecha_entrega)
      .input("idUsuario", mssql.Int, idUsuario)
      .input("detalles", mssql.NVarChar, detalles)
      .output("resultado", mssql.VarChar(100))
      .execute("dbo.CrearOrdenConDetalles");

    console.log("Resultado del procedimiento:", result.output.resultado);

    if (
      result.output.resultado !== "Orden creada correctamente con sus detalles."
    ) {
      return { error_message: result.output.resultado };
    }

    return result.output.resultado;
  } catch (error) {
    console.error("Error al crear la orden con detalles:", error);
    throw error;
  }
};

// Actualiza la orden con detalles con el id usando el procedimiento almacenado dbo.ActualizarOrdenConDetalles

export const actualizarOrdenConDetalles = async (ordencondetalle) => {
  const {
    idOrden,
    nombre_completo,
    direccion,
    telefono,
    correo_electronico,
    fecha_entrega,
    idUsuario,
    detalles,
  } = ordencondetalle;

  const pool = await getConnection();

  const result = await pool
    .request()
    .input("idOrden", mssql.Int, idOrden)
    .input("nombre_completo", mssql.VarChar, nombre_completo)
    .input("direccion", mssql.VarChar, direccion)
    .input("telefono", mssql.VarChar, telefono)
    .input("correo_electronico", mssql.VarChar, correo_electronico)
    .input("fecha_entrega", mssql.Date, fecha_entrega)
    .input("idUsuario", mssql.Int, idUsuario)
    .input("detalles", mssql.NVarChar, detalles)
    .output("resultado", mssql.VarChar(100))
    .execute("dbo.ActualizarOrdenConDetalles");
  return result.output.resultado;
};

// Inactiva  una orden en la base de datos utilizando el procedimiento almacenado dbo.InactivarOrden

export const inactivarOrden = async (idOrden, idUsuario) => {
  const pool = await getConnection();

  const result = await pool
    .request()
    .input("idOrden", mssql.Int, idOrden)
    .input("idUsuario", mssql.Int, idUsuario)
    .output("resultado", mssql.VarChar(100))
    .execute("dbo.InactivarOrden");

  return result.output.resultado;
};

// Elimina una orden con detalles en la bd utilizando el procedimiento almacenado dbo.ElimOrderYDetallesConId
export const eliminarOrdenconDetalles = async (idOrden, idUsuario) => {
  const pool = await getConnection();

  const result = await pool
    .request()
    .input("idOrden", mssql.Int, idOrden)
    .input("idUsuario", mssql.Int, idUsuario)
    .output("resultado", mssql.VarChar(100))
    .execute("dbo.ElimOrderYDetallesConId");

  return result.output.resultado;
};
