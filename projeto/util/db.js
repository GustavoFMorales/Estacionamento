const mysql = require(`mysql`);

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'estacionamento',
    multipleStatements: true
});

// Eefetiva a conexão

db.connect((erro) =>{
    if(erro){
        throw erro;
    }
    console.log(`Conectado ao banco de dados estacionamento`)
})

global.db = db;
module.exports = db;
