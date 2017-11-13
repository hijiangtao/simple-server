import {
    connectMySQL
} from '../../util/base';
import {
    queryGraph,
    test as queryTest
} from '../../util/agg-utils';
import {
    mysqlParams
} from '../../conf/db';

const testGraph = async(ctx, next) => {
    ctx.body = await queryTest(pool);
}

/**
 * 基本图查询后台 API 实现
 * @param {*} ctx 
 * @param {*} next 
 */
const basicGraph = async(ctx, next) => {
    // console.log('-----request------\n', ctx.request);
    // console.log('----- query ------\n', ctx.query);
    // console.log('-----querystr------\n', ctx.querystring);

    let queryParams = ctx.query,
        pool = connectMySQL(mysqlParams);

    ctx.body = await queryGraph(pool, queryParams);
}

export {
    testGraph,
    basicGraph
}