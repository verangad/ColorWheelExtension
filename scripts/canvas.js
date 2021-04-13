var c = document.getElementById("shadePicker");
var rectangle = c.getContext("2d");

let base = "0xFFFFFF";

function shadePicker(baseColor){

    let newCol = baseColor;

    for(i = 0; i < c.height; i += 30){ //draw each rectangle in the shade picker in the canvas

    
        let fiveDrop = 0x001A1A;
    
    
        rectangle.beginPath();
        console.log(newCol);
        rectangle.fillStyle = convertColor(newCol - fiveDrop);
        rectangle.lineWidth = "2";
        rectangle.strokeStyle = "black";
        rectangle.rect(0, i, c.width, 30);
        rectangle.fill();
        rectangle.stroke();
    
        newCol = newCol - fiveDrop;
    
    }

    
}









function convertColor(inColor){

    colorString = Number(inColor).toString(16);

    outColor = "000000".substr( 0, 6 - colorString.length ) + colorString.toUpperCase();

    return "#" + outColor;

}

shadePicker(base);



