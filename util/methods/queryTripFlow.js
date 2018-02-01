import {
    connMySQL,
    queryMySQLElements
} from '../../util/base';

export const queryTripFlow = async (db, queryparams) => {
    const {
        type,
        thread = 14000,
        time = '2016-07-05 09:00:00',
        order = 'DESC',
        v = 'v1'
    } = queryparams;

    const filterAttribute = {
        'speed': 'speed',
        'record': 'rec_num',
        'basic': ''
    };

    // v = v ? v : 'v1';
    // thread = thread ? thread : 14000;
    // time = time ? time : '2016-07-05 09:00:00';
    // order = order ? order : 'DESC';
    let qInput = [time, filterAttribute[type], Number.parseInt(thread)];

    let connection = await connMySQL(db.mysqlPool),
        qEdges = await queryMySQLElements(connection, `qTripFlow`, qInput, order);

    connection.release();
    const qLen = qEdges.length;
    console.log('qEdges length: ', qLen)

    return {
        "edges": qEdges,
        "props": {
            "v": v,
            "length": qLen
        }
    }
}