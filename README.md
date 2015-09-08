# ioredis-pool

A node.js connection pool for [ioredis](https://github.com/luin/ioredis).

## Features

Select node by name

## Installation

```sh
npm install ioredis-pool
```

## Quick start
```js
var RedisCluster = require('ioredis-pool');

var redis = new RedisCluster([
	{name: 'localhost', host: 'localhost', port: 6379},
	{name: 'localhost2', host: 'localhost', port: 6380}
]);

var node1 = redis.selectNode('localhost');
node1.set('foo', 'bar');
node1.get('foo', function(err, result) {
	console.log(result);
});
```