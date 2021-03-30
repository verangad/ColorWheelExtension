var c = document.getElementById("shadePicker");
var rectangle = c.getContext("2d");


for(i = 0; i < c.height; i += 30){ //draw each rectangle in the shade picker in the canvas

    rectangle.beginPath();
    rectangle.fillStyle = "#FFFFFF";
    rectangle.lineWidth = "2";
    rectangle.strokeStyle = "black";
    rectangle.rect(0, i, c.width, 30);
    rectangle.fill();
    rectangle.stroke();

}
