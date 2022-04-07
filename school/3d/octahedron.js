var canvas;
var gl;

// 8 faces, 6 vertices, each face contains 3 vertices,
// so total rendering vertices are 3*8=24
var NumVertices = 24;

var points = [];
var colors = [];

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var axis = 0; // current rotate axis
var theta = [0, 0, 0];

var thetaLoc;

window.onload = function init() {
  canvas = document.getElementById("gl-canvas");

  // get canvas contest
  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("Webgl isnt available");
  }

  colorCube();

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.5, 1.0, 1.0, 1.0);

  gl.enable(gl.DEPTH_TEST);

  // shader and attribute
  // get gl code from html script element and give to gl source code
  var program = initShader(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  // color buffer
  var cBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
  // flatten is change colors array to Float32Array() format
  gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

  // get attribute location of color vertices
  var vColor = gl.getAttribLocation(program, "vColor");
};
