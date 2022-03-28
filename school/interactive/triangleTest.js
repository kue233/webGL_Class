var gl;
var points;
var firstX = 0.1;
var index = 0;

window.onload = function init() {
  var canvas = document.getElementById("gl-canvas");

  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL isn't available");
  }

  //var vertices = new Float32Array([-1, -1, 0, 1, 1, -1]);
  var vertices = new Float32Array([0.1, 0.1, -0.5, -0.5, 0.7, 0]);
  var points = [];

  canvas.addEventListener("mousedown", function (e) {
    /*
    let rect = e.target.getBoundingClientRect();
    // get 3 points of triangle according to click point
    points = trianglePoints(e.clientX, e.clientY, rect.left, rect.top);
    console.log(points);

    points = new Float32Array(points);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.5, 1.0, 1.0, 1.0);

    //  Load shaders and initialize attribute buffers

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Load the data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    render();*/
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    let rect = e.target.getBoundingClientRect();
    // get 3 points of triangle according to click point
    points = trianglePoints(e.clientX, e.clientY, rect.left, rect.top);
    points = new Float32Array(points);
    console.log(points);
    console.log(console.log(new Float32Array(flatten(points)).byteLength));
    gl.bufferSubData(gl.ARRAY_BUFFER, 24* index, points);

    /* gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    t = vec4(colors[index % 7]);
    gl.bufferSubData(gl.ARRAY_BUFFER, 16 * index, flatten(t)); */
    index++;
  });

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.5, 1.0, 1.0, 1.0);

  //  Load shaders and initialize attribute buffers

  var program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  // Load the data into the GPU

  var bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

  // Associate out shader variables with our data buffer
  var vPosition = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);
};

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, points.length);
}

function trianglePoints(pointX, pointY, left, top) {
  var canvas = document.getElementById("gl-canvas");
  let x = (pointX - left - canvas.clientWidth / 2) / (canvas.clientWidth / 2);
  let y = -(pointY - top - canvas.clientHeight / 2) / (canvas.clientHeight / 2);
  var points = [x - 0.1, y - 0.2, x - 0.1, y + 0.2, x + 0.2, y];
  return points;
}
