var gl;

var vertexShaderText = [
    "precision mediump float;",
    "",
    "attribute vec2 vertPosition;",
    "",
    "void main()",
    "{",
    "  gl_Position = vec4(vertPosition,0.0, 1.0);",
    "}",
].join("\n");

var fragmentShaderText = [
    "precision mediump float;",
    "",
    "varying vec3 fragColor;",
    "void main()",
    "{",
    "  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);",
    "}",
].join("\n");

window.onload = function init() {
    var canvas = document.getElementById("glCanvas");
    gl = canvas.getContext("webgl");

    if (!gl) {
        gl = canvas.getContext("experimental-webgl");
        alert("Your browser does not support WebGL");
    }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.75, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var vertices = [
        0.5, 0.5, 0.0, 
        -0.5, -0.5, 0.0
    ];

    var vertex_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertex_buffer), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);


    //
    var vertCode =
        'attribute vec3 coordinates;' +
        'void main(void) { ' +
        '   gl_Position = vec4(coordinates, 1.0);' +
        '}';

    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader, vertCode);
    gl.compileShader(vertShader);

    // fragment

    //
    var shaderProgram = gl.createProgram();

    gl.attachShader(shaderProgram, vertShader);

    gl.linkProgram(shaderProgram);

    gl.useProgram(shaderProgram);

    //

    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

    var coord = gl.getAttribLocation(shaderProgram, "coordinates");

    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(coord);

    //
    gl.clearColor(0.5, 0.5, 0.5, 1.0);

    gl.enable(gl.DEPTH_TEST);

}