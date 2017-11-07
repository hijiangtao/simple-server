import {
    test as demo
} from '../../util/base';

const test = (ctx, next) => {
    ctx.body = {
        name: 'test'
    };
}

const user = (ctx, next) => {
    ctx.body = demo();
}

export {
    test,
    user
}