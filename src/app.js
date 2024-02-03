import * as React from "react";
import {ReactP5Wrapper} from "@p5-wrapper/react";

function treeMachine(p5) {
    const depth = 10;
    const breadth = 2;
    let curl = Math.PI * .5;
    let spread = Math.PI * .5;

    const zoom = 100;
    const margin = 5;
    const windowWidth = window.innerWidth - margin;
    const windowHeight = window.innerHeight - margin;


    p5.setup = () => p5.createCanvas(windowWidth,windowHeight)

    function branch(d) {
        // Draw a line from (0, 0) to (0, 1)
        p5.line(0, 0, 0, 1)

        // If there are any more branch levels to be drawn...
        if (d > 1) {
            // Move the canvas to (0, 1), the end of our new line
            p5.translate(0, 1)

            // Rotate the canvas for each new branch
            p5.rotate(curl)

            // Zoom twice as far into the canvas
            p5.scale(.8)

            for (let i = 0; i < breadth; i++) {
                // Recurse for the next branch!
                branch(d - 1)

                // Rotate for the next branch!
                p5.rotate(spread)
            }

            // Undo the rotations we applied for each "child" branch
            p5.rotate(-spread * breadth)

            // Undo the curl rotation we applied to this branch
            p5.rotate(-curl)

            // Zoom back out from the canvas
            p5.scale(1.25)

            // Move back to the start of the line we drew with line(0, 0, 0, 1)
            p5.translate(0, -1)
        }
    }
    p5.draw = () => {
        curl = Math.PI * ((p5.mouseX / p5.width) * 2 - 1)
        spread = Math.PI * ((p5.mouseY / p5.height) * 2 - 1)
        // Draw a black background
        p5.background(0)

        // Set line color to white
        p5.stroke(255)

        // Move to middle-bottom of canvas
        p5.translate(windowWidth / 2, windowHeight)

        // Turn canvas 180°
        p5.rotate(Math.PI)

        // Zoom way into the canvas
        p5.scale(zoom)

        // Set thickness to a much smaller, zoomed-in value
        p5.strokeWeight(0.05)

        // Start drawing branches!
        branch(depth)
    }
}


export default function App() {
    return <ReactP5Wrapper sketch={treeMachine}/>;
}