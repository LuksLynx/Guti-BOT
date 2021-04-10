const mysql = require ("mysql");
const connection = mysql.createConnection({
	host:process.env.DB_HOST,
	user:process.env.DB_USER,
	password:process.env.DB_PASSWORD,
	database:process.env.DB_NAME
});

connection.connect( error => {
    if(error) return console.error(error);
    console.log('MySQL OK');
} );

exports.query = async (query, custom=false) => {
    return new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
            return err ? reject(err) : resolve(custom ? result : result[0]);
        });
    });
};