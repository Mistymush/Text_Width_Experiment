//JS file with D3 script
//Author: August Beers
var TRIAL_CAP = 60;

var left_margin = 20;
var bottom_margin = 15;
var top_margin = 10;
var width = 100;
var height = 100;

var BarRoot = {x: left_margin + (left_margin/2), y: height + top_margin};

var date = new Date();
var date_num = date.valueOf();

var ID = date_num % 100000;

var DATA = ["ID,TrialNum,Vis,TruePrecent,ReportedPrecent,\n"];
var CURRENT_TRUE_VALUE = undefined;
var TRIAL_NUM = 0;
var CURRENT_VIS;
var COMPLEATED = false;


var randIntRange = function(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


var tupEquals = function(t1, t2){
    return (t1.x == t2.x) && (t1.y == t2.y);
}




var displayParagraph = function(){
    d3.select("#descript")
        .select("p").remove();
  
    
    d3.select("#descript")
        .append("p")
        .text(jehu_ps[TRIAL_NUM])
        .style("width", "100%");
    
    jehu_ps;
}

displayParagraph();

var recordData = function(reportedPrecent){
    
    var entry_string = ID 
                +','+ TRIAL_NUM 
                +','+ CURRENT_VIS
                +','+ CURRENT_TRUE_VALUE
                +','+ reportedPrecent
                +",\n";
    
    DATA.push(entry_string);
    
}


//Button Function###############
var submitValue = function(){
    
    
    var message = document.forms["RatioForm"]["ratio"].value;
    var precent = parseFloat(message);
    
    if(message == "" || !precent || precent > 100 || precent < 0){
        alert("Must fill out ratio field as a two precent < 100 and > 0!")
        return;
    }
    else{
        recordData(precent);
        
        document.forms["RatioForm"].reset();
        
        TRIAL_NUM++;
     
        //pick next graph
        if(TRIAL_NUM < TRIAL_CAP) {
      
        }
        else {
            displayData();
        }
           
        
    } 
}

var displayData = function(){
    
    if(COMPLEATED)
        return;
    var message = "";
    
    for(var i = 0; i < DATA.length; i++){
        message += DATA[i];
    }
    
    var text = document.createElement("TEXTAREA");
    var node = document.createTextNode(message);
   
    text.appendChild(node);
    document.body.appendChild(text);
    
    COMPLEATED = true;
}

var doNothing = function(){
    
}

