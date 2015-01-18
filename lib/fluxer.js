"use strict";

var util = require('util');
var events = require('events');
var Actions = require('./actions');
var Store = require('./store');

var Fluxer = function() {
	var self = this;

	self.Actions = new Actions(self);
	self.Stores = {};
};

util.inherits(Fluxer, events.EventEmitter);

Fluxer.prototype.createActions = function(name, actions) {
	var self = this;

	return self.Actions._create(name, actions);
};

Fluxer.prototype.removeActions = function(name, actions) {
	var self = this;

	self.Actions._remove(name);
};

Fluxer.prototype.createStore = function(name) {
	var self = this;

	var store = self.Stores[name] = new Store(self);

	return store;
};

Fluxer.prototype.removeStore = function(name) {
	var self = this;

	if (!self.Stores[name])
		return;

	delete self.Stores[name];
};

// Singleton
var fluxer = new Fluxer();
module.exports = fluxer;
