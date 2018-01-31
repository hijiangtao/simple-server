import {
    connMySQL,
    queryMySQLElements
} from '../../util/base';
import {
    SQLParams
} from '../params';
import * as div_to_poi_demo from '../../conf/demo/div_to_poi_20160705112017070517';
import * as poi_to_div_demo from '../../conf/demo/poi_to_div_20160705112017070517';

/**
 * 基本图查询服务
 * @param {*} pool 
 * @param {*} queryparams 
 */
export const queryGraph = async (db, queryparams) => {
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