(function(window,$){
    function Zepto(selector){
        this.select = document.querySelector(selector);
        return this;
    }
    Zepto.prototype = {
        hasClass: function(className){
            return [].indexOf.call(this.select.classList,className) > -1 ? true: false;
        },
        append: function(html){
            var child = document.createElement();
            child.innerHTML = html;
            this.select.appendChild(child);
        }
    };
    window.$ = $ = function(query){
        var zepto = new Zepto(query);
        return zepto;
    };
    $.fn = Zepto.prototype;
    $.isArray = function(arr){
        return  arr instanceof Array ;
    };

    $.prototype = Zepto.prototype;
    $.prototype.constructor = Zepto;

})(window,$);


$.fn.plain1 = function(){
    console.log("plain1");
};


