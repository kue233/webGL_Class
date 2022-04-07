var arr1 = [-0.5, -0.5, 0.5, 1.0];
var arr2 = [-0.5, 0.5, 0.5, 1.0];
var arr3 = [0.5, 0.5, 0.5, 1.0];
var arr4 = [0.5, -0.5, 0.5, 1.0];
var arr5 = [-0.5, -0.5, -0.5, 1.0];
var arr6 = [-0.5, 0.5, -0.5, 1.0];
var arr7 = [0.5, 0.5, -0.5, 1.0];
var arr8 = [0.5, -0.5, -0.5, 1.0];
var vertices = [arr1, arr2, arr3, arr4, arr5, arr6, arr7, arr8];
var points = [];
var colors = [];

function quad(a, b, c, d) {
  /* var vertices = [
    vec4(-0.5, -0.5, 0.5, 1.0),
    vec4(-0.5, 0.5, 0.5, 1.0),
    vec4(0.5, 0.5, 0.5, 1.0),
    vec4(0.5, -0.5, 0.5, 1.0),
    vec4(-0.5, -0.5, -0.5, 1.0),
    vec4(-0.5, 0.5, -0.5, 1.0),
    vec4(0.5, 0.5, -0.5, 1.0),
    vec4(0.5, -0.5, -0.5, 1.0),
  ]; */

  var vertexColors = [
    [0.0, 0.0, 0.0, 1.0], // black
    [1.0, 0.0, 0.0, 1.0], // red
    [1.0, 1.0, 0.0, 1.0], // yellow
    [0.0, 1.0, 0.0, 1.0], // green
    [0.0, 0.0, 1.0, 1.0], // blue
    [1.0, 0.0, 1.0, 1.0], // magenta
    [0.0, 1.0, 1.0, 1.0], // cyan
    [1.0, 1.0, 1.0, 1.0], // white
  ];

  // We need to parition the quad into two triangles in order for
  // WebGL to be able to render it.  In this case, we create two
  // triangles from the quad indices

  //vertex color assigned by the index of the vertex
  //1, 0, 3, 2
  //a, b, c, d
  //1, 0, 3, 1, 3, 2
  var indices = [a, b, c, a, c, d];

  for (var i = 0; i < indices.length; ++i) {
    console.log(i);
    points.push(vertices[indices[i]]);
    //colors.push( vertexColors[indices[i]] );

    // for solid colored faces use
    colors.push(vertexColors[a]);
  }
}
quad(1, 0, 3, 2);
console.log(points);
console.log(colors);
