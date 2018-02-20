//objects for the map-------------------------------


var level = {
    map : [],
    //random seed, 1 to 1 link for map and seed
    seed : 0,
    //high altitude percentage, can be also set by the user to decide how much "altitude" he wants

    altPercent : 0,

    initLevel: function(s, percent, width, height, maxAltitude){
        this.map = [];
        this.seed = s;
        console.log(percent);
        this.altPercent = Math.floor(percent);
        console.log(this.altPercent);
        var prevAlt = firstAlt(this.seed);
        console.log("prevAlt " + prevAlt);
        prevAlt = nextAltitude(prevAlt, 0, 0);
        console.log("prevAlt1 " + prevAlt);
        //ALTITUDE IMPLEMENTATION WITH SINGLE ARRAY
        this.map = generateTerrain(this.seed, this.altPercent);
        /*for (var x=0; x < width - 1; x++){
            var log = x + " ALTITUDES";
            for (var y=0; y < height - 1; y++){
                //move on the square Ctor??
                var altitude = nextAltitude(prevAlt, x, y);
                altitude = (altitude < this.altPercent) ? altitude : this.altPercent;
                //console.log("altitude " + x , y , altitude);
                prevAlt = altitude;
                this.map[x * y] = squareCtor(altitude, x, y);
                console.log(this.map[x * y].altitude);
                log += ", ";
                if(this.map[x * y].altitude){
                    log += this.map[x * y].altitude;
                }
                else {
                    log += "NaN";
                }
            }
            console.log(log);
            //console.log(this.mapToString());
        }*/


        //ALTITUDE IMPLEMENTATION WITH DOUBLE ARRAY
        /*for (var x=0; x < width; x++){
            var log = x + " ALTITUDES";
            this.map[x] = [];
            for (var y=0; y < height; y++){

                //move on the square Ctor??
                var rnd = Math.floor(Math.random() * maxAltitude);
                //console.log(rnd);
                altitude = (rnd < this.altPercent) ? rnd : this.altPercent;
                altitude = parseInt(altitude);
                this.map[x][y] = squareCtor(altitude, x, y);
                //console.log(this.map[x][y].altitude);
                log += ", ";
                if(this.map[x][y].altitude){
                    log += this.map[x][y].altitude;
                }
                else {
                    log += "NaN";
                }
            }
            //console.log(log);
            //console.log(this.mapToString());
        }*/
        console.log('map populated' );
        return this;
    },
    getSeed: function(){
        return this.seed;
    },
    mapToString: function(){
        var string = "";
        var line = "";
        for ( var i = 0; i< this.map.length; i++){
            if(i%width == 0) {
                string += line;
                string += " /n ";
                line = "" + i/width +": ";
            }
            line += this.getAltitude(i);
            line += ", ";
        }

        return string;
    },

    getAltitude: function(i){
        if(this.map[i].altitude != undefined)
            return this.map[i].altitude;
        else return null;
    }
};

function squareCtor(alt, xPos, yPos){
    var square = {
        altitude : 0,
        x : 0,
        y: 0,
        texture: 0,

        initSquare: function(alt, xPos, yPos){
            this.altitude = alt;
            this.x = xPos;
            this.y = yPos;
            this.texture = 0;
            //this.texture = createTexture();
            return this;
        }
        /*toString: function(){
            var txt =  "" + square.altitude + ", " + square.x + ", " + square.y;
            console.log(txt);
        }*/
        /*createTexture: function(){
         if (this.altitude < 0){
         this.texture = loadWater();
         }

         }*/
    };
	return square.initSquare(alt, xPos, yPos); //+ square.toString();
}



//var seed = Math.random();
//var AltPercent = Math.random() * 100 ; 


//all the functions-----------------------------------------


function lvlCtor(width, height, maxAltitude){



    console.log('populating map...');
	var percentage = (Math.random() * maxAltitude);
	var seed = Math.random() * 100000;

	return level.initLevel(seed, percentage, width, height, maxAltitude);
}

//---------------------------------------------------------
//build axes for the scene (will not be shown to the finished exe
function buildAxes( length ) {
    var axes = new THREE.Object3D();

    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( length, 0, 0 ), 0xFF0000, false ) ); // +X
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( -length, 0, 0 ), 0xFF0000, true) ); // -X
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, length, 0 ), 0x00FF00, false ) ); // +Y
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, -length, 0 ), 0x00FF00, true ) ); // -Y
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, length ), 0x0000FF, false ) ); // +Z
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, -length ), 0x0000FF, true ) ); // -Z

    return axes;

}

function buildAxis( src, dst, colorHex, dashed ) {
    var geom = new THREE.Geometry(),
        mat;

    if(dashed) {
        mat = new THREE.LineDashedMaterial({ linewidth: 3, color: colorHex, dashSize: 3, gapSize: 3 });
    } else {
        mat = new THREE.LineBasicMaterial({ linewidth: 3, color: colorHex });
    }

    geom.vertices.push( src.clone() );
    geom.vertices.push( dst.clone() );
    geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines

    var axis = new THREE.Line( geom, mat, THREE.LinePieces );

    return axis;

}

function createGrid(size, step){

    var gridHelper = new THREE.GridHelper( size, step );
    return gridHelper;
}