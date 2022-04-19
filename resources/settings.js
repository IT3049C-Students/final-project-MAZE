let form = document.querySelector("#controls");
let size = document.querySelector("#size");
let rowsCols = document.querySelector("#number");
let complete = document.querySelector(".after");
let replay = document.querySelector("#replay");
let close = document.querySelector(".quit");

let newMaze;

form.addEventListener("submit", generateMaze);
document.addEventListener("keydown", move);
replay.addEventListener("click", () => {
    location.reload();
});

close.addEventListener("click", () => {
    complete.style.display = "none";
});

function generateMaze(e) {
    e.preventDefault();

    if (rowsCols.value == "" || size.value == "") {
        return alert("The Crypt can't be built without everything!");
    }

    let mazeSize = size.value;
    let number = rowsCols.value;
    if (mazeSize > 600 || number > 50) {
        alert("This Crypt would be too big for you!");
        return;
    }

    form.style.display = "none";

    newMaze = new Maze(mazeSize, number, number);
    newMaze.setup();
    newMaze.draw();
}

function move(e) {
    if (!generationComplete) return;
    let key = e.key;
    let row = current.rowNum;
    let col = current.colNum;

    switch (key) {
        case "ArrowUp":
            if (!current.walls.topWall) {
                let next = newMaze.grid[row - 1][col];
                current = next;
                newMaze.draw();
                current.highlight(newMaze.columns);
            }
            break;

        case "ArrowDown":
            if (!current.walls.bottomWall) {
                let next = newMaze.grid[row + 1][col];
                current = next;
                newMaze.draw();
                current.highlight(newMaze.columns);
                if (current.goal) complete.style.display = "block";
            }
            break;
        
        case "ArrowLeft":
            if (!current.walls.leftWall) {
                let next = newMaze.grid[row][col - 1];
                current = next;
                newMaze.draw();
                current.highlight(newMaze.columns);
            }
            break;

        case "ArrowRight":
            if (!current.walls.rightWall) {
                let next = newMaze.grid[row][col + 1];
                current = next;
                newMaze.draw();
                current.highlight(newMaze.columns);
                if (current.goal) complete.style.display = "block";
            }
            break;
    }
}