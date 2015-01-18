var Fluxer = require('../');

var todoActions = Fluxer.createActions('Todo', [ 'Create', 'Destroy' ]);
var todoStore = Fluxer.createStore();

Fluxer.on('Todo.Create', function(text) {
	console.log('Called Action \'Create\' with ' + text);
	todoStore.emit('change');
});

Fluxer.on('Todo.Destroy', function(text) {
	console.log('Called Action \'Destroy\' with ' + text);
	todoStore.emit('change');
});

todoActions.Create('TEXT');
todoActions.Destroy('TEXT');
