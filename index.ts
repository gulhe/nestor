function fnestor(sentence, gem) {
    gem = gem || {};
    return sentence
        .split('()')
        .reverse()
        .reduce(
            (accumulator, current) => {
                current = current.trim();
                if (current === '') {
                    return accumulator;
                }
                let subGem = accumulator;
                if (typeof accumulator !== "function") {
                    subGem = () => accumulator;
                }
                return nestor(current, subGem);
            },
            gem
        );
}

function nestor(sentence:string, gem:(object|Function)) :object {
    gem = gem || {};
    return sentence
        .split(' ')
        .reverse()
        .reduce(
            function(accumulator:(object|Function), current:string):(object|Function) {
                const result = {};
                result[current] = accumulator;
                return result;
            },
            gem
        );
}