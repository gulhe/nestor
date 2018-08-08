// Credits for extension go to :
//     https://gist.github.com/hns/663932/bca04dc7800e66f3b21c08d6ae22260d1d091a60
function Nestor() {}

function riffize(riffized){
    riffized.__proto__ = Nestor.prototype;
    return riffized;
}

Nestor.of = function (array) {
    return riffize(Array.from(array));
};

const funcIt = function (thees, func) {
    return function () {
        return riffize(func.apply(thees, arguments))
    };
};

Nestor.prototype = Object.create(Array.prototype);

const prot = Array.prototype;

const integrator = function (funkName) {
    let funk = prot[funkName];
    Nestor.prototype[funkName] = function(){
        return riffize(funk.apply(this, arguments))
    };
    Nestor.prototype[funkName + "If"] = function (doIMap) {
        if (!doIMap) {
            return ()=>this;
        }
        return funcIt(this, funk);
    };
};

Object.getOwnPropertyNames(prot)
    .filter(key => key !== `splice`) //<- I'll deal with you the day you'll become a real function you dirty punk, you hybrid monstrosity
    .filter(key => key !== `constructor`)
    .filter(key => prot[key] instanceof Function)
    .filter(key => {
        const example = [0, 1, "", undefined, [], {}, /regexp/];
        const result = prot[key].call(example, (x) => x);
        if (!(result instanceof Array)) {
            return false;
        }
        return result !== example;
    }).forEach(integrator);

Object.getOwnPropertyNames(Nestor)
    .forEach(prop=>exports[prop]=Nestor[prop]);
