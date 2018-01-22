import $sql from '../conf/sql';
import {
    connMySQL,
    connMongo
} from '../util/base';
import {
    SQLParams
} from './params';
import * as div_to_poi_demo from '../conf/demo/div_to_poi_20160705112017070517';
import * as poi_to_div_demo from '../conf/demo/poi_to_div_20160705112017070517';

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

/**
 * 基本图查询服务
 * @param {*} pool 
 * @param {*} queryparams 
 */
const queryGraph = async(db, queryparams) => {
    //  数据库查询入参处理
    const {
        spaceType,
        timeType,
        netType,
        v,
        other
    } = queryparams;

    if (other === 'div_to_poi_demo') {
        return div_to_poi_demo;
    } else if (other === 'poi_to_div_demo') {
        return poi_to_div_demo;
    }

    let tmp;
    let qNodeInput = [],
        qEdgeInput = [];
    let ver = SQLParams['ver'].indexOf(v) !== -1 ? v : 'v1';

    let nodesSqlType = ['g'],
        edgesSqlType = 'gg';
    switch (spaceType) {
        case 'div':
            nodesSqlType = ['a'];
            edgesSqlType = 'aa';
            break;
        case 'poi':
            nodesSqlType = ['p'];
            edgesSqlType = 'pp';
            break;
        case 'div_to_poi':
            nodesSqlType = ['a', 'p'];
            edgesSqlType = 'ap';
            break;
        case 'poi_to_div':
            nodesSqlType = ['p', 'a'];
            edgesSqlType = 'pa';
            break;
        default:
            break;
    }

    qNodeInput.push(SQLParams['nTableName'][nodesSqlType[0]][ver]);
    qEdgeInput.push(SQLParams['eTableName'][edgesSqlType][ver]);

    if (timeType === 'duration') {
        const {
            beginTime,
            endTime
        } = queryparams;
        tmp = [beginTime, endTime];
        qNodeInput.push(beginTime, endTime);
        qEdgeInput.push(beginTime, endTime);
    }

    // 结果
    let connection = await connMySQL(db.mysqlPool),
        qNodes = queryMySQLElements(connection, `q${nodesSqlType[0]}nodes`, qNodeInput),
        qEdges = queryMySQLElements(connection, `qedges`, qEdgeInput);

    let qEles = [await qNodes, await qEdges];

    let [rawNodes, rawEdges] = qEles;
    let qSecondNodes = nodesSqlType.length === 1 ? false : true;
    qNodeInput[0] = qSecondNodes ? SQLParams['nTableName'][nodesSqlType[1]][ver] : qNodeInput[0];
    let secNodes = qSecondNodes ? await queryMySQLElements(connection, `q${nodesSqlType[1]}nodes`, qNodeInput) : null;

    connection.release();
    const nodesRes = qSecondNodes ? [rawNodes, secNodes] : [rawNodes],
        edgesRes = [rawEdges];
    return {
        "nodes": nodesRes,
        "edges": edgesRes,
        "props": {
            "date": tmp,
            spaceType,
            timeType,
            netType,
            nodesLen: nodesRes.length,
            edgesLen: edgesRes.length,
            "v": ver
        }
    }
}


const queryClusterDots = async(db, queryparams) => {
    const {
        customize,
        filterNoise,
        v
    } = queryparams;

    const msType = 'm12_default',
        dsType = 'd_001_10';

    let qInput = [msType, dsType, msType, -2, dsType, -2];

    if (Number.parseInt(filterNoise)) {
        qInput[3] = -1;
        qInput[5] = -1;
    }

    let connection = await connMySQL(db.mysqlPool),
        qNodes = await queryMySQLElements(connection, `qClusternodes`, qInput);

    connection.release();
    console.log('qNodes length: ', qNodes.length)

    return {
        "nodes": qNodes,
        "props": {
            "v": v,
            "filterNoise": Boolean(filterNoise)
        }
    }
}

/**
 * 具体 MySQL 数据库单次查询异步函数
 * @param {*} conn 
 * @param {*} type 
 * @param {*} params 
 */
const queryMySQLElements = async(conn, type, params) => {
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
 * [废弃]在 mongodb 中查找 POI
 * @param {*} db 
 */
const queryPOIs = async(db) => {
    return new Promise((resolve, reject) => {
        const collection = db.collection('pois');
        // Find some documents
        collection.find({}, {
            "pid": 1,
            "properties": 1
        }).toArray((err, docs) => {
            console.log("Found the following records");
            resolve(docs);
        })
    })
}

/**
 * [废弃] 跨数据库查询节点与边信息
 * @param {*} rawNodes 
 * @param {*} rawEdges 
 * @param {*} type 
 */
const crossDatabseQuery = async(nodeType, edgeType, {
    mysqlPool,
    MongoClient,
    mongoUrl
}) => {
    // 查询 MySQL 点信息
    let connection = await connMySQL(mysqlPool),
        rawNodes = await queryMySQLElements(connection, `q${nodesSqlType}nodes`, qNodeInput);

    // 查询 from/to 两边节点的列表，用于筛选

    // 查询 POI 点信息
    let mongo = await connMongo(MongoClient, mongoUrl, MONGO_DB_NAME);
    let pois = await queryPOIs(mongo.db);

    mongo.client.close();

    // 查询边信息

    // 融合点边信息，去除无用的 POI 信息


    return {

    }
}

export {
    test,
    queryGraph,
    queryClusterDots
}