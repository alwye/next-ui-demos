module.exports = {
	response: {
		nodes: [
			{id: 0, name: "Root Router AS-1", x: 100, y: 100, group:0},
			{id: 1, name: "Root Router AS-2", x: 70, y: 150, group:1},
			{id: 2, name: "Root Router AS-3", x: 130, y: 150, group:2}
		],
		links: [
			{id: 0, source: 0, target: 1},
			{id: 1, source: 1, target: 2},
			{id: 2, source: 0, target: 2}
		],
		nodeSet: [
			{
				nodes: [0],
				"label": "AS 1",
				iconType: 'groupL',
				x: 100,
				y: 100
			},
			{
				nodes: [1],
				"label": "AS 2",
				iconType: 'groupL',
				x: 70,
				y: 150
			},
			{
				nodes: [2],
				"label": "AS 3",
				iconType: 'groupL',
				x: 130,
				y: 150
			}
		]
	}
};