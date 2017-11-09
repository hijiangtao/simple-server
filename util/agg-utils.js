import $sql from '../conf/sql';

const queryGraph = async(pool, queryparams) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            let {
                spaceType,
                timeType,
                netType
            } = queryparams,
            queryInput = [];

            if (timeType === 'duration') {
                let {
                    beginTime,
                    endTime
                } = queryparams;
                queryInput.push(beginTime, endTime);
            }
            // Use the connection
            connection.query($sql.test, (error, results) => {
                connection.release();

                // Handle error after the release.
                if (error) {
                    reject(error);
                }

                // console.log(results);
                resolve(results);
            });
        });
    });
}

export {
    queryGraph
}