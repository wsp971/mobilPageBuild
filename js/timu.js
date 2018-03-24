var value1 = 0,value2=0,value3=0;
for(var i=1;i<=3;i++){
    var i2=i;
    (function(){
        var i3=i;
        setTimeout(function(){
            value1+=i;
            value2+=i2;
            value3+=i3;
        },1)
    })()
}

setTimeout(function(){
    console.log(value1,value2,value3);
},100);

//闭包
function bibao(){
    var a = 1;
    return function(a){
        a = a;
    }
}
var a = bibao();
a(2);


var a = (function(){
    var a = 1;
    return function(a){
        a = a;
        console.log(a);
    }
})();

//其实是个匿名函数闭包
// zepto 就是匿名函数闭包了返回一个对象。



a(2);


function A (){
    console.log("hello a");
}
function B(){
    console.log("hello b");
}

A.prototype.constructor = B;

function C (){
    A.apply(this);
};


var c = new C();
var a = new A();

function Parent(){}
function Child(){
    Parent.call(this);
}
Child.prototype = new Parent();

function Child1(){
    Parent.call(this);
}

(function(){
    var instance = function(){};
    instance.prototype = Parent.prototype;
    Child1.prototype = new instance();
})();


function Child2(){
    var instance = new Parent();
    for(i in instance){
        this[i] = instance[i];
    }
}

function Child3 (){
    Parent.apply(arguments.slice(1));
}


function Child4(){

}
Child4.prototype =new Parent();

/*实例继承*/
function Child5(){
    var intance = new Parent();
    return instance;
}


//订阅发布模式

var Event = (function(){
    var listeners = {};
    function listener(key,fn){
        listeners[key] = listeners[key] || [];
        listeners[key].push(fn);
    }
    function trigger(){
        var key = [].shift.apply(arguments);
        if(key && listeners[key] && listeners[key][0]){
            for(var i in listeners[key]){
                var fn = listeners[key][i];
                fn.apply(Array.prototype.slice.apply(arguments));
            }
        }
    }
    function remove(key,fn){
        var fns  = listeners[key];
        if(fns){
            for(var i=0;i<fns.length;i++){
                if(fns[i]== fn){
                    fns.splice(i,1);
                }
            }
        }
    }
    return {
        listener: listener,
        trigger: trigger,
        remove: remove
    }
})();

var haha = Event.listener("haha", function(){
    console.log("haha");
});

Event.trigger("haha");


function Event(){
    this.listeners = {};
}

Event.prototype.listener = function(key,fn){
    this.listeners[key] = this.listeners[key]|| [];
    this.listeners[key].push(fn);
};

Event.prototype.trigger = function(){
    var key = Array.prototype.shift.apply(arguments);
    if(key && this.listeners[key] && this.listeners[key][0]){
        for(var i=0;i<this.listeners[key].length;i++){
            this.listeners[key][i].apply(this,Array.prototype.slice.call(arguments,1));
        }
    }
};

//工厂代理
function initEvent(obj){
    var event = new Event();
    for(var key in event){
        obj[key] = event[key];
    }
}


var testobj = {a:1,b:2};
initEvent(testobj);

testobj.listener("a",function(){console.log(this.a)});
testobj.trigger("a");

function test(){
    var firstAr = Array.prorotype.shift.apply(arguments);
    console.log(firstAr);
}







