/**
 * Created by Gabriele on 28-Nov-16.
 */

function init(width, height, maxAltitude) {
    var lvl = lvlCtor(width, height, maxAltitude);
/*
//log of the mapGen.js code
    var parag = document.getElementsByClassName("mapText");
    var log = lvl.mapToString();
//console.log(log);
    console.log(lvl.seed + " SEED" + lvl.altPercent + " ALTPERCENT");
    var par = document.createElement("p");
    var textNode = document.createTextNode(log);
    par.appendChild(textNode);
    console.log(par);
    document.getElementById("mapText").appendChild(par);*/
    return lvl;
}

function printShape(matrix){
    console.log(matrix.length);
    for (var i = 0; i < matrix.length; i++) {
        console.log(matrix[i]);
    }
}