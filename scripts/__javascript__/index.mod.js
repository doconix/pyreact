	(function () {
		var pyreact = {};
		__nest__ (pyreact, '', __init__ (__world__.pyreact));
		var Clock = __init__ (__world__.clock).Clock;
		var App = __class__ ('App', [pyreact.Component], {
			get __init__ () {return __get__ (this, function (self, props) {
				__super__ (App, '__init__') (self, props);
				self.state = dict ({'hour': 0, 'minute': 0, 'second': 0});
			});},
			get render () {return __get__ (this, function (self) {
				return list (['The current time is ', self.element (Clock, dict ({'hour': self.state.hour, 'minute': self.state.minute, 'second': self.state.second, 'key': 'clock'})), '.']);
			});},
			get componentDidMount () {return __get__ (this, function (self) {
				var ticktock = function () {
					var d = new Date ();
					self.setState (dict ({'hour': d.getHours (), 'minute': d.getMinutes (), 'second': d.getSeconds ()}));
				};
				self.timer = window.setInterval (ticktock, 200);
			});},
			get componentWillUnmount () {return __get__ (this, function (self) {
				window.clearInterval (self.timer);
			});}
		});
		var main = function () {
			ReactDOM.render (React.createElement (App, dict ({})), document.getElementById ('approot'));
		};
		document.addEventListener ('DOMContentLoaded', main);
		__pragma__ ('<use>' +
			'clock' +
			'pyreact' +
		'</use>')
		__pragma__ ('<all>')
			__all__.App = App;
			__all__.Clock = Clock;
			__all__.main = main;
		__pragma__ ('</all>')
	}) ();
