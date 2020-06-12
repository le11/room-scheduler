/**
 * Arquivo: src/controllers/user.controller
 * Descrição: arquivo responsável pela lógica de autenticação e usuários da API
 * Data: 15/05/2020
 * Autor: Leticia Machado
 */

const ad = require("../config/activeDirectory");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

dotenv.config();

//senha para criptografar
const supersecret = process.env.SECRET;

const jwtParams = {
  algorithm: "HS256", // tipo de criptografia
  expiresIn: 60 * 24 * 24, // tempo que expira
};

exports.user_authenticate = async (req, res) => {
  const { user, pass, domain } = req.body;
  try {
    const response = await ad.authenticate(
      domain + "\\" + user,
      pass,
      function (err, auth) {
        const jwtData = {
          username: user,
          email: user + "@grupocem.com.br",
        };
        if (auth) {
          const token = jwt.sign(jwtData, supersecret, jwtParams);

          res.status(200).json({
            message: "Authenticated!",
            token: token,
          });
        } else {
          console.log("ERROR" + JSON.stringify(err));
          res.status(401).send({
            message: "Authentication failed!",
          });
          return;
        }
      }
    );
  } catch (err) {
    res.status(500).send({ message: "ERROR " + err });
  }
};

exports.allow = async (req, res, next) => {
  const token = req.headers["authorization"];
  try {
    if (!token)
      return res
        .status(403)
        .json({ error: true, message: "No token informated" });

    jwt.verify(token, supersecret, (err, data) => {
      if (err) return res.json(err);
      next();
    });
  } catch (err) {
    res.status(403).json({ message: "error" + err });
  }
};

exports.getAllUserByGroup = async (req, res) => {
  const groupName = "Agenda";
  try {
    await ad.getUsersForGroup(groupName, function (err, users) {
      if (err) {
        console.log("ERROR: " + JSON.stringify(err));
        return;
      }
      if (!users) {
        console.log("Group: " + groupName + " not found");
      } else {
        res.status(200).send(JSON.stringify(users));
      }
    });
  } catch (err) {
    res.status(500).send({ message: "ERROR " + err });
  }
};
