
// 
// main
//
/*
 * Example how to use it *
 */
```typescript
function main(){
    // Create Button to start the animation
    let button = document.createElement("button");
    button.textContent = "animate";
    button.style.backgroundColor = "blue";
    button.style.color = "white";
    button.style.borderRadius = "3px";
    button.style.border = "solid white 1px";
    
    //initialize a frame Array to get all of then
    var frames = [];
    
    // 60 frames per 5 seconds = 5*60
    for(var i=1;i<(60*5);i++){
        
        // Append a new Point(x,y, color, size) per frame
        var _point = new Point(i, 50, "black", 22);
        frames.push(new Frame([_point]));
    }
    // Create a new Canvas intance
    let canvas = new Canvas('area', 500, 500);
    
    // Create a new Canvas Animation 2D, for the animation
    let animationCanvas = new CanvasAnimation2D('area', frames); //CanvasAnimation2D(canvasId, frames)
    
    // Button on click, do function =>
    button.onclick = function(){
            // for every frame, give 5 milliseconds
            animationCanvas.play(5);
    };
    
    // Create the canvas on the DOM(HTML page ative)
    canvas.create();
    
    // Create the button on the DOM(HTML page ative(again...))
    document.body.appendChild(button);
}


//=>
main();
```