"use strict";

var util = require('util');
var events = require('events');

var Dispatcher = module.exports = function(fluxer) {
	var self = this;

	self.fluxer = fluxer;
	self.actionsHandler = function() {
	};
};

util.inherits(Dispatcher, events.EventEmitter);

Dispatcher.prototype.addActions = function(actions) {
	var self = this;

	// Listen to actions
	actions.on(self.actionHandler);
};

Dispatcher.prototype.addStore = function(store) {
	var self = this;


};
