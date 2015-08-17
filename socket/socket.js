

function insertData(data){
	var talkContentModel = require("../webApp/model/model").talkContentModel;
	var talkContentEntity = new talkContentModel(data)

	talkContentEntity.save(function(error,doc){
	  if(error){
	     console.log("error :" + error);
	  }else{
	     console.log(doc);
	     console.log("插入成功")
	  }
	});
}

exports.socket = function(app){
	var server = require('http').createServer(app);
	var io = require('socket.io')(server);
	var userList = {};

	io.of('chat').on('connection',function(socket){
		socket.join('chat');

		//信息监听
	    //socket.emit('message', content);;
	    socket.on("message", function (data) {
	        insertData(data);
	        io.of('chat').emit('message', data);
	    });

	    //登录监听
	    socket.emit("login",userList);
		socket.on("login",function(obj){
			socket.username = obj.username;
			if(!userList[obj.username]){
				userList[obj.username] = obj.username;
			}
			io.of('chat').emit('login', userList);
		})

		//退出监听
		socket.on("quit",function(obj){
			var del = {};
			del[obj.username] = obj.username;
			delete userList[obj.username];
			io.of('chat').emit('quit', del);
		})

		//断开监听
		socket.on('disconnect', function () {
			var del = {};
			del[socket.username] = socket.username;
			delete userList[socket.username];
			io.of('chat').emit('quit', del);
		    
		});

	});

	return server
}