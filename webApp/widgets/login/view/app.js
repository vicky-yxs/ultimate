define([
],function(){
	return Backbone.View.extend({
		el : $(".viewport"),
		events : {
			"click .loginBtn" : "loginBtn"
		},
		initialize : function(){
			console.log("login view");
		},
		loginBtn : function(){
			var postData = {
				username : $(".username").val(),
				password : $(".password").val()
			}
			$.ajax({
				url : "/login",
				type : "post",
				data : postData,
				dataType : "json",
				success : function(data){
					if(data.status == 1){
						window.location.href = "/";
					}else{
						alert("账号密码输入有误");
					}
				}
			})
		}
	})
})