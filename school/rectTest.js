var gl;
var points;

window.onload = () => {
  // get the canvas element through DOM
  var canvas = document.getElementById("glCanvas");

  // REWRITE:
  // WebGLUtils sets gl object here
  // gl = WebGLUtils.setupWebGL(canvas);
  gl = canvas.getContext("webgl", { antialias: false });

  if (!gl) {
    alert("webgl is not available!");
  }

  // define triangle vertices
  var point = [-0.5, -0.1, 0.1, 0.5, 0.7, 0];
  var vertices = new Float32Array(point);
  
  // set original point of viewport at (0,0)
  // set width and height of viewport as canvas' width and height
  gl.viewport(0, 0, canvas.width, canvas.height);
  // set background color to this color
  gl.clearColor(0.5, 1.0, 1.0, 1.0);

  // set up the webgl program with gl
  // these two strings are script id in html file, they have
  //   matching type to these two shaders

  // REWRITE:
  // simplize initShaders() here
  // var program = initShaders(gl, "test-vertex-shader", "test-fragment-shader");
  // RETURN: a program
  const vShaderStr = "test-vertex-shader";
  const fShaderStr = "test-fragment-shader";
  var vertexShader;
  var fragmentShader;
  var vertexElement = document.getElementById(vShaderStr);
  var fragmentElement = document.getElementById(fShaderStr);
  // exception:
  if (!vertexElement || !fragmentElement) {
    alert("Unable to load vertex shader or fragment shader");
  } else {
    // vertex shader
    vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexElement.text);
    gl.compileShader(vertexShader);
    // exception...

    // fragment shader
    fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentElement.text);
    gl.compileShader(fragmentShader);
  }
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  // exception for program...

  // ---REWRITE DONE---

  gl.useProgram(program);

  // Load the data into the GPU
  var bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  //
  var testPosition = gl.getAttribLocation(program, "testPosition");
  // params:
  //   attrPosition:
  //   size: x components per iteration
  //   type: gl.FLOAT means the data is 32 bit float
  //   normalize: dont normalize the data
  //   stride: 0 = move forward size * sizeof(type) each iteration to get the next position
  //   offset: start at the beginning of the buffer if 0
  gl.vertexAttribPointer(testPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(testPosition);

  gl.clear(gl.COLOR_BUFFER_BIT);
  // primitiveType, offset, count
  // count means run the vertex shader x times
  gl.drawArrays(gl.TRIANGLES, 0, 3);
};

function test(point) {
  var button = document.getElementById("testBtn");
  button.addEventListener("click", function () {
    point = [1, -0.1, 0.1, 0.5, 0.7, 0];
    // alert("asd");
  });
}
