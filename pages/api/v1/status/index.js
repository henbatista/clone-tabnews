import database from "infra/database.js";

async function getMaxConnections() {
  const query = {
    text: "SHOW max_connections;",
  };
  const result = await database.query(query);
  return result.rows[0].max_connections;
}

async function getOpenConnections() {
  const query = {
    text: "SELECT COUNT(*) AS opened_connections FROM pg_stat_activity;",
  };

  const result = await database.query(query);
  return result.rows[0].opened_connections;
}

async function getVersion() {
  const query = {
    text: "SHOW server_version;",
  };

  const result = await database.query(query);
  return result.rows[0].server_version;
}

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  try {
    const maxConnections = await getMaxConnections();
    console.log("maxConnections", maxConnections);

    const openedConnections = await getOpenConnections();
    console.log("openedConnections", openedConnections);

    const version = await getVersion();
    console.log("version", version);

    response.status(200).json({
      updated_at: updatedAt,
      max_connections: maxConnections,
      opened_connections: openedConnections,
      version: version,
    });
  } catch (error) {
    console.error("Erro ao obter status:", error);

    response.status(500).json({
      error: "Erro ao obter status",
    });
  }
}

export default status;
