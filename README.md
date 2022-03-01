# latin1-barcode (Code128)
![test badge](https://github.com/najtin/latin1-barcode/actions/workflows/test/badge.svg)

Encode symbols from the Latin-1 (ISO/IEC 8859-1) charset in a Code128 barcode. *Beware, this project is in its early stages.* All three encoding modes Code128A, B and C are supported. Most inputs will be short enough and fully optimized. Long inputs are not always optimized to save runtime. Inputs containing consecutive, non-ASCII characters might also be non-optimal, though in practice this case should be rare.

zbar does not supports the Latin-1 extension, which is why we can't automatically test this charset. If you know a command line tool to read Code128 barcodes with Latin-1 extension please let me know.

## Usage
```html
<canvas id="myCanvas" width="400" height="100">
Your browser does not support the canvas element.
</canvas>
<script src="latin1-barcode.js"></script> 
<script>
latin1_barcode("latin1 §ÄÖÜ", "myCanvas", 400, 100);
</script>
```

## Download 
- [latin1-barcode.js](https://raw.githubusercontent.com/najtin/bibtex-to-json/master/dist/latin1-barcode.js)
- [latin1-barcode.min.js](https://raw.githubusercontent.com/najtin/bibtex-to-json/master/dist/latin1-barcode.min.js)
- [latin1-barcode.js.map](https://raw.githubusercontent.com/najtin/bibtex-to-json/master/dist/latin1-barcode.js.map)