var Redis = require('ioredis');
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var _ = require('lodash');

function RedisCluster (startupNodes) {
	EventEmitter.call(this);

	if (!Array.isArray(startupNodes) || startupNodes.length === 0) {
		throw new Error('`startupNodes` should contain at least one node.');
	}
	this.startupNodes = startupNodes;

	this.nodes = {};

	this.connect();
}
util.inherits(RedisCluster, EventEmitter);

RedisCluster.prototype.connect = function() {
	this.startupNodes.forEach(function(options) {
		this.nodes[options.name] = new Redis(options);
	}, this);
};

RedisCluster.prototype.disconnect = function() {
	var keys = Object.keys(this.nodes);
	for (var i = 0; i < keys.length; ++i) {
		this.nodes[keys[i]].disconnect();
	}
};

RedisCluster.prototype.selectRandomNode = function() {
	var keys = Object.keys(this.nodes);
	return (keys.length > 0) ? this.nodes[_.sample(keys)] : null;
};

RedisCluster.prototype.selectNode = function(nodeName) {
	var keys = Object.keys(this.nodes);
	return (keys.indexOf(nodeName) > -1) ? this.nodes[nodeName] : null;
};

module.exports = RedisCluster;
