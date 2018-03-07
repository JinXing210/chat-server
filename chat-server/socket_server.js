/*
 * (C) Copyright 2018.3 Media Server Administrator
 */

'use strict';
var path = require('path');

var ws = require('ws');
//-----------------------------------------------------------//
//-----------------------------------------------------------//
//-----------------------------------------------------------//
//-----------------------------------------------------------//
module.exports = function(server) {
    var idCounter = 0;
    function nextUniqueId() {
        idCounter++;
        return idCounter.toString();
    }
    
    var idChatCounter = 0;
    function nextChatId() {
        idChatCounter++;
        return idChatCounter.toString();
    }

    const wss = new WebSocket.Server({
        server : server,
        path : '/chat'        
    });

    wss.on('connection', function(ws) {
        var sessionId = nextUniqueId();
        console.log('Connection received with sessionId ' + sessionId);
        ws.send(JSON.stringify({
            id : 'connected',
            response : 'accepted',
            sessionId : sessionId
        }));

        ws.on('error', function(error) {
            console.log('Connection ' + sessionId + ' error');
        });
    
        ws.on('close', function() {
            console.log('Connection ' + sessionId + ' closed');
        });
    
        ws.on('message', function(_message) {
            var message = JSON.parse(_message);
            console.log('Connection ' + sessionId + ' received message ', message.id);
        });
    });
}
