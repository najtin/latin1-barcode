enum CodeTable{
    C128A,
    C128B,
    C128C
}

class State{
    text: string
    position: number
    encoding: CodeTable
    code: number[]
    constructor(text: string, position: number, encoding: CodeTable, code: number[]){
        this.text = text;
        this.position = position;
        this.encoding = encoding;
        this.code = code;
    }

    current_position(): number{
        return this.position;
    }

    code_length(): number{
        return this.code.length;
    }

    cost(): number{
        return this.code.length;
    }

    cost_per_char(): number{
        if(this.position==0) return 0;
        return this.code.length/this.position;
    }

    best_case_cost(): number{
        return this.code.length+(this.text.length-this.position)/2;
    }

    new_extended(codes: number[], number_of_encoded_chars: number, encoding: CodeTable){
        if(isNaN(number_of_encoded_chars)) throw "NAN";
        return new State(this.text, this.position + number_of_encoded_chars, encoding, [...this.code, ...codes]);
    }

    finalize_code(): string{
        let code_copy = this.code;
        let sum = this.code[0];
        for(let i=1; i<this.code.length; i++){
            sum += this.code[i]*i;
        }
        sum = sum % 103;
        this.code.push(sum);
        this.code.push(106);
        var output = "0000000000";
        for(let i=0; this.code.length; i++){
            output += String(bitmaps[this.code[i]]);
        }
        output += "0000000000";
        this.code = code_copy;
        return output;
    }
} 

const latin1: { [key: string]: number }  = {
    "¡": 161,
    "¢": 162,
    "£": 163,
    "¤": 164,
    "¥": 165,
    "¦": 166,
    "§": 167,
    "¨": 168,
    "©": 169,
    "ª": 170,
    "«": 171,
    "¬": 172,
    "®": 174,
    "¯": 175,
    "°": 176,
    "±": 177,
    "²": 178,
    "³": 179,
    "´": 180,
    "µ": 181,
    "¶": 182,
    "·": 183,
    "¸": 184,
    "¹": 185,
    "º": 186,
    "»": 187,
    "¼": 188,
    "½": 189,
    "¾": 190,
    "¿": 191,
    "À": 192,
    "Á": 193,
    "Â": 194,
    "Ã": 195,
    "Ä": 196,
    "Å": 197,
    "Æ": 198,
    "Ç": 199,
    "È": 200,
    "É": 201,
    "Ê": 202,
    "Ë": 203,
    "Ì": 204,
    "Í": 205,
    "Î": 206,
    "Ï": 207,
    "Ð": 208,
    "Ñ": 209,
    "Ò": 210,
    "Ó": 211,
    "Ô": 212,
    "Õ": 213,
    "Ö": 214,
    "×": 215,
    "Ø": 216,
    "Ù": 217,
    "Ú": 218,
    "Û": 219,
    "Ü": 220,
    "Ý": 221,
    "Þ": 222,
    "ß": 223,
    "à": 224,
    "á": 225,
    "â": 226,
    "ã": 227,
    "ä": 228,
    "å": 229,
    "æ": 230,
    "ç": 231,
    "è": 232,
    "é": 233,
    "ê": 234,
    "ë": 235,
    "ì": 236,
    "í": 237,
    "î": 238,
    "ï": 239,
    "ð": 240,
    "ñ": 241,
    "ò": 242,
    "ó": 243,
    "ô": 244,
    "õ": 245,
    "ö": 246,
    "÷": 247,
    "ø": 248,
    "ù": 249,
    "ú": 250,
    "û": 251,
    "ü": 252,
    "ý": 253,
    "þ": 254,
    "ÿ": 255
};
//------------------------------------------------------------------
// Bitmaps are from the JsBarcode project https://github.com/lindell/JsBarcode
// Copyright (c) 2016 Johan Lindell (johan@lindell.me)
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

