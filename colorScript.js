var newColor = document.getElementById("manualPicker").value;

function colorPick(){

    var colorElement = document.getElementById("manualPicker").value;

    window.alert(colorElement);


   
 
    

    

}

document.getElementById("manualPicker").onchange = function() {
    newColor = this.value;
    window.alert(newColor);
}