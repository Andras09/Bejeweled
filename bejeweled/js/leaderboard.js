document.addEventListener("DOMContentLoaded",()=>{
    //creating the table
    const tableContainer = document.getElementById('lboard');
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    const nameHeader = document.createElement('th');
    nameHeader.textContent = 'Levels cleared';
    headerRow.appendChild(nameHeader);
    const scoreHeader = document.createElement('th');
    scoreHeader.textContent = 'Name';
    headerRow.appendChild(scoreHeader);
    table.appendChild(headerRow);
    let data = [[1, 'Dummy'],[999999999, 'Admin']];

    //adding new record
    let levelsCleared=0;
    if(localStorage.getItem("levelCounter")!==null){
        levelsCleared=localStorage.getItem("levelCounter");
    }

    let name="dummy";

    let submit=document.getElementById("submit");
    submit.addEventListener("click",()=>{
        if(document.getElementById("textField").value!=="" &&document.getElementById("textField").value!==null){
            name = document.getElementById("textField").value;
        }
        if(localStorage.getItem("leaderboard")===null){
            localStorage.setItem("leaderboard",JSON.stringify(data));
        }
        else if(localStorage.getItem("leaderboard")!==null){
            data=JSON.parse(localStorage.getItem("leaderboard"));
            data.push([levelsCleared,name]);
            data.sort();
            data.reverse();
            localStorage.setItem("leaderboard",JSON.stringify(data));
            data.forEach((row) => {
                const dataRow = document.createElement('tr');

                row.forEach((cellData) => {
                    const cell = document.createElement('td');
                    cell.textContent = cellData;
                    dataRow.appendChild(cell);
                });

                table.appendChild(dataRow);
            });
            tableContainer.appendChild(table);
        }
    });
});
