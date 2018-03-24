Object.defineProperties(test,{

    set: function(name){
        test.name = name;
    },
    get: function (name){

    }
});

var test = {};

Object.defineProperty(test,'a',{
    value: 1,
    // writable: false
});
var o = {};
Object.defineProperty(o,"a",{
    configurable: true,
    value:1,
    enumerable:false
});
Object.defineProperty(o,"b",{
    enumerable: true,
    value:3
});
Object.defineProperty(o,"c",{
    value:1
})
for(var key in o){
    console.log(o[key]);
}

var test = {};
function defineReactive(data,key,val){
    observe(val);
    Object.defineProperty(data,key,{
        enumerable: true,
        configurable: false,
        set: function(newVal){
            console.log("检测到新的val" + val + "----->" + newVal);
            val = newVal;
        },
        get: function(){
            return val;
        }
    });
}
defineReactive(test,"a")

function observe(data){
    if(!data || typeof data != 'object'){
        return;
    }
    Object.keys(data).forEach(function(key){
        defineReactive(data,key,data[key]);
    });
}








