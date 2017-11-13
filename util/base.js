let mysql = require('mysql');

const connectMySQL = (props) => {
    const {
        connectionLimit,
        host,
        user,
        password,
        database
    } = props;

    return mysql.createPool({
        connectionLimit,
        host,
        user,
        password,
        database
    });
}

const createConn = async(pool) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            }

            resolve(connection);
        })
    });
}

export {
    connectMySQL,
    createConn
};