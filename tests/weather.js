/*
 * From Witten and Frank, 1999, p. 9
 * via
 * http://www.csse.monash.edu.au/courseware/cse5230/2004/assets/naivebayesTute.pdf
 */

module.exports = [
    'sunny hot high false no',
    'sunny hot high true no',
    'overcast hot high false yes',
    'rainy mild high false yes',
    'rainy cool normal false yes',
    'rainy cool normal true no',
    'overcast cool normal true yes',
    'sunny mild high false no',
    'sunny cool normal false yes',
    'rainy mild normal false yes',
    'sunny mild normal true yes',
    'overcast mild high true yes',
    'overcast hot normal false yes',
    'rainy mild high true no'
].map(function(l) {
    var x = l.split(' ');
    return {
        observation: {
            outlook: x[0],
            temperature: x[1],
            humidity: x[2],
            windy: x[3]
        },
        category: x[4]
    };
});
