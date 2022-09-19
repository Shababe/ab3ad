var hrTimer = document.getElementById("hrTimer")
var Minimer = document.getElementById("minTimer")
var secTimer = document.getElementById("secTimer")

var date = new Date();

let currentDay = date.getDate();
let currentHr = date.getHours();
let currentMin = date.getMinutes();
let currentSec = date.getSeconds();

let targetDay = 1
let targetHr = 16
let targetMin = 30
let targetSec = 60


var counterDown = setInterval(function updateValues() {

    currentSec++;
    if (currentSec == 60) {
        currentSec = 0
        currentMin++
        if (currentMin == 60) {
            currentMin = 0
            currentHr++
            if (currenthr == 24) {
                currentHr = 0
                currentDay++
            }
        }
    }

    var showHr = (targetDay - currentDay) * 24 + targetHr - currentHr -1;
    
    if(targetMin> currentMin){
        showHr++
        showMin = targetMin - currentMin -1;
    }
    else{
       
        var showMin = 59 - (currentMin - targetMin);
    }
    
    var showSec = targetSec - currentSec - 1;
    
    updateTimer(showHr, showMin, showSec);

    if(showHr <0 ||showMin < 0 || showSec < 0 ){
        updateTimer(0, 0, 0);
        document.location.reload
        clearInterval(counterDown)
        return
    }    

}, 1000);


function updateTimer(hr, min, sec) {

    hr = leadingZero(hr)
    min = leadingZero(min)
    sec = leadingZero(sec)

    hrTimer.innerHTML = (hr + ":")
    minTimer.innerHTML = (min + ":")
    secTimer.innerHTML = (sec + "")

}

function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}