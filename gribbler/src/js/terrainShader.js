/**
 * author Gabriele Minneci
 *
 * Test Shader
 */

THREE.testShader = {
	vertexShader: [
        "attribute float displacement;",
		"varying vec3 vNormal;",
        "varying vec2 vUv;",
		"varying vec3 pos;",


        "void main(){",
			"vNormal = normal;",
			"vUv = uv;",
			"pos = position;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
		"}"


].join( "\n" ),

	fragmentShader: [
        "varying vec3 vNormal;",
        "varying vec2 vUv;",
        "varying vec3 pos;",

        "uniform sampler2D tDiffuse;",
		//"uniform float maxAlt;",

        "vec3 water = vec3(0,0.5,0.5);",

        //berli random function
        "float hash(float n) { ",
        "return fract(sin(n)*43758.5453123); ",
        "}",


        "void main() {",
			"vec3 light = vec3(1, 0.2, 1.0);",

			// ensure it's normalized
			"light = normalize(light);",

			// calculate the dot product of the light to the vertex normal
			"float dProd = max(0.0, dot(vNormal, light));",

			//calculate the altitude due to the color
			"float r = 0.5+hash(pos[0]+pos[1])/2.0;",
			"float rip = 0.45*normalize(dot(vec3(0,0,1),vNormal));",
        	"vec2 altLat=vec2(rip+0.01*r,0.1+((pos[2])/60.0));",
			//calculate the fragment color
			"vec3 rgb = texture2D(tDiffuse, altLat).xyz;",
			//check if underwater
        	"if(pos[2]<0.0)rgb=mix(rgb,water,r*0.2);",
			"vec4 color = vec4(rgb, dProd);",
			"gl_FragColor = color;",
		"}"
	].join( "\n" ),


};