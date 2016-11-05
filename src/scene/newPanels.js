import * as utility from "../core/utility.js";
import * as husl from "husl";
import wave from "../core/wave.js";
import * as timeKeeper from "../core/timeKeeper.js";
import SimplexNoise from "../core/simplexNoise.js";
import settings from "../settings.js";
import Panel from "./panel.js";
import GridLayout from "./gridLayout.js";

const NewPanels = class NewPanels {
    constructor(screen) {
        const panelCount = settings.panels.count;
        const width = screen.width;
        const height = screen.height;
        const margin = calculateMargin(width, height);
        const fieldWidth = margin.x2 - margin.x1;
        const fieldHeight = margin.y2 - margin.y1;
        const grid = makeGrid(panelCount, fieldWidth, fieldHeight);
        const panels = makePanels(panelCount, grid);
        this.screen = screen;
        this.margin = margin;
        this.grid = grid;
        this.panels = panels;
    }

    update() {

    }

    draw() {

    }
};

function calculateMargin(width, height) {
    const marginX = width * settings.panels.marginPercent;
    const marginY = height * settings.panels.marginPercent;
    const maxX = width - marginX;
    const maxY = height - marginY;
    return {
        x1: marginX,
        y1: marginY,
        x2: maxX,
        y2: maxY
    };
}

function makeGrid(panelCount, width, height) {
    const emptyGridPercent = settings.panels.emptyGridPercent;
    const approxCount = panelCount * (1 / (1 - emptyGridPercent));
    const result = new GridLayout(approxCount, width, height);
    return result;
}

function makePanels(count, grid) {
    const uniformPortion = Math.floor(count / 3);
    const randomPortion = count - uniformPortion;
    const result = [];
    const slice = 1 / uniformPortion;
    const offset = slice / 2;
    for(let i = 0; i < uniformPortion; i++) {
        const value = offset + slice * i;
        const panel = makeRandomPanel(value);
        result.push(panel);
    }
    for(let i = 0; i < randomPortion; i++) {
        const value = utility.randomNumber(0.01, 0.99);
        const panel = makeRandomPanel(value);
        result.push(panel);
    }
    result.sort((a,b) => b.seedValue - a.seedValue);
    return result;
}

function chooseRandomEmptyGridSpot(grid) {

}

function makeRandomPanel(seedValue, gridSpot) {
    const panel = new Panel();
    panel.seedValue = seedValue;
    return panel;
}

function calculatePanelTextures(panels) {

}

export default NewPanels;