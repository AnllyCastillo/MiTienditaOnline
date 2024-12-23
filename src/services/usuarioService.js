import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getConnection } from "../config/bd.js";
import mssql from "mssql";

// Obtiene todos los usuarios usando el procedimiento almacenado dbo.ObtenerUsuarios

export const obtenerUsuarios = async () => {
  const pool = await getConnection();

  const result = await pool.request().execute("dbo.ObtenerUsuarios");

  return result.recordset;
};

// Obtiene el usuario con el id usando el procedimiento almacenado dbo.ObtenerUsuarioPorId

export const obtenerUsuarioporId = async (idUsuario) => {
  try {
    const pool = await getConnection();
    console.log("Conexión a la base de datos exitosa");

    const result = await pool
      .request()
      .input("idUsuario", mssql.Int, idUsuario)
      .output("resultado", mssql.VarChar)
      .execute("dbo.ObtenerUsuarioPorId");

    console.log("Resultado del procedimiento:", result.output.resultado);

    if (result.output.resultado) {
      return { error_message: result.output.resultado };
    }

    return result.recordset;
  } catch (error) {
    console.error("Error al obtener el usuario por ID:", error);
    throw error;
  }
};

// Obtiene el usuario con el correo usando el procedimiento almacenado dbo.ObtenerUsuarioPorCorreo

export const obtenerUsuarioporCorreo = async (correo_electronico) => {
  try {
    const pool = await getConnection();
    console.log("Conexión a la base de datos exitosa");

    const result = await pool
      .request()
      .input("correo_electronico", mssql.VarChar, correo_electronico)
      .output("resultado", mssql.VarChar)
      .execute("dbo.ObtenerUsuarioPorCorreo");

    console.log("Resultado del procedimiento:", result.output.resultado);

    if (result.output.resultado) {
      return { error_message: result.output.resultado };
    }

    return result.recordset;
  } catch (error) {
    console.error("Error al obtener el usuario por correo:", error);
    throw error;
  }
};

// Inserta un nuevo usuario en la base de datos utilizando el procedimiento almacenado dbo.CrearUsuario

export const crearUsuario = async (usuario) => {
  try {
    const {
      idCliente,
      correo_electronico,
      nombre_completo,
      password,
      telefono,
      fecha_nacimiento,
    } = usuario;

    if (idCliente) {
      const pool = await getConnection();
      const clienteResult = await pool
        .request()
        .input("idCliente", mssql.Int, idCliente)
        .query("select * from Clientes where idCliente = @idCliente");

      const cliente = clienteResult.recordset[0];
      if (!cliente) {
        throw new Error("El cliente no existe.");
      }

      if (!cliente.correo_electronico) {
        throw new Error(
          "El cliente no tiene un correo electrónico registrado."
        );
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const pool = await getConnection();
    const result = await pool
      .request()
      .input("idCliente", idCliente)
      .input("correo_electronico", correo_electronico || null)
      .input("nombre_completo", nombre_completo)
      .input("password", hashedPassword)
      .input("telefono", telefono)
      .input("fecha_nacimiento", fecha_nacimiento)
      .output("resultado", mssql.VarChar(100))
      .execute("dbo.CrearUsuario");

    return result.output.resultado;
  } catch (error) {
    console.error("Error al crear usuario:", error.message);
    throw new Error("Error al crear usuario. " + error.message);
  }
};

//Actualiza un usuario en la base de datos utilizando el procedimiento almacenado dbo.ActualizarUsuario

export const actualizarUsuario = async (usuario) => {
  const {
    idUsuario,
    idCliente,
    correo_electronico,
    nombre_completo,
    password,
    telefono,
    fecha_nacimiento,
  } = usuario;

  if (idCliente) {
    const pool = await getConnection();
    const clienteResult = await pool
      .request()
      .input("idCliente", mssql.Int, idCliente)
      .query("select * from Clientes where idCliente = @idCliente");

    const cliente = clienteResult.recordset[0];
    if (!cliente) {
      throw new Error("El cliente no existe.");
    }

    if (!cliente.correo_electronico) {
      throw new Error("El cliente no tiene un correo electrónico registrado.");
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const pool = await getConnection();
  const result = await pool
    .request()
    .input("idUsuario", mssql.Int, idUsuario)
    .input("idCliente", idCliente)
    .input("correo_electronico", correo_electronico || null)
    .input("nombre_completo", nombre_completo)
    .input("password", hashedPassword)
    .input("telefono", telefono)
    .input("fecha_nacimiento", fecha_nacimiento)
    .output("resultado", mssql.VarChar(100))
    .execute("dbo.ActualizarUsuario");

  return result.output.resultado;
};

// Inactiva  un usuario en la base de datos utilizando el procedimiento almacenado dbo.DarBajaUsuario

export const inactivarUsuario = async (idUsuario) => {
  const pool = await getConnection();

  const result = await pool
    .request()
    .input("idUsuario", mssql.Int, idUsuario)
    .output("resultado", mssql.VarChar(100))
    .execute("dbo.DarBajaUsuario");

  return result.output.resultado;
};

// Eliminar un usuario en la base de datos utilizando el procedimiento almacenado dbo.EliminarUsuario
export const eliminarUsuario = async (idUsuario) => {
  const pool = await getConnection();

  const result = await pool
    .request()
    .input("idUsuario", mssql.Int, idUsuario)
    .output("resultado", mssql.VarChar(100))
    .execute("dbo.EliminarUsuarioPorId");

  return result.output.resultado;
};

// Inicio de Sesion

export const loginUsuario = async (correo_electronico, password) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("correo_electronico", mssql.VarChar, correo_electronico)
      .query(
        "select * from Usuarios where correo_electronico = @correo_electronico"
      );

    if (result.recordset.length === 0) {
      throw new Error("Usuario no encontrado.");
    }

    const usuario = result.recordset[0];

    const match = await bcrypt.compare(password, usuario.password);
    if (!match) {
      throw new Error("Contraseña incorrecta.");
    }

    const token = jwt.sign(
      {
        id: usuario.idUsuario,
        correo_electronico: usuario.correo_electronico,
        password: usuario.password,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return token;
  } catch (error) {
    throw new Error("Error al iniciar sesión: " + error.message);
  }
};
