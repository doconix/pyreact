	__nest__ (
		__all__,
		'clock', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var pyreact = {};
					var random = {};
					__nest__ (pyreact, '', __init__ (__world__.pyreact));
					__nest__ (random, '', __init__ (__world__.random));
					var randcolor = function () {
						return '#{}'.format (''.join (function () {
							var __accu0__ = [];
							for (var i = 0; i < 6; i++) {
								__accu0__.append (random.choice ('0123456789abcdef'));
							}
							return __accu0__;
						} ()));
					};
					var Clock = __class__ ('Clock', [pyreact.Component], {
						get __init__ () {return __get__ (this, function (self, props) {
							__super__ (Clock, '__init__') (self, props);
							self.state = dict ({'randcolor': randcolor ()});
						});},
						get render () {return __get__ (this, function (self) {
							return self.jsx ('\n            <button className="clock" style={style} onClick={self.on_click}>\n                <ClockNumber key="hour" value={self.props.hour} />\n                :\n                <ClockNumber key="minute" value={self.props.minute} />\n                :\n                <ClockNumber key="second" value={self.props.second} />\n            </button>\n        ', __kwargtrans__ ({style: dict ({'color': self.state.randcolor})}));
						});},
						get on_click () {return __get__ (this, function (self, evt) {
							self.setState (dict ({'randcolor': randcolor ()}));
						});}
					});
					var ClockNumber = __class__ ('ClockNumber', [pyreact.Component], {
						get render () {return __get__ (this, function (self) {
							return str (self.props.value).padStart (2, '0');
						});}
					});
					__pragma__ ('<use>' +
						'pyreact' +
						'random' +
					'</use>')
					__pragma__ ('<all>')
						__all__.Clock = Clock;
						__all__.ClockNumber = ClockNumber;
						__all__.randcolor = randcolor;
					__pragma__ ('</all>')
				}
			}
		}
	);
