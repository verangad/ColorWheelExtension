
var newColor = document.getElementById("manualPicker").value;

function colorPick(){

    var colorElement = document.getElementById("manualPicker").value;

    shadePicker("0x112456");


   
 
    

    

}

document.getElementById("manualPicker").onchange = function() {
    newColor = this.value;
    window.alert(newColor);
}
