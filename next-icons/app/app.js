(function(nx, topologyData) {

	// register "font" icon
	nx.graphic.Icons.registerFontIcon('devicedown', 'FontAwesome', "\uf057", 20);

	var nxApp = new nx.ui.Application();

	var topology = new nx.graphic.Topology({
		adaptive: true,
		scalable: true,
		nodeConfig: {
			label: 'model.name',
			iconType: 'router'
		},
		nodeInstanceClass: 'ExtendedNode',
		linkConfig: {
			linkType: 'curve'
		},
		tooltipManagerConfig: {
			showLinkTooltip: false
		},
		dataProcessor: 'force',
		identityKey: 'id',
		showIcon: true,
		theme: 'blue',
		enableSmartNode: false
	});

	nxApp.container(document.getElementById('topology-container'));

	topology.attach(nxApp);
	topology.data(topologyData);

})(nx, topologyData);