SIZE = 20;
ROWS = 16;
COLUMNS = 16;
INITIAL_COLOR = "lightblue";
var PIXELS = [];
var ENABLE_DRAW = false;

document.addEventListener('DOMContentLoaded', function() {

    document.addEventListener('mousedown', () => ENABLE_DRAW = true);
    document.addEventListener('mouseup', () => ENABLE_DRAW = false);

    const containerGrid = document.querySelector('.container-grid');
    const resetButton = document.querySelector('.button-reset');
    resetButton.addEventListener('click',() => resetGrid());
    createGrid(containerGrid);
    setOnClick("black");

});

function createGrid(container) {
    for (let i = 0; i < COLUMNS; i++) {
        const row = document.createElement('div');
        row.style.display = "flex";

        for (let j = 0; j < ROWS; j++) {
            var element = document.createElement('div');
            element.style.backgroundColor = INITIAL_COLOR;
            element.style.height = `${SIZE}px`
            element.style.width = `${SIZE}px`
            row.appendChild(element);
            PIXELS.push(element);
        }
        container.appendChild(row);
    }
    console.log(PIXELS);
}

// will reset the grid to the initial color
function resetGrid() {
    PIXELS.forEach((pixel) => {
        pixel.style.backgroundColor = INITIAL_COLOR;
    })
}

// Will set the color in which to be drawn
function setOnClick(color) {
    PIXELS.forEach((pixel) => {
        pixel.addEventListener('mouseover', (event) => {
            if (ENABLE_DRAW) {
                pixel.style.backgroundColor = color;
            }
        })
    })
}

