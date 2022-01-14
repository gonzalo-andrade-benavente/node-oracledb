require('dotenv').config();

const oracledb = require('oracledb');


const dbConfig =  {
    user          : `${process.env.NODE_ORACLEDB_USER}`,

    // Get the password from the environment variable
    // NODE_ORACLEDB_PASSWORD.  The password could also be a hard coded
    // string (not recommended), or it could be prompted for.
    // Alternatively use External Authentication so that no password is
    // needed.
    password      : `${process.env.NODE_ORACLEDB_PASSWORD}`,

    // For information on connection strings see:
    // https://oracle.github.io/node-oracledb/doc/api.html#connectionstrings
    connectString : `${process.env.NODE_ORACLEDB_CONNECTIONSTRING}`,

    // Setting externalAuth is optional.  It defaults to false.  See:
    // https://oracle.github.io/node-oracledb/doc/api.html#extauth
    externalAuth  : false
};

(async () => {
    
    let connection, sql;

    try {
        
        oracledb.initOracleClient({
            libDir: `${process.env.HOME}/Downloads/instantclient_19_8`
        });

        connection = await oracledb.getConnection(dbConfig);        

        sql = `select sysdate from dual`;

        options = {
            outFormat: oracledb.OUT_FORMAT_OBJECT,
        }

        result = await connection.execute(sql, {}, options);

        console.log(result.rows, result.metaData);


    } catch (err) {
        console.log(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch(err) {
                console.log(err);
            }
        }
    }


})();

