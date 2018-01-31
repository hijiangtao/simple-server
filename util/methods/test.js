import $sql from '../../conf/sql';

/**
 * 测试服务
 * @param {*} pool 
 * @param {*} queryparams 
 */
export const test = async (pool) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            // Use the connection
            connection.query($sql.test, (error, results) => {
                connection.release();

                if (error) {
                    reject(error);
                }

                resolve(results);
            });
        });
    });
}