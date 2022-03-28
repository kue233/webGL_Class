var canvas;
var gl;

var maxNumTriangles = 200;
var maxNumVertices = 3 * maxNumTriangles;
var index = 0;

var colors = [
  vec4(0.0, 0.0, 0.0, 1.0), // black
  vec4(1.0, 0.0, 0.0, 1.0), // red
  vec4(1.0, 1.0, 0.0, 1.0), // yellow
  vec4(0.0, 1.0, 0.0, 1.0), // green
  vec4(0.0, 0.0, 1.0, 1.0), // blue
  vec4(1.0, 0.0, 1.0, 1.0), // magenta
  vec4(0.0, 1.0, 1.0, 1.0), // cyan
];

window.onload = function init() {
  canvas = document.getElementById("gl-canvas");

  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL isn't available");
  }

  //canvas.addEventListener("mousedown", function(){
  canvas.addEventListener("mousedown", function (e) { 
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);

    let rect = e.target.getBoundingClientRect();
    // get 3 points of triangle according to click point
    points = trianglePoints(e.clientX, e.clientY, rect.left, rect.top);
    // console.log(points);
    points = new Float32Array(points);
    console.log(flatten(points).byteLength);
    /* var t = vec2(
      (2 * event.clientX) / canvas.width - 1,
      (2 * (canvas.height - event.clientY)) / canvas.height - 1
    ); */
    // TODO: delete
    //console.log(new Float32Array(flatten(t)).byteLength);
    gl.bufferSubData(gl.ARRAY_BUFFER, 24 * index, flatten(points));

    /* gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    t = vec4(colors[index % 7]);
    gl.bufferSubData(gl.ARRAY_BUFFER, 16 * index, flatten(t)); */

    index++;
  });

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.5, 0.5, 0.5, 1.0);

  //
  //  Load shaders and initialize attribute buffers
  //
  var program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  var vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, 24 * maxNumVertices, gl.STATIC_DRAW);

  var vPosition = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  /*  var cBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, 16 * maxNumVertices, gl.STATIC_DRAW);

  var vColor = gl.getAttribLocation(program, "vColor");
  gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vColor);
 */
  render();
};

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, index);

  window.requestAnimFrame(render);
}

function trianglePoints(pointX, pointY, left, top) {
  var canvas = document.getElementById("gl-canvas");
  let x = (pointX - left - canvas.clientWidth / 2) / (canvas.clientWidth / 2);
  let y = -(pointY - top - canvas.clientHeight / 2) / (canvas.clientHeight / 2);
  var points = [x - 0.1, y - 0.2, x - 0.1, y + 0.2, x + 0.2, y];
  return points;
}
