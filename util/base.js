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

/**
 * 判断 data 是否需要转换为 JSONP 格式
 * @param {*} data 
 * @param {*} params 
 */
const jsonpTransfer = (data, params) => {
    const callback = params.callback;
    if (callback) {
        return `${callback}(${JSON.stringify(data)})`;
    } else {
        return data;
    }
}

export {
    connectMySQL,
    createConn,
    jsonpTransfer
};