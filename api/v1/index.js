import {
    connectMySQL,
    jsonpTransfer
} from '../../util/base';
import {
    queryGraph,
    test as queryTest,
    queryClusterDots
} from '../../util/agg-utils';
import {
    mysqlParams
} from '../../conf/db';

const mysqlPool = connectMySQL(mysqlParams);

const testGraph = async(ctx, next) => {
    ctx.body = await queryTest(mysqlPool);
}

/**
 * 基本图查询后台 API 实现
 * @param {*} ctx 
 * @param {*} next 
 */
const basicGraph = async(ctx, next) => {
    let queryParams = ctx.query,
        cbFunc = queryParams.callback;

    const res = await queryGraph({
        mysqlPool
    }, queryParams);
    return ctx.body = jsonpTransfer(res, queryParams);
}

const clusterDots = async(ctx, next) => {
    let queryParams = ctx.query,
        cbFunc = queryParams.callback;

    const res = await queryClusterDots({
        mysqlPool
    }, queryParams);
    return ctx.body = jsonpTransfer(res, queryParams);
}

export {
    testGraph,
    basicGraph,
    clusterDots
}