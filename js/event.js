

function addEvent(element,type,fn){
    if(element.addEventListener){
        element.addEventListener(type,fn,false);
    }else if(element.attachEvent){
        element.attachEvent("on" + type,fn);
    }
}


function stopDefault(event){
    var e = arguments.callee.caller.arguments[0] || event;
    //w3c做法
    if(e && e.preventDefault){
        e.preventDefault();
    }else{
        //ie
        window.event.returnValue = false;
    }
}


function stopBubble(event){
    var e = arguments.callee.caller.arguments[0] || event;
    if(e.stopPropagation){
        //w3c
        e.stopPropagation();
    }else if(window.event){
        //ie
        window.event.cancelBubble = true;
    }
}

var ul = document.querySelector("ul");

addEvent(ul,"click",function(event){
   var target = event.target ||  event.srcElement;
   console.log(target.nodeName + " is clicked");
   if(target.nodeName == "INPUT"){
       stopDefault(event);
   }
});



