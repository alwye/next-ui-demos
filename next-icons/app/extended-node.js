(function(nx){
	nx.define("ExtendedNode", nx.graphic.Topology.Node, {
		view: function(view){

			view.content.push({
				"name": "deviceDownBadge",
				"type": "nx.graphic.Group",
				"content": [
					{
						"name": "deviceDownBadgeBg",
						"type": "nx.graphic.Rect",
						"props": {
							"class": "device-down-bg",
							"height": 1,
							"visible": false
						}
					},
					{
						"name": "deviceDownBadgeText",
						"type": "nx.graphic.Icon",
						"props": {
							"class": "icon",
							"iconType": "devicedown",
							"color": "#ff0000",
							"showIcon": true,
							"scale": 1,
							"visible": false
						}
					}
				]
			});
			return view;
		},
		methods: {
			// inherit properties/parent"s data
			"init": function(args){
				this.inherited(args);
				var stageScale = this.topology().stageScale();
				this.view("label").setStyle("font-size", 14 * stageScale);
			},
			// inherit parent"s model
			"setModel": function(model) {
				this.inherited(model);

				// if status is down
				if( this.model().get("status") == "down" ) {
					this._drawDeviceDownBadge();
				}
			},
			"_drawDeviceDownBadge": function(){

				var badge, badgeBg, badgeText,
					icon, iconSize, iconScale,
					bound, boundMax, badgeTransform;

				// views of badge
				badge = this.view("deviceDownBadge");
				badgeBg = this.view("deviceDownBadgeBg");
				badgeText = this.view("deviceDownBadgeText");

				// view of device icon
				icon = this.view('icon');
				iconSize = icon.size();
				iconScale = icon.scale();

				// define position of the badge
				badgeTransform = {
					x: iconSize.width * iconScale / 4,
					y: iconSize.height * iconScale / 4
				};

				// make badge visible
				badgeText.set("visible", true);

				// get bounds and apply them for white background
				bound = badge.getBound();
				boundMax = Math.max(bound.width - 6, 1);
				badgeBg.sets({
					width: boundMax,
					visible: true
				});

				// set position of the badge
				badgeBg.setTransform(badgeTransform.x, badgeTransform.y);
				badgeText.setTransform(badgeTransform.x, badgeTransform.y);

			}
		}
	});
})(nx);