import $sql from '../conf/sql';
import {
    createConn
} from '../util/base';

const test = async(pool, queryparams) => {
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

const queryGraph = async(pool, queryparams) => {
    // return new Promise((resolve, reject) => {
    //     pool.getConnection((err, connection) => {
    //         let {
    //             spaceType,
    //             timeType,
    //             netType
    //         } = queryparams,
    //         queryInput = [];

    //         if (timeType === 'duration') {
    //             let {
    //                 beginTime,
    //                 endTime
    //             } = queryparams;
    //             queryInput.push(beginTime, endTime);
    //         }
    //         // Use the connection
    //         connection.query($sql.test, (error, results) => {
    //             connection.release();

    //             // Handle error after the release.
    //             if (error) {
    //                 reject(error);
    //             }

    //             // console.log(results);
    //             resolve(results);
    //         });
    //     });
    // });

    const {
        spaceType,
        timeType,
        netType
    } = queryparams;
    let tmp;
    let queryInput = [];

    if (timeType === 'duration') {
        const {
            beginTime,
            endTime
        } = queryparams;
        tmp = beginTime;
        queryInput.push(beginTime, endTime);
    }

    let connection = await createConn(pool),
        rawNodes = await queryElements(connection, 'nodes', queryInput),
        rawEdges = await queryElements(connection, 'edges', queryInput);

    // return resToGraph(rawNodes, rawEdges);
    return {
        "nodes": rawNodes,
        "edges": rawEdges,
        "props": {
            "date": tmp,
            "period": 1
        }
    }
}

const queryElements = async(conn, type, params) => {
    return new Promise((resolve, reject) => {
        let query = $sql[`q${type}`];
        conn.query(query, params, (err, res) => {
            if (err) {
                reject(err);
            }

            resolve(res);
        });
    })
}

// const resToGraph = (rawNodes, rawEdges, type = 'default') => {
//     let nkeys = new Map(),
//         ekeys = new Map(),
//         nodes = [],
//         edges = [];

//     rawNodes.forEach((e) => {

//     });

//     rawEdges.forEach((e) => {

//     });
// }

export {
    test,
    queryGraph
}