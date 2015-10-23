// todo: start, stop live topology
// todo: export to JSON
(function (nx) {
	nx.define('ActionBar', nx.ui.Component, {
		properties: {
			'topology': null, // this prop will be actually initialized by this.assignTopology()
			'liveStatus': {
				get: function(){
					return this._liveStatus;
				},
				set: function(newValue){
					this._liveStatus = newValue;
					if(newValue.toLowerCase() == 'on') {
						this.liveStatusCSSClass('green-text');
						this.switchStatusButtonLabel('Stop');
					}
					else if(newValue.toLowerCase() == 'off') {
						this.liveStatusCSSClass('red-text');
						this.switchStatusButtonLabel('Start');
					}
				}
			},
			'liveStatusCSSClass': '',
			'switchStatusButtonLabel': 'Waiting...'
		},
		view: {
			content: [
				{
					tag: 'div',
					content: [
						{
							tag: 'span',
							content: '{#liveStatus}',
							props: {
								'class': '{#liveStatusCSSClass}'
							}
						},
						{
							// create the button and bind it to the event onAdd
							tag: 'button',
							content: '{#switchStatusButtonLabel}',
							events: {
								'click': '{#onSwitchStatus}'
							}
						}
					]
				}
			]
		},
		methods: {
			// action bar initialization
			'initialize': function (topo) {
				this.topology(topo);
				this.getStatus();
				this.liveStatus('N/A');
			},
			'getStatus': function(){
				var that = this;
				$.ajax({
					url: apiURL + "/status",
					type: 'GET',
					contentType: 'application/json',
					// as soon as scripts receives valid result, this function will be run
					success: function (data) {
						try {
							data = JSON.parse(data);
							if(data.hasOwnProperty('result')){
								if(data.result)
									that.liveStatus('ON');
								else
									that.liveStatus('OFF');
							}
						}
						catch(SyntaxError){
							alert('[getStatus] JSON response not valid.');
						}
					},
					// errors will never pass silently
					error: ajaxErrorHandler
				});
			},
			'onSwitchStatus': function(){
				var command = '';
				this.getStatus();

				if(this.liveStatus().toLowerCase() == 'off')
					command = '/start';
				else if(this.liveStatus().toLowerCase() == 'on')
					command = '/stop';

				if(command != ''){
					$.ajax({
						url: apiURL + command,
						type: 'GET',
						contentType: 'application/json',
						// as soon as scripts receives valid result, this function will be run
						success: function (data) {
							try {
								data = JSON.parse(data);
								// need to parse?
							}
							catch(SyntaxError){
								alert('[setStatus] JSON response not valid.');
							}
						},
						// errors will never pass silently
						error: ajaxErrorHandler
					});
				}

				this.getStatus();
			}
		}
	});
})(nx);