var Fluxer = require('fluxerjs');

var _todos = {};

var todoStore = Fluxer.createStore('Todo');

/**
* Tests whether all the remaining TODO items are marked as completed.
* @return {boolean}
*/
todoStore.areAllComplete = function() {
	for (var id in _todos) {
		if (!_todos[id].complete) {
			return false;
		}
	}

	return true;
};

/**
 * Get the entire collection of TODOs.
 * @return {object}
 */
todoStore.getAll = function() {
	return _todos;
};

Fluxer.on('Todo.create', function(text) {
	// Hand waving here -- not showing how this interacts with XHR or persistent
	// server-side storage.
	// Using the current timestamp + random number in place of a real id.
	var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
	_todos[id] = {
		id: id,
		complete: false,
		text: text
	};

	todoStore.emit('change');
});

Fluxer.on('Todo.destroy', function(id) {
	delete _todos[id];
	todoStore.emit('change');
});

Fluxer.on('Todo.updateText', function(id, text) {
	text = text.trim();
	if (text === '')
		return;

	_todos[id].text = text;

	todoStore.emit('change');
});

Fluxer.on('Todo.complete', function(id) {

	_todos[id].complete = true;

	todoStore.emit('change');
});

Fluxer.on('Todo.undoComplete', function(id) {

	_todos[id].complete = false;

	todoStore.emit('change');
});

Fluxer.on('Todo.destroyCompleted', function() {
	for (var id in _todos) {
		if (_todos[id].complete) {
			delete _todos[id];
		}
	}

	todoStore.emit('change');
});

Fluxer.on('Todo.toggleCompleteAll', function() {

	var complete = !todoStore.areAllComplete();

	for (var id in _todos) {
		_todos[id].complete = complete;
	}

	todoStore.emit('change');
});

module.exports = todoStore;
