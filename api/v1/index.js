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

const test = (ctx, next) => {
    ctx.body = {
        name: 'test'
    };
}

const basicGraph = async(ctx, next) => {
    // console.log('-----request------\n', ctx.request);
    // console.log('----- query ------\n', ctx.query);
    // console.log('-----querystr------\n', ctx.querystring);

    let queryParams = ctx.query,
        pool = connectMySQL(mysqlParams);

    ctx.body = await queryGraph(pool, queryParams);
}

export {
    test,
    basicGraph
}