"use strict";

var util = require('util');
var events = require('events');

var Store = module.exports = function(fluxer) {
	var self = this;

	self._fluxer = fluxer;
};

util.inherits(Store, events.EventEmitter);
