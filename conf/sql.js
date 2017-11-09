let mapping = {
    test: "SELECT * from nodes LIMIT 10;",
    getValidPoints: "SELECT COUNT(*) AS 'num', gridid AS 'id' from validrecs GROUP BY gridid;"
};

export default mapping;