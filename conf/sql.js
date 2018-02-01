let mapping = {
    test: "SELECT * from nodes LIMIT 10;",
    qgnodes: "SELECT nid AS 'id', MIN(lat) AS 'y', MIN(lng) AS 'x', SUM(rec_num) AS 'stay_record_num', SUM(dev_num) AS 'stay_device_num' from ?? where seg>=? and seg<? GROUP BY nid;",
    qggedges: "SELECT from_nid, to_nid, SUM(rec_num) AS 'travel_record_num', SUM(dev_num) AS 'travel_device_num' from ?? where seg>=? and seg<? GROUP BY from_nid, to_nid;",
    qanodes: "SELECT N.nid AS 'id', MIN(B.lat) AS 'y', min(B.lng) AS 'x', SUM(N.rec_num) AS 'stay_record_num', SUM(dev_num) AS 'stay_device_num' from ?? N LEFT JOIN abase B ON N.nid = B.nid where N.seg>=? and N.seg<? GROUP BY N.nid;",
    qaaedges: "SELECT from_nid, to_nid, SUM(rec_num) AS 'travel_record_num', SUM(dev_num) AS 'travel_device_num' from ?? where seg>=? and seg<? GROUP BY from_nid, to_nid;",
    qpnodes: "SELECT N.nid AS 'id', MIN(B.lat) AS 'y', min(B.lng) AS 'x', SUM(N.rec_num) AS 'stay_record_num', SUM(dev_num) AS 'stay_device_num', B.name AS 'name', B.poitype AS 'type' from ?? N LEFT JOIN pbase B ON N.nid = B.nid where N.seg>=? and N.seg<? GROUP BY N.nid;",
    qedges: "SELECT from_nid, to_nid, SUM(rec_num) AS 'travel_record_num', SUM(dev_num) AS 'travel_device_num' from ?? where seg>=? and seg<? GROUP BY from_nid, to_nid;",
    qClusternodes: "SELECT nid AS 'id', lat AS 'y', lng AS 'x', name AS 'name', poitype AS 'type', ?? AS 'msType', ?? AS 'dsType' FROM `pbaseCluster` WHERE ?? != ? AND ?? != ?;",
    qTripFlow: (ORDER) => {
        return `SELECT glng  AS 'lng', glat AS 'lat', dir_type AS 'type', speed AS 'speed', rec_num AS 'num', dlng AS 'x', dlat AS 'y' FROM tripflow WHERE seg = ? ORDER BY ?? ${ORDER} LIMIT ?;`;
    }
};

export default mapping;