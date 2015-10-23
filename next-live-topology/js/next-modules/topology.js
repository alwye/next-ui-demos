/*
This module is intended to configure topology class
 */

(function (nx) {
	nx.define('TopologyContainer', nx.ui.Component, {
		properties: {
			// we use this trick to use this object as a nx.ui.Component and display topology at the same time
			topology: {
				get: function () {
					// it retrieves the topology instance from the view, which is defined below
					return this.view('topology');
				}
			}
		},
		// define view
		view: {
			content: [
				{
					'name': 'topology', // object name
					'type': 'nx.graphic.Topology', // object type
					// this defines properties of a nx.graphic.Topology instance
					// see full specifications online
					// https://developer.cisco.com/site/neXt/document/api-reference-manual/
					'props': {
						'adaptive': true, // width 100% if true
						'showIcon': true, // depicts node as a dot if false
						'nodeConfig': {
							'label': 'model.name',
							'iconType': 'switch',
							'color': '#0how00'
						},
						'linkConfig': {
							'linkType': 'curve'
						},
						nodeSetConfig: {
							'label': 'model.label',
							'iconType': 'groupL'
						},
						tooltipManagerConfig: {
							nodeTooltipContentClass: 'TooltipNode',
							linkTooltipContentClass: 'TooltipLink',
							nodeSetTooltipContentClass: 'TooltipNode'
						},
						'identityKey': 'id', // helps to link source and target
						'width': 800,
						'height': 400,
						//'dataProcessor': 'force', // arrange nodes positions if not set
						'enableSmartLabel': true, // moves the labels in order to avoid overlay of them
						'enableGradualScaling': true, // may slow down, if true
						'supportMultipleLink': true // if true, two nodes can have more than one link
					}
				}
			]
		}
	});
})(nx);