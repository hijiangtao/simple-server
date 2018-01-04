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
const connMySQL = async(pool) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            }

            resolve(connection);
        })
    });
}

const connMongo = async(MongoClient, url, dbname) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, client) => {
            console.log("Connected successfully to server");
            if (err) {
                reject(err);
            }

            const db = client.db(dbname);
            resolve({
                db,
                client
            });
        });
    })
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
    connMySQL,
    connMongo,
    jsonpTransfer
};