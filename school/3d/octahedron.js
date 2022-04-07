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
  gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vColor);

  // vertex buffer
  var vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

  var vPosition = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  thetaLoc = gl.getUniformLocation(program, "theta");

  // TODO: event listeners for buttons

  // render loop
  render();
};

function colorCube() {}

function quad(a, b, c) {
  var vertices = [
    vec4(0.5, 0.0, 0.0, 1.0), //1
    vec4(0.0, 0.0, 0.5, 1.0), //2
    vec4(0.0, 0.5, 0.0, 1.0), //3
    vec4(-0.5, 0.0, 0.0, 1.0), //4
    vec4(0.0, 0.0, -0.5, 1.0), //5
    vec4(0.0, -0.5, 0.0, 1.0), //6
  ];

  var vertexColors = [
    [0.0, 0.0, 0.0, 1.0], // black
    [1.0, 0.0, 0.0, 1.0], // red
    [1.0, 1.0, 0.0, 1.0], // yellow
    [0.0, 1.0, 0.0, 1.0], // green
    [0.0, 0.0, 1.0, 1.0], // blue
    [1.0, 0.0, 1.0, 1.0], // magenta
  ];

  var indices = [a, b, c]; // render one face

  for (let i = 0; i < indices.length; ++i) {
    points.push(vertices[indices[i]]);

    colors.push(vertexColors[a]);
  }
}

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  theta[axis] += 2.0;
  gl.uniform3fv(thetaLoc, theta);
  gl.drawArrays(gl.TRIANGLES, 0, NumVertices);

  requestAnimationFrame(render);
}
