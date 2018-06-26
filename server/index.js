var server= require('ws').Server;
var s = new server({port:5001});


s.on('connection',function(ws){
	ws.on('message',function(message){
		message=JSON.parse(message)
		if(message.type=='name'){
			ws.personame=message.data;
			return;
		}
		console.log('Recieved '+message);
		s.clients.forEach(function e(client){
			if(client != ws)
				client.send(JSON.stringify({
					name:ws.personame,
					data:message.data
				}));
		});
		// ws.send(message);
	});
	ws.on('close',function(){
		console.log("client  is lost");
	});
	console.log("new client is come");

});