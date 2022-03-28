var gl;
var points;

var vPosition1, vPosition2;
var bufferId1, bufferId2;
var program;

var triangleNum = 0;
var maxTriangleNum = 200;
var maxVertexNum = 3 * maxTriangleNum;

var vertices = new Float32Array([0, 0, 1, 0, 0.5, 1]);
var vertices2 = new Float32Array([-1, -1, -0.5, 0, 0, -1]);
var vertices3 = new Float32Array([
  0, 0, 1, 0, 0.5, 1, -1, -1, -0.5, 0, 0, -1, -0.5, 1, -0.5, 0.5, 0, 0.5,
]);

var testVertices = [];

window.onload = function init() {
  var canvas = document.getElementById("gl-canvas");

  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL isn't available");
  }

  canvas.addEventListener("mousedown", function (e) {
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId1);
    let rect = e.target.getBoundingClientRect();
    points = trianglePoints(e.clientX, e.clientY, rect.left, rect.top);
    //testVertices.push(points);
    testVertices = testVertices.concat(points);
    console.log(new Float32Array(flatten(points)).byteLength);

    gl.bufferSubData(gl.ARRAY_BUFFER, 24 * triangleNum, flatten(points));

    triangleNum++;
  });
  //
  //  Configure WebGL
  //
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.7, 1.0, 1.0, 1.0);

  //  Load shaders and initialize attribute buffers

  program = initShaders(gl, "vertex-shader", "fragment-shader");

  gl.useProgram(program);

  // Load the data into the GPU

  bufferId1 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId1);
  gl.bufferData(gl.ARRAY_BUFFER, 24 * maxVertexNum, gl.STATIC_DRAW);

  vPosition1 = gl.getAttribLocation(program, "vPosition");
  gl.enableVertexAttribArray(vPosition1);

  render();
};

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId1);
  gl.vertexAttribPointer(vPosition1, 2, gl.FLOAT, false, 0, 0);
  gl.drawArrays(gl.TRIANGLES, 0, triangleNum);

  /* gl.bindBuffer(gl.ARRAY_BUFFER, bufferId2);
  gl.vertexAttribPointer(vPosition1, 2, gl.FLOAT, false, 0, 6);
  gl.drawArrays(gl.TRIANGLES, 0, 3); */

  requestAnimFrame(render);
}

function trianglePoints(pointX, pointY, left, top) {
  var canvas = document.getElementById("gl-canvas");
  let x = (pointX - left - canvas.clientWidth / 2) / (canvas.clientWidth / 2);
  let y = -(pointY - top - canvas.clientHeight / 2) / (canvas.clientHeight / 2);
  var points = [x - 0.1, y - 0.2, x - 0.1, y + 0.2, x + 0.2, y];
  return points;
}
