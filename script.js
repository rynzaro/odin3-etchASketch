SIZE = 20;
ROWS = 16;
COLUMNS = 16;
INITIAL_COLOR = "lightblue";
ACTIVE_COLOR = "lightyellow";
var PIXELS = [];
var ENABLE_DRAW = false;
var CURRENT_COLOR = "black";

document.addEventListener('DOMContentLoaded', function() {

    document.addEventListener('mousedown', () => ENABLE_DRAW = true);
    document.addEventListener('mouseup', () => ENABLE_DRAW = false);

    const containerGrid = document.querySelector('.container-grid');
    const resetButton = document.querySelector('.button-reset');
    const setBlack = document.querySelector('[data-color="black"]');
    const setRed = document.querySelector('[data-color="red"]');
    const setYellow = document.querySelector('[data-color="yellow"]');
    const setBlue = document.querySelector('[data-color="blue"]');

    createGrid(containerGrid);
    setPixelListener();
    setColor(CURRENT_COLOR);

    resetButton.addEventListener('click',() => resetGrid());
    setBlack.addEventListener('click', () => setColor("black"));
    setRed.addEventListener('click', () => setColor("red"));
    setYellow.addEventListener('click', () => setColor("yellow"));
    setBlue.addEventListener('click', () => setColor("blue"));
    
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

// sets the pixel listener
function setPixelListener() {
    PIXELS.forEach((pixel) => {
        pixel.addEventListener('mouseover', (event) => {
            if (ENABLE_DRAW) {
                pixel.style.backgroundColor = CURRENT_COLOR;
            }
        })
    })
}

// Will set the color in which to be drawn
function setColor(color) {
    const oldColorButton = document.querySelector(`[data-color=${CURRENT_COLOR}]`);
    oldColorButton.style.backgroundColor = INITIAL_COLOR;
    const activeColorButton = document.querySelector(`[data-color=${color}]`)
    activeColorButton.style.backgroundColor = ACTIVE_COLOR; 
    CURRENT_COLOR = color;
}

