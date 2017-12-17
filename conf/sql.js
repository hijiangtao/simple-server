let mapping = {
    test: "SELECT * from nodes LIMIT 10;",
    qnodes: "SELECT nid AS 'id', MIN(lat) AS 'y', MIN(lng) AS 'x', SUM(rec_num) AS 'stay_record_num', SUM(dev_num) AS 'stay_device_num' from nodes where seg>=? and seg<? GROUP BY nid;",
    qedges: "SELECT from_nid, to_nid, SUM(rec_num) AS 'travel_record_num', SUM(dev_num) AS 'travel_device_num' from edges where seg>=? and seg<? GROUP BY from_nid, to_nid;"
};

export default mapping;