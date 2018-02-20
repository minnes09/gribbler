/**
 * Created by Gabriele on 12-Dec-16.
 *
 * Pseudo random number generator
 */

var firstMagicNumber = 1234234;
var secondMagicNumber = 2;

function firstAlt(seed){
        var x = Math.sin(seed) * firstMagicNumber;
        return (x - Math.floor(x)) * maxAltitude;
}

//next altitude calculation, to optimize->if the altitude is low, the next are very near numbers
function nextAltitude(prevAlt, x, y){
    var jump = Math.random();
    var rnd = Math.sin(prevAlt) * firstMagicNumber;
    //console.log("rnd" , rnd);
    var rndX = Math.cos(x);
    //console.log("rndX " + rndX);
    var rndY = Math.sin(y);
   // console.log("rndY " ,rndY);

    rnd = rnd - Math.floor(rnd) - prevAlt / secondMagicNumber;
   // console.log("rnd" , rnd);

    var alt;
    if(jump > 0.3){
        alt += prevAlt *2/3 + 10;
    }
     alt = rnd + rndX + rndY + prevAlt;
   // console.log("alt" , alt);
    alt = parseInt(alt);
    //console.log("alt" , alt);
    return alt;
}