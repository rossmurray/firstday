import * as mainLoop from "mainloop.js";
import * as husl from "husl";
import * as utility from "./core/utility.js";
import settings from "./settings.js";
import Screen from "./core/screen.js";
import Scene from "./scene/scene.js";

var scene;
var screen;

function main() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = width;
    canvas.height = height;

    screen = new Screen(canvas, context);
    scene = new Scene();
    mainLoop.setUpdate(mainUpdate);
    mainLoop.setDraw(mainDraw);
    mainLoop.setEnd(mainEnd);
    mainLoop.start();
}

function mainUpdate(deltaMs) {
    scene.update();
}

function mainDraw(interpolationPercentage) {
    screen.resize();
    screen.clear(settings.bgColor);

    scene.draw(screen);
}

function mainEnd(fps, panic) {
    if(panic) {
        var discardedTime = Math.round(mainLoop.resetFrameDelta());
        console.warn('Main loop panicked, probably because the browser tab was put in the background. Discarding ' + discardedTime + 'ms');
    }
}

main();