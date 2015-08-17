requirejs.config({
    baseUrl : '/',
    shim : {
        underscore: {
            deps: ['jquery'],
            exports:'_'
        },
        backbone: {
            deps: ['underscore'],
            exports: 'Backbone'
        },
    },
    paths : {
        jqurey : "./public/javascripts/lib/jqurey",
        underscore: './public/javascripts/lib/underscore',
        backbone: './public/javascripts/lib/backbone',
        text: './public/javascripts/lib/text',
    }
});

window.url = $("meta[name='widgets']").attr("content");
require(['widgets/'+window.url],function(){
    console.log("完成");
});