let form = document.getElementById("#controls");
let size = document.getElementById("#size");
let rowsCols = document.getElementById("#number");
let complete = document.getElementById(".after");
let replay = document.getElementById(".play-again");
let close = document.getElementById(".quit");

let newMaze;

form.addEventListener("submit", generateMaze);
document.addEventListener("keydown", move);
replay.addEventListener("click", () => {
    location.reload();
});

close.addEventListener("click", () => {
    complete.style.display = "none";
})

function generateMaze(e) {
    e.preventDefault();

    if (rowsCols.value == "" || size.value == "") {
        return alert("Please fill everything out");
    }

    let mazeSize = size.value;
    let number = rowsCols.value;
    if (mazeSize > 600 || number > 50) {
        alert("Too big try again");
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
                if (current.goal) complete.style.display = "block";
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
                if (current.goal) complete.style.display = "block";
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
    }
}