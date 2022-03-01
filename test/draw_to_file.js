const { createCanvas } = require('canvas');
const { getSystemErrorMap } = require('util');
const barcode = require("../dist/latin1-barcode.js")
function draw_to_file(text) {
    var canvas = createCanvas(10000, 100);
    console.log(barcode);
    barcode(text, canvas, 10000, 100);
    return canvas.toDataURL();
}

//console.log(process.argv[2])
console.log(draw_to_file(process.argv[2]).substring(22));