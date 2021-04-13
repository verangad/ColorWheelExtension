



var newColor = document.getElementById("manualPicker").value;

function colorPick(){

    var colorElement = document.getElementById("manualPicker").value;

    shadePicker("0x112456");

}

function convertHSL(rgb){
    const RGBCONST = 255;
    let hue;
    let saturation;
    let lightness;

    let colorPart = rgb.slice(1);

    let inputColor = "0x" + colorPart;

    let redMask = "0xFF0000";
    let greenMask = "0x00FF00";
    let blueMask = "0x0000FF";


    let red = (inputColor & redMask);
    let green = (inputColor & greenMask);
    let blue = (inputColor & blueMask);

    red = red >> 16;
    green = green >> 8;

    red /= RGBCONST;
    green /= RGBCONST;
    blue /= RGBCONST;

    max = Math.max(Math.max(red, green), blue);
    min = Math.min(Math.min(red, green), blue);

    let colorDiff = max - min;

    //calculate brightness
    lightness = (max + min)/2


    //calculate hue
    if(colorDiff === 0){
        hue = 0;
    }
    else if(max === red){

        hue = 60*(((green - blue) / colorDiff) % 6);

    }
    else if(max === green){
        hue = 60*(((blue - red) / colorDiff) + 2);
        
    }
    else if(max === blue){
        hue = 60*(((red - green) / colorDiff) + 4);
    }
    //calculate saturation
    if(colorDiff === 0){
        saturation = 0;
    }
    else if(colorDiff > 0 || colorDiff < 0){

        saturation = (colorDiff)/(1 - (Math.abs((2*lightness - 1))));
    }

    let hsl = {h: hue, s: saturation, l: lightness};

    return hsl;
}

function convertRGB(hsl){

    let hex = "#";

    if('h' in hsl && 's' in hsl && 'l' in hsl){

        let color = (1 - Math.abs(2*hsl.l - 1)) * hsl.s;
        let x = color * (1 - Math.abs((hsl.h / 60) % 2 - 1));

        let additor = hsl.l - (color/2);

        let rgb = {r: 0, g: 0, b: 0};



        //convert to rgb

        if(hsl.h >= 0 && hsl.h < 60){
            rgb.r = color;
            rgb.g = x;
            rgb.b = 0;
        }
        else if(hsl.h >= 60 && hsl.h < 120){
            rgb.r = x;
            rgb.g = color;
            rgb.b = 0;
        }
        else if(hsl.h >= 120 && hsl.h < 180){
            rgb.r = 0;
            rgb.g = color;
            rgb.b = x;
        }
        else if(hsl.h >= 180 && hsl.h < 240){
            rgb.r = 0;
            rgb.g = x;
            rgb.b = color;
        }
        else if(hsl.h >= 240 && hsl.h < 300){
            rgb.r = x;
            rgb.g = 0;
            rgb.b = color;
        }
        else if(hsl.h >= 300 && hsl.h < 360){
            rgb.r = color;
            rgb.g = 0;
            rgb.b = x;
        }
        rgb.r = (rgb.r+additor)*255;
        rgb.g = (rgb.g+additor)*255;
        rgb.b = (rgb.b+additor)*255;

       
    
        hex += padHex(rgb.r.toString(16), 2).slice(0,2);

        
        
        hex += padHex(rgb.g.toString(16), 2).slice(0,2);

        

        hex += padHex(rgb.b.toString(16), 2).slice(0,2);


    }

    
    return hex;
}



function padHex(string, limiter){

    let numPad = limiter - string.length;
    let newString = "";

    if(numPad > 0){
        for(let i = 0; i < numPad; i++){
            newString += "0";
        }
    }

    
    newString += string;


    return newString;
}

function addDegree(hsl, deg){

    let newHsl = {h: hsl.h, s: hsl.s, l: hsl.l}

    if('h' in newHsl && 's' in newHsl && 'l' in newHsl){

        let newDeg = newHsl.h += deg;

        if(newDeg > 360){

            newDeg -= 360;
        }
        else if(newDeg < 0){
            newDeg += 360;
        }

        newHsl.h = newDeg;
    }

    return newHsl;
}


