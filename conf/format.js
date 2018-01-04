export const API = {
    '/api/basicGraph': {
        spaceType: ['div', 'poi', 'div_to_poi', 'poi_to_div'],
        timeType: ['duration'],
        netType: ['basic'],
        other: ['none', 'div_to_poi_demo', 'poi_to_div_demo'],
        v: ['', 'v1', 'v2'],
        beginTime: '2017-01-01 00:00:00',
        endTime: '2017-01-01 00:00:00'
    }
}

export const res = {
    "nodes": [
        [],
        []
    ],
    "edges": [
        []
    ],
    "props": {
        "date": [
            "2016-07-05 11:00:00",
            "2016-07-05 17:00:00"
        ],
        "spaceType": "poi_to_div",
        "timeType": "duration",
        "netType": "basic",
        "nodesLen": 2,
        "edgesLen": 1,
        "v": "v1"
    }
}