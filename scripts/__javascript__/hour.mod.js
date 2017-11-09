	(function () {
		var pyreact = {};
		__nest__ (pyreact, '', __init__ (__world__.pyreact));
		var Clock = __class__ ('Clock', [pyreact.Component], {
			get __init__ () {return __get__ (this, function (self, props) {
				__super__ (Clock, '__init__') (self, props);
			});},
			get render () {return __get__ (this, function (self) {
				return list ([self.element (Hour, dict ({'hour': self.state.hour})), ' : ', self.element (Minute, dict ({'minute': self.state.minute}))]);
			});}
		});
		var main = function () {
			ReactDOM.render (React.createElement (App, dict ({})), document.getElementById ('approot'));
		};
		$ (main);
		__pragma__ ('<use>' +
			'pyreact' +
		'</use>')
		__pragma__ ('<all>')
			__all__.Clock = Clock;
			__all__.main = main;
		__pragma__ ('</all>')
	}) ();
