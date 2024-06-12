document.addEventListener("DOMContentLoaded",()=>{
    // time for clearing the game (10 minutes)
    let countDownDate = new Date().getTime() + 10 * 60 * 1000;
    let timer = setInterval(function() {
        let now = new Date().getTime();
        let timeRemaining = countDownDate - now;
        let minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        document.getElementById("countdown").innerHTML = minutes + ":" + seconds;
        // If the countdown is finished, go to index.html
        if (timeRemaining < 0) {
            clearInterval(timer);
            alert("You lose!");
            localStorage.removeItem("goal");
            window.location.href ="../htmls/leaderboard.html";
        }
    }, 1000);
});
