//Name: Finley Blakeman
//Date Due: 2/16/2021
//Assignment 2 - A sapphire made of triangles

"use strict";

let gl;
let base_points;
let base_colors;

window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");
    gl = canvas.getContext('webgl2');
    if (!gl) {alert("WebGL 2.0 isn't available");}

    base_colors = new Float32Array([
        0.3, 0.4, 1.0,
        0.0, 0.1, 1.0,
        0.0, 0.1, 0.5, //color of t1

        0.1, 0.2, 0.9,
        0.0, 0.1, 0.5,
        0.3, 0.4, 1.0, //color of t2

        0.2, 0.3, 1.0,
        0.3, 0.4, 0.8,
        0.0, 0.1, 0.5, //color of t3

        0.1, 0.2, 0.8,
        0.0, 0.1, 1.0,
        0.0, 0.1, 0.4, //color of t4

        0.0, 0.1, 1.0,
        0.0, 0.1, 1.0,
        0.0, 0.1, 0.5, //color of t5

        0.1, 0.2, 0.8,
        0.1, 0.2, 0.8,
        0.1, 0.2, 0.8, //color of t6

        0.0, 0.1, 0.8,
        0.0, 0.1, 1.0,
        0.0, 0.1, 0.7, //color of t7

        0.0, 0.1, 0.8,
        0.0, 0.1, 1.0,
        0.2, 0.3, 0.5 //color of t8
        
    ]);

    base_points = new Float32Array([
        0, 0,
        -0.75, 0,
        -0.5, 0.5, //end triangle 1
        0, 0,
        -0.5, 0.5,
        0, 0.75, //end triangle 2
        0, 0,
        0, 0.75,
        0.5, 0.5, //end triangle 3
        0, 0,
        0.5, 0.5,
        0.75, 0, //end triangle 4
        0, 0,
        0.75, 0,
        0.5, -0.5, //end triangle 5
        0, 0,
        0.5, -0.5,
        0, -0.75, //end triangle 6
        0, 0,
        0, -0.75,
        -0.5, -0.5, //end triangle 7
        0, 0,
        -0.5, -0.5,
        -0.75, 0 //end triangle 8
    ]);

    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.clearColor(0.8, 0.0, 0.8, 1.0);

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, base_colors, gl.STATIC_DRAW);

    var colorLoc = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, base_points, gl.STATIC_DRAW);

    var aPosition = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    render();
};

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, base_points.length);
}