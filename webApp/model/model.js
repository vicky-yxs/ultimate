/***
***mongoose数据库
***/
var mongoose = require('mongoose');

//myApp数据库名，27017为端口号
var db = mongoose.connect("mongodb://127.0.0.1:27017/myApp");

db.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});
db.connection.on("open", function () {
    console.log("------数据库连接成功！------");
});

//建立字段（骨架）
var userSchema = new mongoose.Schema({
    username : { type:String, unique: true },//属性name,类型为String
    password  : { type:String },//属性age,类型为Number,默认为0
    //time : { type:String, default:Date.now() },
});
var talkContentSchema = new mongoose.Schema({
    username : { type:String },//属性name,类型为String
    content  : { type:String },//属性age,类型为Number,默认为0
    time : { type:String },
});


//定义模型，user为表名
var userModel = db.model("user", userSchema);
var talkContentModel = db.model("talkContent", talkContentSchema);



//模型实例化
var userEntity = new userModel(
  {
      username : "yuanxiaosi",
      password : 123456
  }
)
var talkContentEntity = new talkContentModel(
  
    {
        username : "gaojunteng",
        content : "卧槽，见鬼111"
    }
  
  
)

//模型数据保存
/*talkContentEntity.save(function(error,doc){
  if(error){
     console.log("error :" + error);
  }else{
     console.log("talkContentEntity保存成功")
  }
});
userEntity.save(function(error,doc){
  if(error){
     console.log("error :" + error);
  }else{
     console.log("talkContentEntity保存成功")
  }
});*/


//模型数据删除
/*var userDelete = userModel.remove({},function(error){
	console.log("删除成功");
});*/

//模型数据查询
/*var userSearch = userModel.find({},function(error, doc){
	//console.log(doc[0].name);
});*/


exports.db = db;
exports.userModel = userModel;
exports.talkContentModel = talkContentModel;