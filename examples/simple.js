var RedisCluster = require('../');

var redis = new RedisCluster([
	{name: 'localhost', host: 'localhost', port: 6379},
	{name: 'localhost2', host: 'localhost', port: 6380}
]);

var node1 = redis.selectNode('localhost');
node1.set('foo', 'bar');
node1.get('foo', function(err, result) {
	console.log(result);
});