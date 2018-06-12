function Animal(name){
    this.name = name;
    this.eat = function(){
        console.log(this.name + "eating...");
    }
}

Animal.prototype.say = function(){
    console.log("hi my name is " + this.name);
}



/*继承一 原型链继承*/
function Cat(name){
    this.name = name;
}
Cat.prototype = new Animal(name);
Cat.prototype.name = "name"




/*继承2   构造继承*/
function Cat2(name){
    Animal.call(this,name);
    this.name = name;
};




/*继承3 实例继承*/
function Cat3(name){
    var instance = new Animal(name);
    instance.name = "adfaf";
    return instance;
}



/*继承4 拷贝继承*/
function Cat4(name){
    var animal = new Animal(name);
    for(p in animal){
        Cat4.prototype[p] = animal[p]
    }
}


/*继承4*/
function Cat5(name){
    Animal.call(this,name);
    this.name = name;
}
Cat5.prototype  = new Animal();
Cat5.prototype.constructor = Cat5;


function Cat6(name){
    Animal.call(this,name);
}

var instance = function(){};
instance.prototype = Animal.prototype;
Cat6.prototype = new instance();
Cat6.prototype.constructor = Cat6;









