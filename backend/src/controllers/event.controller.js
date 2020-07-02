/**
 * Arquivo: src/controllers/event.controller
 * Descrição: arquivo responsável pela lógica do CRUD da API
 * Data: 22/05/2020
 * Autor: Leticia Machado
 */

const sql = require("mssql");

const pool = require("../config/database");

// => Método que lista todos os registros da tabela
exports.listAll = async (req, res) => {
  try {
    const response = await pool.request().query("select * from schedule");
    res.status(200).send(response.recordset);
  } catch (err) {
    res.status(500).send({ message: "SQL error: " + err });
  }
};
// Método para inserir um novo Evento
exports.createEvent = async (req, res) => {
  try {
    const {
      schedule_user,
      schedule_date,
      start_time,
      end_time,
      all_day,
      creation_user,
      creation_date,
      room_id,
    } = req.body;

    const response = await pool
      .request()
      .input("schedule_user", sql.VarChar(50), schedule_user)
      .input("schedule_date", sql.DateTime, schedule_date)
      .input("start_time", sql.Int, start_time)
      .input("end_time", sql.Int, end_time)
      .input("all_day", sql.Int, all_day)
      .input("creation_user", sql.VarChar(50), creation_user)
      .input("creation_date", sql.DateTime, creation_date)
      .input("room_id", sql.Int, room_id)
      .execute("SP_INSERT_CHECK");

    if (response.rowsAffected < 1) {
      res.status(403).send({
        message: "Duplicado!",
      });
    } else {
      res.status(201).send(response.rowsAffected);
    }
  } catch (err) {
    res.status(500).send({ message: "SQL error: " + err });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const schedule_id = parseInt(req.params.id);
    const response = await pool
      .request()
      .input("schedule_id", sql.Int, schedule_id)
      .query("DELETE FROM SCHEDULE WHERE schedule_id= @schedule_id");

    response.rowsAffected < 1
      ? res.status(404).send({ message: "error" })
      : res.status(200).send(response.rowsAffected);
  } catch (err) {
    res.status(500).send({ message: "SQL error: " + err });
  }
};

// => Lista todos os eventos (fullcalendar mode)
exports.getAllEvents = async (req, res) => {
 const {room_id, user} = req.query;
  
  try {
    if(room_id == null && user == null){
    var response = await pool.request().query("SELECT * FROM VW_EVENT");
  }
  else if(user == null && room_id != null){
    const groupId = parseInt(room_id);
    response = await pool.request()
    .input("groupId", sql.Int, groupId)
    .query("SELECT * FROM VW_EVENT WHERE groupId = @groupId")
  }
  else if (room_id == null && user != null) {
    response = await pool.request()
    .input("user", sql.VarChar, user)
    .query("SELECT * FROM VW_EVENT WHERE title = @user OR creation_user = @user");
  }
  else {
    const groupId = parseInt(room_id);
    response = await pool.request()
    .input("user", sql.VarChar, user)
    .input("groupId", sql.Int, groupId)
    .query("SELECT * FROM VW_EVENT WHERE title = @user OR creation_user = @user AND groupId = @groupId");
  }
  response.recordset < 1
    ? res.status(204).send({ message: "empty" })
    : res.status(200).send(response.recordset);
  } catch (err) {
    res.status(500).send({ message: "SQL error: " + err });
  }
};

exports.findById = async (req, res) => {
  try {
    const schedule_id = parseInt(req.params.id);
    const response = await pool
      .request()
      .input("schedule_id", sql.Int, schedule_id)
      .query("SELECT * FROM VW_EVENT WHERE id = @schedule_id");

    response.recordset < 1
      ? res.status(404).send({ message: "error" })
      : res.status(200).send(response.recordset);
  } catch (err) {
    res.status(500).send({ message: "SQL error: " + err });
  }
};

