/**
 * Arquivo: src/config/activeDirectory
 * Descrição: arquivo responsável pela configuração de acesso ao AD
 * Data: 15/05/2020
 * Autor: Leticia Machado
 */

const ActiveDirectory = require('activedirectory');
const dotenv = require('dotenv');

dotenv.config();


const config = {
    url: process.env.ad_url,
    baseDN: process.env.domain_controller,
    username: process.env.ad_username,
    password: process.env.ad_password,
        attributes: {
            user: ['sAMAccountName', 'cn']
        }
}

const ad = new ActiveDirectory(config);

module.exports = ad;


