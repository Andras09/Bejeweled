import {goal, levelCounter,nextLevelButton,lbButton} from './levelGenerator.js';

document.addEventListener("DOMContentLoaded",()=>{
    //------variables--------------------
    let grid = document.querySelector('.grid');
    let cells=[];
    let colors=["blue","green","orange","purple","red","yellow"];
    let idCount=0;
    let width=8;
    localStorage.removeItem("score");
    if (localStorage.getItem("score") === null) {
        localStorage.setItem("score", 0);
    }
    let score=parseInt(localStorage.getItem("score"));
    let draggedId=0;

    //-----functions-------------------
    /**
     * Initializes the game board by creating cells and adding jewels to them.
     */
    function init_board(){
        for(let i=0;i<width*width;i++){
            let cell=document.createElement('div');
            let color=Math.floor(Math.random()*6);
            cell.className=colors[color];
            cell.setAttribute('id',i);
            let jewel=document.createElement('img');
            jewel.src="../pics/"+cell.className+".png";
            jewel.className="jewel";
            jewel.setAttribute('draggable',"true");
            jewel.setAttribute('id',idCount+"j");
            idCount++;
            cell.appendChild(jewel);
            grid.appendChild(cell);
            cells.push(cell);
        }
    }

    function dragStart(e){
        e.dataTransfer.setData ("src", e.target.id);
        draggedId=parseInt(this.id);
        this.classList.add('dragging');
    }
    function dragOver(e){
        e.preventDefault();
        //console.log(this.id, 'over');
    }
    function dragDrop(e){
        e.preventDefault ();
        let targetId=parseInt(this.id);
        if(draggedId+width!==targetId && draggedId-width!==targetId &&
            draggedId+1!==targetId && draggedId-1!==targetId){

        }
        else{
            let img = document.getElementById(e.dataTransfer.getData("src"));
            let imgParent = img.parentNode;
            let target = e.currentTarget.firstElementChild;
            e.currentTarget.replaceChild(img, target);
            imgParent.appendChild (target);
            img.style.transform = 'none';
        }
    }
    function dragEnd(e){
        this.classList.remove('dragging');
    }

    /**
     * Removes the jewels and plays audio when a match of three is found.
     * @param {number} i - The index of the first jewel in the match.
     * @param {boolean} ifrow - Determines if the jewels are in the same row or column.
     */
    function removeJewel(i,ifrow){
        if(ifrow===true){
            cells[i].removeChild(cells[i].firstElementChild);
            cells[i+1].removeChild(cells[i+1].firstElementChild);
            cells[i+2].removeChild(cells[i+2].firstElementChild);
        }
        else{
            cells[i].removeChild(cells[i].firstElementChild);
            cells[i+width].removeChild(cells[i+width].firstElementChild);
            cells[i+width*2].removeChild(cells[i+width*2].firstElementChild);
        }
        playAudio();
    }

    function playAudio() {
        const audio = new Audio('../music/matching.mp3');
        audio.play();
    }

    function checkMatchesForThree(){
        //checking for matches in row
        for(let i=0;i<62;i++){
            //checking if the 3 jewels are in the same row
            let notValid=[6,7,14,15,22,23,30,31,38,39,46,47,54,55];
            if(notValid.includes(i)){
                continue;
            }
            if(cells[i].firstElementChild!==null&&cells[i+1].firstElementChild!==null&&
                cells[i+2].firstElementChild!==null){
                let img=cells[i].firstElementChild.src;
                if(cells[i+1].firstElementChild.src===img && cells[i+2].firstElementChild.src===img){
                    score+=30;
                    removeJewel(i,true);
                }
            }
        }

        //checking for matches in column
        for(let i=0;i<48;i++){
            if(cells[i].firstElementChild!==null&&cells[i+width].firstElementChild!==null&&
                cells[i+width*2].firstElementChild!==null){
                let img=cells[i].firstElementChild.src;
                if(cells[i+width].firstElementChild.src===img && cells[i+width*2].firstElementChild.src===img){
                    score+=30;
                    removeJewel(i,false);

                }
            }
        }
    }

    function checkMatchesForFour(){
        //checking for matches in row
        for(let i=0;i<61;i++){
            //checking if the 3 jewels are in the same row
            let notValid=[5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55];
            if(notValid.includes(i)){
                continue;
            }
            if(cells[i].firstElementChild!==null&&cells[i+1].firstElementChild!==null&&
                cells[i+2].firstElementChild!==null&& cells[i+3].firstElementChild!==null){
                let img=cells[i].firstElementChild.src;
                if(cells[i+1].firstElementChild.src===img && cells[i+2].firstElementChild.src===img&&
                    cells[i+3].firstElementChild.src===img){
                    score+=40;
                    removeJewel(i,true);
                    cells[i+3].removeChild(cells[i+3].firstElementChild);
                }
            }
        }

        //checking for matches in column
        for(let i=0;i<40;i++){
            if(cells[i].firstElementChild!==null&&cells[i+width].firstElementChild!==null&&
                cells[i+width*2].firstElementChild!==null&&cells[i+width*3].firstElementChild!==null){
                let img=cells[i].firstElementChild.src;
                if(cells[i+width].firstElementChild.src===img && cells[i+width*2].firstElementChild.src===img&&
                    cells[i+width*3].firstElementChild.src===img){
                    score+=40;
                    removeJewel(i,false);
                    cells[i+width*3].removeChild(cells[i+width*3].firstElementChild);
                }
            }
        }
    }

    function checkMatchesForFive(){
        //checking for matches in row
        for(let i=0;i<60;i++){
            //checking if the 3 jewels are in the same row
            let notValid=[4,5,6,7,12,13,14,15,20,21,22,23,28,29,30,31,36,37,38,39,44,45,46,47,52,53,54,55];
            if(notValid.includes(i)){
                continue;
            }
            if(cells[i].firstElementChild!==null&&cells[i+1].firstElementChild!==null&&
                cells[i+2].firstElementChild!==null&& cells[i+3].firstElementChild!==null&& cells[i+4].firstElementChild!==null){
                let img=cells[i].firstElementChild.src;
                if(cells[i+1].firstElementChild.src===img && cells[i+2].firstElementChild.src===img&&
                    cells[i+3].firstElementChild.src===img&& cells[i+4].firstElementChild.src===img){
                    score+=60;
                    removeJewel(i,true);
                    cells[i+3].removeChild(cells[i+3].firstElementChild);
                    cells[i+4].removeChild(cells[i+4].firstElementChild);
                }
            }
        }

        //checking for matches in column
        for(let i=0;i<32;i++){
            if(cells[i].firstElementChild!==null&&cells[i+width].firstElementChild!==null&&
                cells[i+width*2].firstElementChild!==null&&cells[i+width*3].firstElementChild!==null&&cells[i+width*4].firstElementChild!==null){
                let img=cells[i].firstElementChild.src;
                if(cells[i+width].firstElementChild.src===img && cells[i+width*2].firstElementChild.src===img&&
                    cells[i+width*3].firstElementChild.src===img&&cells[i+width*4].firstElementChild.src===img){
                    score+=60;
                    removeJewel(i,false);
                    cells[i+width*3].removeChild(cells[i+width*3].firstElementChild);
                    cells[i+width*4].removeChild(cells[i+width*4].firstElementChild);
                }
            }
        }
    }

    function dropJewel(){
        for(let i=0;i<56;i++){
            if(cells[i+width].firstElementChild===null&&cells[i].firstElementChild!==null){
                //dropping down the jewels
                cells[i+width].appendChild(cells[i].firstElementChild);
            }
        }
    }

    //generating new jewels
    function generateJewels(){
        for(let i=0;i<8;i++){

            if(cells[i].firstElementChild===null){
                let color=Math.floor(Math.random()*6);
                cells[i].className=colors[color];
                let jewel=document.createElement('img');
                jewel.src="../pics/"+cells[i].className+".png";
                jewel.className="jewel";
                jewel.setAttribute('draggable',"true");
                jewel.setAttribute('id',idCount+"j");
                idCount++;
                cells[i].appendChild(jewel);
            }
        }
    }

    //------function calls and the rest-----------------
    init_board();
    cells.forEach(cell =>cell.addEventListener('dragstart',dragStart));
    cells.forEach(cell =>cell.addEventListener('dragover',dragOver));
    cells.forEach(cell =>cell.addEventListener('drop',dragDrop));
    cells.forEach(cell =>cell.addEventListener('dragend',dragEnd));

    document.getElementById("level").innerHTML="Level "+levelCounter;
    document.getElementById("goal").innerHTML= "Goal: "+goal;

    let timer=window.setInterval(function (){
        dropJewel()
        generateJewels();
        checkMatchesForFive();
        checkMatchesForFour();
        checkMatchesForThree();
        document.getElementById("score").innerHTML= "Score: "+score;
        if(score>=goal){
            clearInterval(timer);
            const audio = new Audio('../music/Victory.mp3');
            audio.play();
            alert("You win!");
            lbButton.style.opacity=1;
            nextLevelButton.style.opacity=1;
            lbButton.style.zIndex=2;
            nextLevelButton.style.zIndex=2;
            grid.style.zIndex=0;
            grid.style.opacity=0;
        }
    },100);

});
