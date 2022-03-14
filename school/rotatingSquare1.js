var canvas;
var gl;

var theta = 0.0;
var theta1 = 0.0;
var theta2 = 0.0;
var thetaLoc;
var stopValue = 0.0;
var test = 0.0;

var incrementValue = 0.1;

window.onload = function init() {
  canvas = document.getElementById("gl-canvas");

  //gl = WebGLUtils.setupWebGL(canvas);
  gl = canvas.getContext("webgl", { antialias: false });
  if (!gl) {
    alert("WebGL isn't available");
  }

  //
  //  Configure WebGL
  //
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  //  Load shaders and initialize attribute buffers
  var program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);
  console.log(gl);
  var vertices = [vec2(0, 1), vec2(-1, 0), vec2(1, 0), vec2(0, -1)];
  console.log(vertices);
  // Load the data into the GPU
  var bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

  // Associate out shader variables with our data buffer
  var vPosition = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);
  console.log(vPosition);
  thetaLoc = gl.getUniformLocation(program, "theta");

  render();
};

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  sliderTest();
  theta += incrementValue;

  // theta = theta > 2.0 ? 0 : theta;
  gl.uniform1f(thetaLoc, theta);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  window.requestAnimFrame(render);
}

function sliderTest() {
  let slider = document.getElementById("slider");
  let p = document.getElementById("pTest");

  slider.addEventListener(
    "input",
    function () {
      incrementValue = +slider.value;
      p.innerHTML = slider.value;
    },
    false
  );
}

/* function render() {
  setTimeout(function () {
    requestAnimFrame(render);
    gl.clear(gl.COLOR_BUFFER_BIT);
    theta += 0.1; 
    gl.uniform1f(thetaLoc, theta);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }, 100);
} */

/*
gl_Position.x = -s * vPosition.y + c *vPosition.x ;
          gl_Position.y =s* vPosition.x + c * vPosition.y ;
          gl_Position.z = 0.0;
          gl_Position.w = 1.0; 
          */
