import { getConnection } from "../config/bd.js";
import mssql from "mssql";

// Obtiene todos los clientes usando el procedimiento almacenado dbo.ObtenerClientes

export const obtenerClientes = async () => {
  const pool = await getConnection();

  const result = await pool.request().execute("dbo.ObtenerClientes");

  return result.recordset;
};

// Obtiene una cliente por su id usando el procedimiento almacenado dbo.ClientePorId

export const obtenerClienteporId = async (idCliente) => {
  try {
    const pool = await getConnection();
    console.log("Conexión a la base de datos exitosa");

    const result = await pool
      .request()
      .input("idCliente", mssql.Int, idCliente)
      .output("resultado", mssql.VarChar)
      .execute("dbo.ObtenerClientePorId");

    console.log("Resultado del procedimiento:", result.output.resultado);

    if (result.output.resultado) {
      return { error_message: result.output.resultado };
    }

    return result.recordset;
  } catch (error) {
    console.error("Error al obtener el cliente por ID:", error);
    throw error;
  }
};

// Obtiene un cliente usando el procedimiento almacenado dbo.ObtenerClientePorCorreo

export const obtenerClienteporCorreo = async (correo_electronico) => {
  try {
    const pool = await getConnection();
    console.log("Conexión a la base de datos exitosa");

    const result = await pool
      .request()
      .input("correo_electronico", mssql.VarChar, correo_electronico)
      .output("resultado", mssql.VarChar)
      .execute("dbo.ObtenerClientePorCorreo");

    console.log("Resultado del procedimiento:", result.output.resultado);

    if (result.output.resultado) {
      return { error_message: result.output.resultado };
    }

    return result.recordset;
  } catch (error) {
    console.error("Error al obtener el cliente por nombre:", error);
    throw error;
  }
};

// Inserta un nuevo cliente en la base de datos utilizando el procedimiento almacenado dbo.CrearCliente

export const crearCliente = async (cliente) => {
  const {
    razon_social,
    nombre_comercial,
    direccion_entrega,
    correo_electronico,
  } = cliente;

  const pool = await getConnection();

  const result = await pool
    .request()
    .input("razon_social", mssql.VarChar, razon_social)
    .input("nombre_comercial", mssql.VarChar, nombre_comercial)
    .input("direccion_entrega", mssql.VarChar, direccion_entrega)
    .input("correo_electronico", mssql.VarChar, correo_electronico)
    .output("resultado", mssql.VarChar(100))
    .execute("dbo.CrearCliente");
  return result.output.resultado;
};

// Actualiza un client en la base de datos utilizando el procedimiento almacenado dbo.ActualizarCliente

export const actualizarCliente = async (cliente) => {
  const {
    idCliente,
    razon_social,
    nombre_comercial,
    direccion_entrega,
    correo_electronico,
  } = cliente;

  const pool = await getConnection();

  const result = await pool
    .request()
    .input("idCliente", mssql.Int, idCliente)
    .input("razon_social", mssql.VarChar, razon_social)
    .input("nombre_comercial", mssql.VarChar, nombre_comercial)
    .input("direccion_entrega", mssql.VarChar, direccion_entrega)
    .input("correo_electronico", mssql.VarChar, correo_electronico)
    .output("resultado", mssql.VarChar(100))
    .execute("dbo.ActualizarCliente");

  return result.output.resultado;
};

// Eliminar un cliente en la base de datos utilizando el procedimiento almacenado dbo.EliminarClientePorId
export const eliminarCliente = async (idCliente) => {
  const pool = await getConnection();

  const result = await pool
    .request()
    .input("idCliente", mssql.Int, idCliente)
    .output("resultado", mssql.VarChar(100))
    .execute("dbo.EliminarClientePorId");

  return result.output.resultado;
};
