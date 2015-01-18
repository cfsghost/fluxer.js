var Fluxer = require('fluxerjs');

var todoActions = Fluxer.createActions('Todo', [
	'create',
	'destroy',
	'updateText',
	'destroyCompleted',
	'toggleCompleteAll'
]);

todoActions.toggleComplete = function(todo) {

	if (todo.complete)
		this.$emit('undoComplete', todo.id);
	else
		this.$emit('complete', todo.id);
};

module.exports = todoActions;
