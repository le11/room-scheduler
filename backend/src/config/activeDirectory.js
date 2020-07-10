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
    url: process.env.AD_URL,
    baseDN: process.env.DOMAIN_CONTROLLER,
    username: process.env.AD_USERNAME,
    password: process.env.AD_PASSWORD,
        attributes: {
            user: ['sAMAccountName', 'cn']
        }
}

const ad = new ActiveDirectory(config);

module.exports = ad;


