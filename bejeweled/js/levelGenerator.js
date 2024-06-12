if (localStorage.getItem("levelCounter") === null) {
    localStorage.setItem("levelCounter", 1);
}
if (localStorage.getItem("goal") === null) {
    localStorage.setItem("goal", 2000);
}

export let goal=parseInt(localStorage.getItem("goal"));
export let levelCounter=parseInt(localStorage.getItem("levelCounter"));
export let nextLevelButton=document.getElementById("newLevel");
export let lbButton=document.getElementById("lbButton");
nextLevelButton.style.opacity=0;
nextLevelButton.style.zIndex=-2;
lbButton.style.opacity=0;
lbButton.style.zIndex=-2;

nextLevelButton.addEventListener("click",()=>{
    goal+=1000;
    localStorage.setItem("goal", goal);
    levelCounter++;
    localStorage.setItem("levelCounter", levelCounter);
});