function monoColor(newColor){
    var compBox = document.getElementsByClassName("rectangle monochrome");

  


    compBox[0].style.backgroundColor = newColor;
}


function complemColor(newColor){

    var compBox = document.getElementsByClassName("rectangle complement");

    let hsl = convertHSL(newColor);

    
    let complemColor = addDegree(hsl, 180);
    

    let hexComplemColor = convertRGB(complemColor);



    
    
     
    compBox[0].style.backgroundColor = newColor;
    compBox[1].style.backgroundColor = hexComplemColor;
}

function analogColor(newColor){
    var compBox = document.getElementsByClassName("rectangle analog");

    let hsl = convertHSL(newColor);

    let splitOne = addDegree(hsl, 30);
    let splitTwo = addDegree(hsl, 330);
    

    let hexSplitOne = convertRGB(splitOne);
    let hexSplitTwo = convertRGB(splitTwo);
    

    compBox[0].style.backgroundColor = newColor;
    compBox[1].style.backgroundColor = hexSplitOne;
    compBox[2].style.backgroundColor = hexSplitTwo;
   
   
    compBox[0].style.backgroundColor = newColor;
 
 
}

function splitColor(newColor){
    var compBox = document.getElementsByClassName("rectangle split-comp");

    let hsl = convertHSL(newColor);

    

    let splitOne = addDegree(hsl, 150);
    let splitTwo = addDegree(hsl, 210);

    
    

    let hexSplitOne = convertRGB(splitOne);
    let hexSplitTwo = convertRGB(splitTwo);
    
    window.alert(hexSplitOne);
    window.alert(hexSplitTwo);

    compBox[0].style.backgroundColor = newColor;
    compBox[1].style.backgroundColor = hexSplitOne;
    compBox[2].style.backgroundColor = hexSplitTwo;
}

function triadColor(newColor){
    var compBox = document.getElementsByClassName("rectangle triad");

    let colorPart = newColor.slice(1);

    let inputColor = "0x" + colorPart;

    let redMask = "0xFF0000";
    let greenMask = "0x00FF00";
    let blueMask = "0x0000FF";


    let red = (inputColor & redMask);
    let green = (inputColor & greenMask);
    let blue = (inputColor & blueMask);
    
    let leftColor = ((red >> 16) + (green << 8) + (blue << 8)).toString(16);

    let rightColor = ((red >> 8) + (green >> 8) + (blue << 16)).toString(16);
   
    let padding = "";
    while((padding.length + leftColor.length) < 6){
        padding += '0';
    }

    leftColor = padding + leftColor;

    padding = "";

    while((padding.length + rightColor.length) < 6){
        padding += '0';
    }
    
    rightColor = padding + rightColor;

    compBox[0].style.backgroundColor = newColor;
    compBox[1].style.backgroundColor = "#" + leftColor;
    compBox[2].style.backgroundColor = "#" + rightColor;
}

function tetraColor(newColor){
    var compBox = document.getElementsByClassName("rectangle tetra");

    let hsl = convertHSL(newColor);

    let oneQuarter = addDegree(hsl, 90);
    let halfColor = addDegree(hsl, 180);
    let threeQuarters = addDegree(hsl, 270);

    let hexOneQuarter = convertRGB(oneQuarter);
    let hexHalfColor = convertRGB(halfColor);
    let hexThreeQuarters = convertRGB(threeQuarters);

    compBox[0].style.backgroundColor = newColor;
    compBox[1].style.backgroundColor = hexOneQuarter;
    compBox[2].style.backgroundColor = hexHalfColor;
    compBox[3].style.backgroundColor = hexThreeQuarters;
}

document.getElementById("manualPicker").onchange = function() {
    newColor = this.value;

    monoColor(newColor);
    complemColor(newColor);
    analogColor(newColor);
    splitColor(newColor);
    triadColor(newColor);
    tetraColor(newColor);
}
