import {
    connMySQL,
    queryMySQLElements
} from '../../util/base';

export const queryClusterDots = async (db, queryparams) => {
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