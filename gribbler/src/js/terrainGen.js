/**
 * Created by Gabriele on 12-Dec-16.
 *
 * Map matrix creation
 */

var generatedMatrix = [];

function generateTerrain(seed, altPercent){
    generatedMatrix = initMap(width, height);
    //middle row
    var i1 = width / 2;
    var altitude = firstAlt(seed);
    var nextAlt = altitude;
    for (var j1 = 0; j1 < height -1; j1++){
        if(generatedMatrix[i1 * j1] == 0)
            generatedMatrix[i1 * j1] = squareCtor(squareCtor(nextAlt, i1, j1));
        nextAlt = nextAltitude(nextAlt, i1, j1);
    }
    //middle column
    var j2 = height / 2;
    nextAlt = altitude;
    for (var i2 = 0; i2 < width -1; i2 ++){
        if(generatedMatrix[(width * i2) + j2] == 0){
            generatedMatrix[i2 * j2] = squareCtor(squareCtor(nextAlt, i2, j2));
        }
        nextAlt = nextAltitude(nextAlt, i2, j2);
    }

    //first row
    var nextAlt = firstAlt(Math.floor(seed /2));
    for (var i = 0; i < width -1; i++){
        if(generatedMatrix[i] == 0){
            generatedMatrix[i] = squareCtor(nextAlt, 0, i);
        }
        nextAlt = nextAltitude(nextAlt, 0, i);
    }
    //latest row
    var nextAlt = firstAlt(Math.floor(seed /2));
    for (var j = 0; j < width -1; j++){
        if(generatedMatrix[j * (width -1)] == 0){
            generatedMatrix[j * (width -1)] = squareCtor(nextAlt, width -1, j);
        }
        nextAlt = nextAltitude(nextAlt, width -1, j);
    }

    //first column
    var nextAlt = firstAlt(Math.floor(seed / 4));
    for (var i = 0; i < height -1; i ++){
        if(generatedMatrix[width * i] == 0){
            generatedMatrix[width * i] = squareCtor(nextAlt, width * i, 0);
        }
        nextAlt = nextAltitude(nextAlt, width * i, 0);
    }

    //latest column
    var nextAlt = firstAlt(Math.floor(seed / 4));
    for (var i = 0; i < height -1; i ++){
        if(generatedMatrix[width * i + height -1] == 0){
            generatedMatrix[width * i + height -1] = squareCtor(nextAlt, width * i, height - 1);
        }
        nextAlt = nextAltitude(nextAlt, width * i, height - 1);
    }

    //calculate altitude for the 4 internal square
    square (width / 2, height / 2, 0, 0);
    square (width / 2, height / 2, 0, height / 2);
    square (width / 2, height / 2, width / 2, height / 2);
    square (width / 2, height / 2, width / 2, 0);
    return generatedMatrix;
}

function initMap(width, height){
    var generatedMatrix = [];
    for(var i = 0; i < width * height; i++){
        generatedMatrix[i] = 0;
    }
    return generatedMatrix;
}
//TODO
function square(width, height, x, y){
    var nextAlt = generatedMatrix[x * y].altitude;
    for ( var i = 0; i < width -1; i++){
        for (var j = 0; j < height -1; j ++){
            if(generatedMatrix[(x + i) * (y + j)] == 0)
                generatedMatrix[(x + i) * (y + j)] = squareCtor(nextAlt, x + i, y + j);
            //nextAlt = nextAltitude(nextAlt, x + i,  y + j);
        }
    }
}
