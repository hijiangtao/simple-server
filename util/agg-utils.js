import $sql from '../conf/sql';
import {
    createConn
} from '../util/base';

/**
 * 测试服务
 * @param {*} pool 
 * @param {*} queryparams 
 */
const test = async(pool) => {
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

const SQLParams = {
    ver: ['v1', 'v2'],
    nTableName: {
        'a': {
            'v1': 'anode',
            'v2': 'anodev2'
        },
        'g': {
            'v1': 'nodes',
            'v2': 'nodes'
        }
    },
    eTableName: {
        'aa': {
            'v1': 'aaedge',
            'v2': 'aaedgev2'
        },
        'gg': {
            'v1': 'edges',
            'v2': 'edges'
        }
    }
}

/**
 * 基本图查询服务
 * @param {*} pool 
 * @param {*} queryparams 
 */
const queryGraph = async(pool, queryparams) => {
    //  数据库查询入参处理
    const {
        spaceType,
        timeType,
        netType,
        v
    } = queryparams;
    let tmp;
    let qNodeInput = [],
        qEdgeInput = [];
    let ver = SQLParams['ver'].indexOf(v) !== -1 ? v : 'v1';

    let nodesSqlType = 'g',
        edgesSqlType = 'gg';
    switch (spaceType) {
        case 'div':
            nodesSqlType = 'a';
            edgesSqlType = 'aa';
            break;
        default:
            break;
    }

    qNodeInput.push(SQLParams['nTableName'][nodesSqlType][ver]);
    qEdgeInput.push(SQLParams['eTableName'][edgesSqlType][ver]);

    if (timeType === 'duration') {
        const {
            beginTime,
            endTime
        } = queryparams;
        tmp = beginTime;
        qNodeInput.push(beginTime, endTime);
        qEdgeInput.push(beginTime, endTime);
    }

    // 结果
    let connection = await createConn(pool),
        rawNodes = await queryElements(connection, `q${nodesSqlType}nodes`, qNodeInput),
        rawEdges = await queryElements(connection, `q${edgesSqlType}edges`, qEdgeInput);

    connection.release();
    return {
        "nodes": rawNodes,
        "edges": rawEdges,
        "props": {
            "date": tmp,
            "period": 1
        }
    }
}

/**
 * 具体数据库单次查询异步函数
 * @param {*} conn 
 * @param {*} type 
 * @param {*} params 
 */
const queryElements = async(conn, type, params) => {
    return new Promise((resolve, reject) => {
        let query = $sql[type];
        conn.query(query, params, (err, res) => {
            if (err) {
                reject(err);
            }

            resolve(res);
        });
    })
}

/**
 * 数据库查询结果转换计算函数
 * @param {*} rawNodes 
 * @param {*} rawEdges 
 * @param {*} type 
 */
const resToGraph = (rawNodes, rawEdges, type = 'default') => {
    let nkeys = new Map(),
        ekeys = new Map(),
        nodes = [],
        edges = [];

    rawNodes.forEach((e) => {

    });

    rawEdges.forEach((e) => {

    });
}

export {
    test,
    queryGraph
}