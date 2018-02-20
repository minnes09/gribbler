/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Simple fake tilt-shift effect, modulating two pass Gaussian blur (see above) by vertical position
 *
 * - 9 samples per pass
 * - standard deviation 2.7
 * - "h" and "v" parameters should be set to "1 / width" and "1 / height"
 * - "r" parameter control where "focused" horizontal line lies
 */

THREE.acquaShader = {

	/*uniforms: {

		"tDiffuse": { type: "t", value: null },
		"h":        { type: "f", value: 1.0 / 512.0 },
		"r":        { type: "f", value: 0.35 },
		"t":        { type: "f", value: 0.35 }

	},*/

	vertexShader: [
		"uniform float t;",
		"varying vec2 vUv;",
		"varying vec3 n;",
		"varying vec3 vPos;",

		"float hash(float n) { ",
			"return fract(sin(n)*43758.5453123); ",
		"}",

		"void main() {",

			"vUv = uv;",
			"n=normal;",
			"vec3 pos=vec3(position[0],position[1],0.1*cos(length(position)*12.0-t*2.0));",
			"vPos=pos;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );",



		"}"

	].join( "\n" ),

	fragmentShader: [

		"uniform sampler2D tDiffuse;",
		"uniform float t;",
        "varying vec3 n;",
		"varying vec3 vPos;",
		"varying vec2 vUv;",

		"float rand(vec2 co){",
			  "return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);",
		"}",

		"float hash(float n) { ",
			"return fract(sin(n)*43758.5453123); ",
		"}",

		"void main() {",
			//light
			"vec3 light = vec3(1, 0.2, 1.0);",
			// ensure it's normalized
			"light = normalize(light);",
			// calculate the dot product of the light to the vertex normal
			"float dProd = max(0.0, dot(n, light));",

			"vec2 pos = 0.04*rand(vUv)+2.0*vUv;",
			//"vec3 cPos = vec3(pos[0],pos[1],cos(length(pos)*12.0-t*2.0));",
			
			"float length=length(pos);",
			"vec2 pp = vUv+(pos/length)*cos(length*12.0-t*2.0)*0.03;",
			"vec3 mm = texture2D(tDiffuse,pp).xyz;",

			/*"float angle = clamp(dot(normalize(n),normalize(l)),0.0,1.0)/normalize(distance(l,vPos)*distance(l,vPos));",
			"float camAngle = clamp(-dot(normalize(n),normalize(cam)),0.0,1.0)/normalize(distance(cam,vPos)*distance(cam,vPos));",
			"bool brittle = (cPos[2]*hash(cPos[2])>0.91)? true : false;",
			"if(brittle){mm= vec3(0.99,0.99,0.99);}",*/
			"vec4 sum = vec4(mm, dProd);",

			"gl_FragColor = sum;",


		"}"

	].join( "\n" )

};