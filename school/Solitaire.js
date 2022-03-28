/***
 * this program uses primitives as LINE and TRIANGLE and SEMICIRCLE
 */

var gl;
var points;

var vPosition1, vPosition2;
var bufferId1, bufferId2;
var program;

var firstPoint = [-0.75, 1];
var secondPoint = [-0.75, 0.75];
var thirdPoint = [-0.6, 0.875];
var vertices = new Float32Array([
  firstPoint[0],
  firstPoint[1],
  secondPoint[0],
  secondPoint[1],
  thirdPoint[0],
  thirdPoint[1],
  // six points for 3 lines on gates
]);

window.onload = function init() {
  var canvas = document.getElementById("gl-canvas");

  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL isn't available");
  }

  
  //
  //  Configure WebGL
  //
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  //  Load shaders and initialize attribute buffers

  program = initShaders(gl, "vertex-shader", "fragment-shader");

  gl.useProgram(program);

  // Load the data into the GPU

  bufferId1 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId1);

  var button = document.getElementById("testBtn");
  button.addEventListener("click", function () {
    firstPoint = [1, 1];
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  });
  

  vPosition1 = gl.getAttribLocation(program, "vPosition");
  gl.enableVertexAttribArray(vPosition1);

  render();
};

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId1);
  gl.vertexAttribPointer(vPosition1, 2, gl.FLOAT, false, 0, 0);
  gl.drawArrays(gl.TRIANGLES, 0, 3);

  requestAnimFrame(render);
}

function clickToMove() {}

function test() {
  var button = document.getElementById("testBtn");
  button.addEventListener("click", function () {
    firstPoint = [1, 1];
  });
}
