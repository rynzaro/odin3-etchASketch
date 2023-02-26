SIZE = 500;
PIXEL_PER_ROW = 16;
INITIAL_COLOR = "white";
BACKGROUND_COLOR = "lightgrey";
ACTIVE_COLOR = "lightyellow";
var PIXELS = [];
var ENABLE_DRAW = false;
var CURRENT_COLOR = "black";
var CURRENT_MODE = "color";

document.addEventListener('DOMContentLoaded', function() {

    document.addEventListener('mousedown', () => ENABLE_DRAW = true);
    document.addEventListener('mouseup', () => ENABLE_DRAW = false);

    const containerGrid = document.querySelector('.container-grid');
    const resetButton = document.querySelector('.button-reset');
    const setColor = document.querySelector('[data-mode="color"]');
    const setColorful = document.querySelector('[data-mode="colorful"]');
    const setGrayscale = document.querySelector('[data-mode="grayscale"]')
    const setSize = document.querySelector('[data-setting="size"]');

    initGrid(containerGrid, PIXEL_PER_ROW);

    resetButton.addEventListener('click',() => resetGrid());
    setColor.addEventListener('click', () => setMode("color"));
    setColorful.addEventListener('click', () => setMode("colorful"));
    setGrayscale.addEventListener('click', () => setMode("grayscale"));
    setSize.addEventListener('click', () => setPixelPerRow(containerGrid));

    function createGrid(container, pixelPerRow) {
        const size = SIZE / pixelPerRow;

        for (let i = 0; i < pixelPerRow; i++) {
            const row = document.createElement('div');
            for (let j = 0; j < pixelPerRow; j++) {
                var pixel = document.createElement('div');
                pixel.style.backgroundColor = INITIAL_COLOR;
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
        if (CURRENT_MODE === "colorful") {
            const red = Math.floor(Math.random() *255);
            const green = Math.floor(Math.random() *255); 
            const blue = Math.floor(Math.random() *255); 
            pixel.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
        } else {
            pixel.style.backgroundColor = CURRENT_COLOR;
            console.log(pixel.style.backgroundColor);
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
        CURRENT_COLOR = color;
    }

    function setMode(mode) {
        const oldActiveButton = document.querySelector(`[data-mode=${CURRENT_MODE}]`);
        oldActiveButton.classList.toggle('btn-active');
        const activeButton = document.querySelector(`[data-mode=${mode}]`)
        activeButton.classList.toggle('btn-active');
        CURRENT_MODE = mode;
    }

    function initGrid(container, pixelPerRow) {
        PIXELS = []
        createGrid(container, pixelPerRow);
        setPixelListener();
        setPenColor(CURRENT_COLOR);
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
            pixel.style.backgroundColor = INITIAL_COLOR;
        })
    }    
});