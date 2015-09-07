var alertChange = function() {
    //get the data value and index from the event
    var selectedValue = d3.event.target.value;
    var selectedIndex = d3.event.target.selectedIndex;
    
    alert("You selected the option at index " + selectedIndex
          + ", with value attribute "
          + selectedValue);
    
    //if you need to access more complicated attributes 
    //or data from the option element, you can use the index
    //to select the individual element:
    var selectedDOMElement =
        d3.event.target.children[selectedIndex];
    var selection = d3.select(selectedDOMElement);
    
    alert("The text from that option was: " + selection.text());
}

//add this event listener to the first menu (as a whole):
d3.select("#select-list").on("change", alertChange);


//Compare with a function on individual option elements
//The code is shorter, but it doesn't work!!!
//Individual option elements don't create events when they are selected or clicked
var alertChange2 = function(d,i) {
    
    //the data value and index are in the parameters    
    alert("You selected the option at index " + i
          + ", with data value "
          + d);
    
    //the element is stored as 'this'
    var selection = d3.select(this);
    
    alert("The text from that option was: " + selection.text());
};

//add this event listener to the option elements
d3.select("#select-list2").selectAll("option")
    //set the D3 data object on the option elements to
    //match their value attribute:
    .datum(function(d){return d3.select(this).attr("value");})
    //add the listener to the click and change events 
    //(neither works!)
    .on("click", alertChange2)
    .on("change", alertChange2);	
