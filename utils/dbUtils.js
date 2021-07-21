
const uuid = require('uuid');

class muuid {
  static uuidV4 = uuid.v4(); 
}



const sql = require('mssql');
const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: process.env.DB_HOST,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
};

(async () => {
  console.log('Trying to make connection to tata bot');
  try {
    await sql.connect(sqlConfig);
  }
  catch (err) {
    console.log('The error while connecting the DB is : ' + err);
  }
  
})();

const insertDataTataDb = async (muser, text) => {

  return;
  var now = new Date();
  const request = new sql.Request();
  request.input('mid', sql.UniqueIdentifier, muuid.uuidV4);
  request.input('cli', sql.Int,'');
  request.input('usertype', sql.VarChar, muser);
  request.input('mdate', sql.DateTime,now);
  request.input('mtext', sql.VarChar, text);
  try {
      // make sure that any items are correctly URL encoded in the connection string
      request.query('insert into botdata (mid,cli,usertype,mdate,mtext) values (@mid, @cli, @usertype, @mdate, @mtext)', (err, result) => {
        //console.dir(result);
        if(err){
          console.dir(err);
        }
    });
  } catch (err) {
      console.log('The error while quering the DB is : ' + err);
  }
};

module.exports.insertDataTataDb = insertDataTataDb;
module.exports.uuidV4 = muuid.uuidV4;