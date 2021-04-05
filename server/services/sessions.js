const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getSessions(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, length 
    FROM sessions LIMIT ?,?`,
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function addSession(newSession) {
  const { name, length } = newSession;
  const result = await db.query(
    `INSERT INTO sessions (name, length) VALUES (?, ?)`,
    [name, length]
  );
  let message = "Error in saving session.";

  if (result.affectedRows) {
    message = "Session saved successfully";
  }

  return message;
}

async function removeSession(sessionId) {
  const result = await db.query(`DELETE FROM sessions WHERE id=?`, [sessionId]);
  let message = "Error in deleting session.";

  if (result.affectedRows) {
    message = "Session deleted successfully";
  }

  return message;
}

module.exports = {
  getSessions,
  addSession,
  removeSession,
};
