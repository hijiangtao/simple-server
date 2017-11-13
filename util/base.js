let mysql = require('mysql');

/**
 * MySQL pool 建立函数
 * @param {*} props 
 */
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

/**
 * connection 建立函数
 * @param {*} pool 
 */
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