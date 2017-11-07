let mysql = require('mysql');

const connectMySQL = (props) => {
    const {
        connectionLimit,
        host,
        user,
        password,
        database
    } = props;

    return mysql.createPool({
        connectionLimit,
        host,
        user,
        password,
        database
    });
}

const test = () => {
    return 'test!';
}

export {
    test,
    connectMySQL
};