/*
Main module that manages the topology app
 */

(function (nx) {
	// initialize a new application instance
	var app = new nx.ui.Application();
	var topologyContainer = new TopologyContainer();
	// topology instance was made in TopologyContainer, but we can invoke its members through 'topology' variable for convenience
	var topology = topologyContainer.topology();
	var actionBar = new ActionBar();
	actionBar.initialize(topology);
	//assign the app to the <div>
	app.container(document.getElementById('next-app'));
	loadJSON(app,topology,nx,true);
	topology.attach(app);
	actionBar.attach(app);
	setInterval(function(){loadJSON(app,topology,nx,false)},500);




	topo = topology;

	topo.on("topologyGenerated", function() {


		topo.stage().on('dblclick', function(sender, event) {
			var target = event.target;
			var nodesLayerDom = topo.getLayer('nodes').dom().$dom;
			var linksLayerDom = topo.getLayer('links').dom().$dom;
			var nodeSetLayerDom = topo.getLayer('nodeSet').dom().$dom;
			var id;


			//db click node
			if (nodesLayerDom.contains(target)) {
				while (!target.classList.contains('node')) {
					target = target.parentElement;
				}
				id = target.getAttribute('data-id');
				var node = topo.getNode(id);
				alert('double click node');

				return;
			}


			//db click node
			if (linksLayerDom.contains(target)) {
				while (!target.classList.contains('link')) {
					target = target.parentElement;
				}
				id = target.getAttribute('data-id');

				var link = topo.getLink(id);
				alert('double click link');

				return;
			}

			//....


		})


		var popup = new nx.ui.Popover({
			width: 300,
			height: 200,
			offset:5
		});
		topo.on('contextmenu', function(sender, event) {
			popup.open({
				target: {
					x: event.offsetX,
					y: event.offsetY
				}
			});
		});

		topo.on('clickStage', function(sender, event) {
			popup.close();
		});







	});










})(nx);