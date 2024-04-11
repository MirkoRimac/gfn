document.getElementById("teamBild").style.display = "none";

function teamBild() {

    let teamBild = document.getElementById("teamBild");
    
    if (teamBild.style.display = "block") {
        let clock = setInterval(() => {
            clearInterval(clock)
            clock = null
            teamBild.style.display = "none"
        }, 2000)
    }
}

// GOTCHA hellTobsen
function showAlert() {
    // Hell-Tobsen anzeigen
    var hellTobsen = document.querySelector(".hell-tobsen");
    hellTobsen.style.display = "block";

    //Timeout
    setTimeout(function() {
        hellTobsen.style.display = "none";
    }, 3000)
}