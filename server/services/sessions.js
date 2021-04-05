const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getSessions(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, length, created_at 
    FROM sessions ORDER BY created_at DESC LIMIT ?,?`,
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function getTodaySessions(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, length, created_at 
    FROM sessions WHERE sessions.created_at > CURDATE() ORDER BY created_at DESC LIMIT ?,?`,
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function getWeeklySessions(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, length, created_at 
    FROM sessions WHERE sessions.created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)  ORDER BY created_at DESC LIMIT ?,?`,
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function getMonthlySessions(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, length, created_at 
    FROM sessions WHERE sessions.created_at >= DATE_SUB(CURDATE(), INTERVAL 31 DAY) ORDER BY created_at DESC  LIMIT ?,?`,
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
  getWeeklySessions,
  getTodaySessions,
  getMonthlySessions,
  addSession,
  removeSession,
};
