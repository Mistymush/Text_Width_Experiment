//JS file with D3 script
//Author: August Beers
var TRIAL_CAP = 6;

var left_margin = 20;
var bottom_margin = 15;
var top_margin = 10;
var width = 100;
var height = 100;

var BarRoot = {x: left_margin + (left_margin/2), y: height + top_margin};

var date = new Date();
var date_num = date.valueOf();

var ID = date_num % 100000;

var DATA = ["ID,TrialNum,Width,Time,Length\n"];
var TRIAL_NUM = 0;
var CURRENT_LENGTH;
var CURRENT_WIDTH;
var COMPLEATED = false;
var START_TIME;


var randIntRange = function(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var getTimeMilli = function(){
    var d = new Date();
    var n = d.getTime();
    return n;
}


var tupEquals = function(t1, t2){
    return (t1.x == t2.x) && (t1.y == t2.y);
}

var widths = ["100%","50%","25%","15%"];

var displayParagraph = function(){
    d3.select("#descript")
        .select("p").remove();
  
    var width_index = randIntRange(0, 3);
    CURRENT_WIDTH = widths[width_index]
    
    START_TIME = getTimeMilli();
    
    var message = jehu_ps[TRIAL_NUM];
    
    CURRENT_LENGTH = message.length;
    
    d3.select("#descript")
        .append("p")
        .text(message)
        .style("width", CURRENT_WIDTH);
    
    jehu_ps;
}

displayParagraph();

var recordData = function(reportedPrecent){
    
    var time = getTimeMilli() - START_TIME;
    console.log(time);
    
    var trial_num = TRIAL_NUM;
    
    if(trial_num != 0)
        trial_num = trial_num/2;
    
    var entry_string = ID 
                +','+ trial_num 
                +','+ CURRENT_WIDTH
                +','+ time
                +','+ CURRENT_LENGTH
                +"\n";
    
    DATA.push(entry_string);
}


//Button Function###############
var submitValue = function(){
    
    if(TRIAL_NUM%2 == 0){
        console.log("data recorded");
        recordData();
    }
       
    document.forms["RatioForm"].reset();

    TRIAL_NUM++;

    //pick next graph
    if(TRIAL_NUM < TRIAL_CAP) {
        displayParagraph();
    }
    else {
        displayData();
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

