define([
],function(){
	return Backbone.View.extend({
		el : $(".viewport"),
		events : {
			"click .out" : "out",
			"click .send" : "sendMessage"
		},
		initialize : function(){
			console.log("index view");
			me = this;
			me.socket = io.connect('/chat');
			me.socketIo();
			me.socketLogin();
		},
		out : function(){
			$.ajax({
				url : "/out",
				type : "post",
				data : "",
				dataType : "json",
				success : function(data){
					if(data.status ==1){
						//发送离开信息
						me.socket.emit("quit",{username : $(".username").html()});
						window.location.href = "/login"
					}
				}
			})
		},
		socketIo : function() {

			//控制滚动条位置
			$('.content').scrollTop( $('.content')[0].scrollHeight );


			//接受发送信息内容
	        me.socket.on("message", function (data) {
	        	console.log(data)
	        	var str = "<li>"
	        			+ "<p>"
	        			+ "<span>"
	        			+ data.username
	        			+ " : </span>"
	        			+ data.content
	        			+ "<br/>"
	        			+ "(" + data.time + ")"
	        			+ "</p>"
	        			+ "</li>"
	        			   
	            $(".content ul").append(str);
	            
	            //控制滚动条位置
	            $('.content').scrollTop( $('.content')[0].scrollHeight );
	        });

	        //接受登录信息
	        me.socket.on("login", function (userList) {
	        	for (var obj in userList){
	        		$("."+obj).find("img").attr("src","/public/images/userList1.png");
	        	}
	        });

	        //接受退出信息
	        me.socket.on("quit", function (userList) {
	        	console.log(userList)
	        	for (var obj in userList){
	        		$("."+obj).find("img").attr("src","/public/images/userList2.png");
	        	}
	        });
		},
		sendMessage : function(){
			//发送信息
			me.socket.emit("message",{
				username : $(".username").html(),
				content : $(".message").val(),
				time : new Date().toLocaleString().replace(/\//g,"-")
			});
			$(".message").val("");
		},
		socketLogin : function(){
			//发送登录信息
			me.socket.emit("login",{username : $(".username").html()});
		}
	})
})