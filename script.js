SIZE = 500;
PIXEL_PER_ROW = 16;
GRID_BACKGROUND_COLOR = "white";
BACKGROUND_COLOR = "lightgrey";
ACTIVE_COLOR = "lightyellow";
var PIXELS = [];
var BACKGROUND_PIXELS;
var ENABLE_DRAW = false;
var PEN_COLOR = "black";
var CURRENT_MODE = "color";

document.addEventListener('DOMContentLoaded', function() {

    document.addEventListener('mousedown', () => ENABLE_DRAW = true);
    document.addEventListener('mouseup', () => ENABLE_DRAW = false);

    const containerGrid = document.querySelector('.container-grid');
    const resetButton = document.querySelector('.button-reset');
    const setColor = document.querySelector('[data-mode="color"]');
    const setColorful = document.querySelector('[data-mode="colorful"]');
    const setEraser = document.querySelector('[data-mode="erase"]');
    const setSize = document.querySelector('[data-setting="size"]');
    const colorInput = document.querySelector('.color-select');

    colorInput.value = PEN_COLOR;
    initGrid(containerGrid, PIXEL_PER_ROW);

    resetButton.addEventListener('click',() => resetGrid());
    setColor.addEventListener('click', (event) => setMode(event.target.getAttribute("data-mode")));
    setColorful.addEventListener('click', (event) => setMode(event.target.getAttribute("data-mode")));
    setEraser.addEventListener('click', (event) => setMode(event.target.getAttribute("data-mode")));
    setSize.addEventListener('click', () => setPixelPerRow(containerGrid));
    colorInput.addEventListener('input', () => setPenColor(colorInput.value));
    
    function createGrid(container, pixelPerRow) {
        const size = SIZE / pixelPerRow;

        for (let i = 0; i < pixelPerRow; i++) {
            const row = document.createElement('div');
            for (let j = 0; j < pixelPerRow; j++) {
                var pixel = document.createElement('div');
                pixel.style.backgroundColor = GRID_BACKGROUND_COLOR;
                pixel.style.height = `${size}px`;
                pixel.style.width = `${size}px`;
                pixel.style.border = `1px grey solid`;
                pixel.style.boxSizing = `border-box`;
                PIXELS.push(pixel);
                row.appendChild(pixel);
            }
            container.appendChild(row);
        }
    }

    function stylePixel(pixel) {
        if (CURRENT_MODE === "color" || CURRENT_MODE === "erase") {
            pixel.style.backgroundColor = PEN_COLOR;
        } else {
            const red = Math.floor(Math.random()*255);
            const green = Math.floor(Math.random()*255); 
            const blue = Math.floor(Math.random()*255); 
            pixel.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
        }
    }

    function setPixelListener() {
        PIXELS.forEach((pixel) => {
            pixel.addEventListener('mouseover', (event) => {
                if (ENABLE_DRAW) {
                    stylePixel(pixel);
                }
            })
            pixel.addEventListener('mousedown', (event) => {
                stylePixel(pixel);
            })
        })
    }

    function setPenColor(color) {
        PEN_COLOR = color;
    }

    function setMode(mode) {
        const oldActiveButton = document.querySelector(`[data-mode=${CURRENT_MODE}]`);
        oldActiveButton.classList.toggle('btn-active');
        const activeButton = document.querySelector(`[data-mode=${mode}]`)
        activeButton.classList.toggle('btn-active');

        if (mode === "erase") {
            setPenColor(GRID_BACKGROUND_COLOR);
        } if (mode === "color") {
            setPenColor(colorInput.value);
        }

        CURRENT_MODE = mode;
    }

    function initGrid(container, pixelPerRow) {
        PIXELS = []
        createGrid(container, pixelPerRow);
        setPixelListener();
        setMode(CURRENT_MODE);
    }

    function clearDiv(element) {
        while (element.hasChildNodes()) {
            element.removeChild(element.firstChild);
        }
    }

    function setPixelPerRow(container) {
        do{
            var pixelPerRow = parseInt(window.prompt("Please enter a number from 1 to 100", ""), 10);
        }while(isNaN(pixelPerRow) || pixelPerRow > 100 || pixelPerRow < 1);
        clearDiv(container);
        initGrid(container, pixelPerRow);
    }

    function resetGrid() {
        PIXELS.forEach((pixel) => {
            pixel.style.backgroundColor = GRID_BACKGROUND_COLOR;
        })
    }    
});