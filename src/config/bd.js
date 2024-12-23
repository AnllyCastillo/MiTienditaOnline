import mssql from "mssql";

const connectionSettings = {
  server: "localhost",
  user: "sa",
  password: "",
  database: "GDA00592_OT_AnllyCastillo",
  port: 1433,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

export async function getConnection() {
  try {
    const pool = await mssql.connect(connectionSettings);
    console.log("Conexión exitosa a la base de datos.");
    return pool;
  } catch (error) {
    console.error("Error en la conexión a la base de datos:", error);
    throw error;
  }
}

export { mssql };
