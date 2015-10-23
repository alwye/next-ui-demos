/*
This module implements data processing
*/

// define an empty topology data object
var nodesNames = [];

var apiURL = 'http://localhost:5555';

// function transforms odl respond to next json format
var odl2next = function (nx,topology,data,is_init) {
	// prepare stub for results
	var topologyResult = {nodes: [], links: []};

	// processing topology
	//try {
		// parsing JSON; if fails, it throws 'SyntaxError'
		data = JSON.parse(data);
		// if first time launched
		if(is_init)
			topology.data(data);
		// if launched by timer
		else {
			var nodesDict = new nx.data.Dictionary({});
			var linksDict = new nx.data.Dictionary({});

			nx.each(topology.data().nodes,function(node){
				nodesDict.setItem(node.id,node);
			});
			nx.each(topology.data().links,function(link){
				linksDict.setItem(link.id,link);
			});
			// go through fetched nodes' array
			nx.each(data.nodes, function (nodeData) {//console.log(data.nodes.length);
				var node = topology.getNode(nodeData.id);
				if(typeof(node) == 'Array'){
					// update if necessary
				}
				else{
					// if it's not array it means the node not exists, so we need to add it
					topology.addNode(nodeData);
					topology.data().nodeSet[nodeData.group].nodes.push(nodeData.id);
				}
				nodesDict.removeItem(nodeData.id);
			});
			// remove deleted nodes
			nodesDict.each(function(nodeObj,nodeId){
				topology.removeNode(nodeId);
			});

			// go through fetched links' array
			nx.each(data.links,function(linkData){
				var link = topology.getLink(linkData.id);
				// if it's an array it means the link exists and we don't need to add it
				if(typeof(link) == 'Array') {
					// update if necessary
				}
				else{
					topology.addLink(linkData);
				}
				linksDict.removeItem(linkData.id);
			});
			nodesDict.each(function(nodeObj,nodeId){
				topology.removeNode(nodeId);
			});
			// adjust topology's size
			topology.fit();
		}
	//}
	//catch(SyntaxError){
	//	alert('JSON response with topology data is not valid.\nVerify you REST API and server-side application.');
	//}
	return topologyResult;
};

var ajaxErrorHandler = function(jqXHR, exception){
	if (jqXHR.status === 0) {
		//alert('Not connect.\nVerify Network.');
	}
	else if (jqXHR.status == 404) {
		alert('Requested page not found. [404]');
	}
	else if (jqXHR.status == 500) {
		alert('Internal Server Error [500].');
	}
	else if (exception === 'parsererror') {
		alert('Requested JSON parse failed.');
	}
	else if (exception === 'timeout') {
		alert('Time out error.');
	}
	else if (exception === 'abort') {
		alert('Ajax request aborted.');
	}
	else {
		alert('Uncaught Error.\n' + jqXHR.responseText);
	}
};

// implementing an async http request
var loadJSON = function(app,topology,nx,is_init) {
	$.ajax({
		url: apiURL + "/topology",
		type: 'GET',
		contentType: 'application/json',
		// as soon as scripts receives valid result, this function will be run
		success: function (data) {
			// process ODL topology's JSON to turn it to next json
			odl2next(nx,topology,data,is_init);
		},
		// errors will never pass silently
		error: ajaxErrorHandler
	});
};