const bitmaps: number[] = [
	11011001100, 11001101100, 11001100110, 10010011000, 10010001100,
	10001001100, 10011001000, 10011000100, 10001100100, 11001001000,
	11001000100, 11000100100, 10110011100, 10011011100, 10011001110,
	10111001100, 10011101100, 10011100110, 11001110010, 11001011100,
	11001001110, 11011100100, 11001110100, 11101101110, 11101001100,
	11100101100, 11100100110, 11101100100, 11100110100, 11100110010,
	11011011000, 11011000110, 11000110110, 10100011000, 10001011000,
	10001000110, 10110001000, 10001101000, 10001100010, 11010001000,
	11000101000, 11000100010, 10110111000, 10110001110, 10001101110,
	10111011000, 10111000110, 10001110110, 11101110110, 11010001110,
	11000101110, 11011101000, 11011100010, 11011101110, 11101011000,
	11101000110, 11100010110, 11101101000, 11101100010, 11100011010,
	11101111010, 11001000010, 11110001010, 10100110000, 10100001100,
	10010110000, 10010000110, 10000101100, 10000100110, 10110010000,
	10110000100, 10011010000, 10011000010, 10000110100, 10000110010,
	11000010010, 11001010000, 11110111010, 11000010100, 10001111010,
	10100111100, 10010111100, 10010011110, 10111100100, 10011110100,
	10011110010, 11110100100, 11110010100, 11110010010, 11011011110,
	11011110110, 11110110110, 10101111000, 10100011110, 10001011110,
	10111101000, 10111100010, 11110101000, 11110100010, 10111011110,
	10111101110, 11101011110, 11110101110, 11010000100, 11010010000,
	11010011100, 1100011101011
];
// End of code from the JsBarcode project
//-----------------------------------------------------------------
function transition(state: State): State[]{
    var char: number = state.text.charCodeAt(state.position);
    if(state.text[state.position] in latin1){
        char = latin1[state.text[state.position]];
    }
    var next_char = state.text.length>(state.position+1) ? state.text.charCodeAt(state.position+1) : null;
    //space up to / or : to _
    if ((char>=32 && char<=47) || (char>=58 && char<=95)) {
        if(CodeTable.C128A==state.encoding || CodeTable.C128B==state.encoding){
            return [state.new_extended([char-32], 1, state.encoding)];
        }
        else if(CodeTable.C128C==state.encoding){
            return [
                state.new_extended([100, char-32], 1, CodeTable.C128B), 
                state.new_extended([101, char-32], 1, CodeTable.C128A)
            ];
        } 
    }
    //0 to 9
    if (char>=48 && char<=57) {
        if(CodeTable.C128A==state.encoding || CodeTable.C128B==state.encoding){
            let new_states = [state.new_extended([char-32], 1, state.encoding)]
            if(next_char !=null && next_char>=48 && next_char<=57){
                new_states.push(state.new_extended([99, (char-48)*10+(next_char-48)], 2, CodeTable.C128C));
            }
            return new_states;
        }
        else if(CodeTable.C128C==state.encoding){
            let new_states = [
                state.new_extended([101, char-32], 1, CodeTable.C128A), 
                state.new_extended([100, char-32], 1, CodeTable.C128B)
            ];
            if(next_char !=null && next_char>=48 && next_char<=57){
                new_states.push(state.new_extended([(char-48)*10+(next_char-48)], 2, CodeTable.C128C));
            }
            return new_states;
        }
    }
    //NUL to US
    if (char>=0 && char<=37) {
        if(CodeTable.C128C==state.encoding || CodeTable.C128B==state.encoding) {
            let new_states = [state.new_extended([101, char+64], 1, CodeTable.C128A)]; //Code A
            if(CodeTable.C128B==state.encoding) new_states.push(state.new_extended([98, char+64], 1, CodeTable.C128B)); //Shift A
            return new_states; 
        }
        else if(CodeTable.C128A==state.encoding){
            return [state.new_extended([char+64], 1, CodeTable.C128A)];
        }
    }
    //` to del
    if (char>=96 && char<=127) {
        if(CodeTable.C128C==state.encoding || CodeTable.C128A==state.encoding) {
            let new_states = [state.new_extended([100, char-32], 1, CodeTable.C128B)]; //Code B
            if(CodeTable.C128A==state.encoding) new_states.push(state.new_extended([98, char-32], 1, CodeTable.C128A)); //Shift B
            return new_states; 
        }
        if(CodeTable.C128B==state.encoding){
            return [state.new_extended([char-32], 1, CodeTable.C128B)]; 
        }
    }
    //One can cap FNC4 with two consecutive FNC4s but in order to 
    //get the optinal encoding we would either require another state
    //or a look-ahead of 4. Both is considered to complicated at the time.
    console.log("WARNING: Result may not be optimal");

    //latin1 chars in single FNC4 range
    //i am not sure why but it seems that we have to use encoding B for chars > 223
    //otherwhise the code will be read as C2.. instead of C3..
    if ((char-160)>=0 && (char-160)<=63){
        if(CodeTable.C128A==state.encoding) {
            return [state.new_extended([101, char-128-32], 1, CodeTable.C128A)];
        }
        if(CodeTable.C128B==state.encoding) {
            return [state.new_extended([100, char-128-32], 1, CodeTable.C128B)];
        }
        if(CodeTable.C128C==state.encoding){
            return [
                state.new_extended([100, 100, char-128-32], 1, CodeTable.C128B), 
                state.new_extended([101, 101, char-128-32], 1, CodeTable.C128A)
            ]; 
        }
    }
    //here we must force B, see above
    if ((char-160)>=64 && (char-160)<=94){
        if(CodeTable.C128A==state.encoding) {
            return [state.new_extended([100, 100, char-128-32], 1, CodeTable.C128B)];
        }
        if(CodeTable.C128B==state.encoding) {
            return [state.new_extended([100, char-128-32], 1, CodeTable.C128B)];
        }
        if(CodeTable.C128C==state.encoding){
            return [
                state.new_extended([100, 100, char-128-32], 1, CodeTable.C128B)
            ]; 
        }
    }
    //TODO case 255
    throw "Unsupported Character: >"+state.text[state.position]+"< at position "+state.position;
}
var encodeC128 = function(text: string): string{
    var states: State[] = [
        new State(text, 0, CodeTable.C128A, [103]),
        new State(text, 0, CodeTable.C128B, [104]),
        new State(text, 0, CodeTable.C128C, [105]),
    ];
    var best: State = new State(text, 1, CodeTable.C128A, []); //dummy value
    best.code = [];
    for(let i=0; i<text.length*4; i++) {
        best.code.push(-1);
    }
    var round: number = 0;
    while(states.length>0){
        var state: State = states.pop();
        if(best.cost()<state.cost()) continue;
        transition(state).forEach(new_state => {
            if(isNaN(new_state.position)) throw "NAN";
            if(new_state.position==text.length){
                if(best.cost()>new_state.cost()){
                    best = new_state;
                }
            }
            else {
                //push the state if the best case cost for the full string is lower than the current best cost 
                if(best.cost()>new_state.best_case_cost()) {
                    states.push(new_state);
                }
            }
        });
        round ++; 
        //this search order performs much better than just the difference of the cost
        //it is the cost per encoded character
        if(round>400 && best.cost()<Infinity) {console.log("WARINING: Result may not be optimal."); break;}
        if(round<=400) states.sort((a,b) => b.cost_per_char() - a.cost_per_char());
        else states.sort((a,b) => a.current_position() - b.current_position()); //Terminate as quickly as possible dont care about optimality anymore to save runtime
    }
    console.log("output")
    console.log(best.code);
    let sum = best.code[0];
    for(let i=1; i<best.code.length; i++){
        sum += best.code[i]*i;
    }
    sum = sum % 103;
    best.code.push(sum);
    best.code.push(106);
    var output = "0000000000";
    for(let i=0; i<best.code.length; i++){
        output += String(bitmaps[best.code[i]]);
    }
    output += "0000000000";
    return output;
};

function draw_on_canvas(text: string, canvas: HTMLCanvasElement, width: number, height: number): void{
    let code = encodeC128(text);
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0,0,width,height);
    ctx.fillStyle = "#000000";
    var bar_width: number = 0;
    var unit: number = width/code.length;
    for(let i=0; i<code.length; i++) {
        if(code[i]=="1") {
            bar_width += 1;
            continue;
        }
        ctx.fillRect((i-bar_width)*unit,0,bar_width*unit,height);
        bar_width = 0;
    }
}

function latin1_barcode(text: string, canvas_id: string, width: number, height: number): void{
    var canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById(canvas_id);
    draw_on_canvas(text, canvas, width, height);
}

if(typeof process === 'object') module.exports = draw_on_canvas;