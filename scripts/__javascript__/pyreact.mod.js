	(function () {
		var re = {};
		__nest__ (re, '', __init__ (__world__.re));
		var __pyreact_version__ = '1.0.0';
		if (!(window ['PyReact'])) {
			console.warn ('The PyReact JS object is not available. Have you loaded the <script> element for pyreact-bundle.js?');
		}
		else if (window ['PyReact'].__pyreact_version__ != __pyreact_version__) {
			console.warn ('Version mismatch in PyReact: pyreact-bundle.js is {} while pyreact.py is {}'.format (window ['PyReact'].__pyreact_version__, __pyreact_version__));
		}
		var registered_components = dict ({});
		var ComponentMeta = __class__ ('ComponentMeta', [py_metatype], {
			get __new__ () {return __get__ (this, function (meta, py_name, bases, attribs) {
				if (arguments.length) {
					var __ilastarg0__ = arguments.length - 1;
					if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
						var __allkwargs0__ = arguments [__ilastarg0__--];
						for (var __attrib0__ in __allkwargs0__) {
							switch (__attrib0__) {
								case 'meta': var meta = __allkwargs0__ [__attrib0__]; break;
								case 'py_name': var py_name = __allkwargs0__ [__attrib0__]; break;
								case 'bases': var bases = __allkwargs0__ [__attrib0__]; break;
								case 'attribs': var attribs = __allkwargs0__ [__attrib0__]; break;
							}
						}
					}
				}
				else {
				}
				var cls = py_metatype.__new__ (meta, py_name, bases, attribs);
				registered_components [py_name] = cls;
				var descrip = Object.getOwnPropertyDescriptor (cls, 'name');
				descrip.value = py_name;
				Object.defineProperty (cls, 'name', descrip);
				return cls;
			});}
		});
		var AbstractComponent = __class__ ('AbstractComponent', [object], {
			get __init__ () {return __get__ (this, function (self, props) {
				if (arguments.length) {
					var __ilastarg0__ = arguments.length - 1;
					if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
						var __allkwargs0__ = arguments [__ilastarg0__--];
						for (var __attrib0__ in __allkwargs0__) {
							switch (__attrib0__) {
								case 'self': var self = __allkwargs0__ [__attrib0__]; break;
								case 'props': var props = __allkwargs0__ [__attrib0__]; break;
							}
						}
					}
				}
				else {
				}
				object.__init__ (self);
			});},
			get render () {return __get__ (this, function (self) {
				if (arguments.length) {
					var __ilastarg0__ = arguments.length - 1;
					if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
						var __allkwargs0__ = arguments [__ilastarg0__--];
						for (var __attrib0__ in __allkwargs0__) {
							switch (__attrib0__) {
								case 'self': var self = __allkwargs0__ [__attrib0__]; break;
							}
						}
					}
				}
				else {
				}
				return 'Subclass should override render()';
			});},
			get element () {return __get__ (this, function (self, elem, props) {
				if (arguments.length) {
					var __ilastarg0__ = arguments.length - 1;
					if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
						var __allkwargs0__ = arguments [__ilastarg0__--];
						for (var __attrib0__ in __allkwargs0__) {
							switch (__attrib0__) {
								case 'self': var self = __allkwargs0__ [__attrib0__]; break;
								case 'elem': var elem = __allkwargs0__ [__attrib0__]; break;
								case 'props': var props = __allkwargs0__ [__attrib0__]; break;
							}
						}
					}
					var children = tuple ([].slice.apply (arguments).slice (3, __ilastarg0__ + 1));
				}
				else {
					var children = tuple ();
				}
				return React.createElement (elem, props, ...children);
			});},
			get jsx () {return __get__ (this, function (self, jsx_st, context) {
				if (typeof context == 'undefined' || (context != null && context .hasOwnProperty ("__kwargtrans__"))) {;
					var context = null;
				};
				var kw_context = dict ();
				if (arguments.length) {
					var __ilastarg0__ = arguments.length - 1;
					if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
						var __allkwargs0__ = arguments [__ilastarg0__--];
						for (var __attrib0__ in __allkwargs0__) {
							switch (__attrib0__) {
								case 'self': var self = __allkwargs0__ [__attrib0__]; break;
								case 'jsx_st': var jsx_st = __allkwargs0__ [__attrib0__]; break;
								case 'context': var context = __allkwargs0__ [__attrib0__]; break;
								default: kw_context [__attrib0__] = __allkwargs0__ [__attrib0__];
							}
						}
						delete kw_context.__kwargtrans__;
					}
				}
				else {
				}
				var jsx_context = dict ({});
				jsx_context.py_update (registered_components);
				jsx_context ['self'] = self;
				if (context !== null) {
					jsx_context.py_update (context);
				}
				if (len (kw_context) > 0) {
					jsx_context.py_update (kw_context);
				}
				try {
					return PyReact.jsx (jsx_st, jsx_context);
				}
				catch (__except0__) {
					if (isinstance (__except0__, ReferenceError)) {
						var e = __except0__;
						var msg = 'jsx references an unknown context name: {}'.format (e.message);
						console.error (msg, e);
						return msg;
					}
					else {
						throw __except0__;
					}
				}
			});}
		}, ComponentMeta);
		var Component = __class__ ('Component', [AbstractComponent, React.Component.prototype], {
			get __init__ () {return __get__ (this, function (self, props) {
				if (arguments.length) {
					var __ilastarg0__ = arguments.length - 1;
					if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
						var __allkwargs0__ = arguments [__ilastarg0__--];
						for (var __attrib0__ in __allkwargs0__) {
							switch (__attrib0__) {
								case 'self': var self = __allkwargs0__ [__attrib0__]; break;
								case 'props': var props = __allkwargs0__ [__attrib0__]; break;
							}
						}
					}
				}
				else {
				}
				AbstractComponent.__init__ (self);
				React.Component.apply (self, list ([props]));
			});}
		});
		var PureComponent = __class__ ('PureComponent', [AbstractComponent, React.PureComponent.prototype], {
			get __init__ () {return __get__ (this, function (self, props) {
				if (arguments.length) {
					var __ilastarg0__ = arguments.length - 1;
					if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
						var __allkwargs0__ = arguments [__ilastarg0__--];
						for (var __attrib0__ in __allkwargs0__) {
							switch (__attrib0__) {
								case 'self': var self = __allkwargs0__ [__attrib0__]; break;
								case 'props': var props = __allkwargs0__ [__attrib0__]; break;
							}
						}
					}
				}
				else {
				}
				AbstractComponent.__init__ (self);
				React.PureComponent.apply (self, list ([props]));
			});}
		});
		__pragma__ ('<use>' +
			're' +
		'</use>')
		__pragma__ ('<all>')
			__all__.AbstractComponent = AbstractComponent;
			__all__.Component = Component;
			__all__.ComponentMeta = ComponentMeta;
			__all__.PureComponent = PureComponent;
			__all__.__pyreact_version__ = __pyreact_version__;
			__all__.registered_components = registered_components;
		__pragma__ ('</all>')
	}) ();
