"use strict";

var Actions = module.exports = function(fluxer) {
	var self = this;

	self._fluxer = fluxer;
};

Actions.prototype._create = function(name, actions) {
	var self = this;

	var actionsObj = {};
	actionsObj._name = name;
	actionsObj.$emit = function(actName) {
		var args = Array.prototype.slice.call(arguments);

		// First argument is event name
		args[0] = this._name + '.' + args[0];
		self._fluxer.emit.apply(self._fluxer, args);
	};

	if (actions instanceof Array) {

		for (var index in actions) {
			actName = actions[index];
			actionsObj[actName] = (function(actName) {
				return function() {
					var args = [ this._name + '.' + actName ].concat(Array.prototype.slice.call(arguments));

					// Emit event to dispatcher
					self._fluxer.emit.apply(self._fluxer, args);
				};
			})(actName);
		}
	} else if (typeof(actions) === 'string') {

		actionsObj[actions] = function() {
			var args = [ this._name + '.' + actName ].concat(Array.prototype.slice.call(arguments));

			// Emit event to dispatcher
			self._fluxer.emit.apply(self._fluxer, args);
		};
	} else {

		for (var actName in actions) {
			handler = actions[actName] || (function(actName) {
				var args = [ this._name + '.' + actName ].concat(Array.prototype.slice.call(arguments));

				return function() {
					// Emit event to dispatcher
					self._fluxer.emit.apply(self._fluxer, args);
				};
			})(actName);

			actionsObj[actName] = handler;
		}
	}

	self[name] = actionsObj;

	return actionsObj;
};

Actions.prototype._remove = function(name) {
	var self = this;

	if (name == '_fluxer' || !self[name])
		return;

	delete self[name];
};
