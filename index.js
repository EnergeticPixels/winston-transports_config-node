'use strict';

//var express = require('express');
var config = require('config-node')({
	dir: 'config', // where to look for files
	ext: '', // tell me which one it is ('' for directory). Improves performance.
	env: process.env.NODE_ENV || 'development' // set which one instead of smart defaults
});
var logDir = 'logs';  // setting up for log directory
var logger = require('winston');
var fs = require('fs');

// remove the console so we can reattach it with our settings
logger.remove(logger.transports.Console);
//logger.add(logger.transports.Console, {colorize: true, prettyPrint: true});
logger.add(logger.transports.Console, config.winston.application.console);

// We will log normal api operations into api.log
console.log("starting logger...");
logger.debug('hello from debug logger');
logger.log('info', 'Hello colorized console displays!');
logger.info('Hello again colorized console displays');

// this forces a change in winston settings but only for log level. anything else stays the same.
logger.level = 'debug';
logger.debug('Now my debug messages are written to console!');


console.log('initiating log file...');
// checks for logs directory, if not there will make it.
if ( !fs.existsSync( logDir ) ) {
	fs.mkdirSync( logDir );
};

logger.add(logger.transports.File, config.winston.application.file);

logger.log('info', 'Hello distributed log files!');
logger.debug('Hello again distributed logs');
