const mysql = require ("mysql");
const connection = mysql.createConnection({host:'localhost',user:'root',password:'Violeta60895',database:'GutiDB'});

connection.connect( error => {
    if(error) return console.error(error);
    console.log('MySQL OK');
} );

exports.query = async (query) => {
    return new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
            return err ? reject(err) : resolve(result[0]);
        });
    });
};