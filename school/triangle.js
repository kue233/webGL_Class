var gl;
var points;
var firstX = 0.1;

window.onload = function init() {
  var canvas = document.getElementById("gl-canvas");

  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL isn't available");
  }

  //var vertices = new Float32Array([-1, -1, 0, 1, 1, -1]);
  var vertices = new Float32Array([firstX, -0.1, 0.1, 0.5, 0.7, 0]);

  //  Configure WebGL

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.5, 1.0, 1.0, 1.0);

  //  Load shaders and initialize attribute buffers

  var program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  // Load the data into the GPU

  var bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  // Associate out shader variables with our data buffer

  var vPosition = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  console.log(firstX);
  // html interact
  document.getElementById("testBtn").onclick = function () {
    firstX = 0.5;
    alert("test");
    console.log(firstX);
  };

  render();
};

function render() {
  firstX = 0.5;
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}
