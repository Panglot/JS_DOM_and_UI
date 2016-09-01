// (function () {
//     // This is a way to preload your images if you want to.
//     var img1 = document.createElement("img");
//     img1.src = "squirrel.jpg";
// })()

window.onload = function () {

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext("2d");
    canvas.width = 1000;
    canvas.height = 850;
    canvas.style.border = "1px solid black";

    ctx.fillStyle = "#923"; // Color of the fill when you fill
    ctx.fillRect(20, 20, 40, 40);

    ctx.fillStyle = "#083";
    ctx.fillRect(120, 120, 40, 40);

    ctx.strokeStyle = "#299"; // Color of the border
    ctx.lineWidth = 5; // Border width
    ctx.strokeRect(10, 10, 300, 300); // Stroke draws only the border of things

    ctx.beginPath();//Starts a new figure
    ctx.moveTo(350, 100); // Start coordinates of figure
    ctx.lineTo(500, 50); // A line from the start to these coordinates. The line wont draw untill stroke() method is used.
    ctx.lineTo(500, 150); // Another line starting form the end of the previous
    ctx.lineTo(600, 100);
    ctx.closePath(); // Closes the figure (draws a line from the end of the last one to the start of the first one.
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#222";
    ctx.stroke(); // Draws the figure defined by the above operations

    ctx.beginPath(); // Needs to be used, because the new lines will start fromt he end of the last one otherwise.
    ctx.moveTo(350, 200);
    ctx.lineTo(500, 150);
    ctx.lineTo(500, 250);
    ctx.lineTo(600, 200);
    ctx.closePath();
    ctx.lineWidth = 0;
    ctx.fillStyle = "#597";
    ctx.fill(); // Fills the figure from the inside. Even if the path isnt closed, it clsoes it and fills it.


    ctx.beginPath();
    ctx.lineWidth = 5;
    // Draws a circle. Arguments 1 and 2 are the center coordinates.
    // 3 is the radius. 4 and 5 work in radians. Basically Math.PI is
    // 180 degrees. 4 is the start of the arc, 5 is where it ends.
    // It always starts at X  = 0;
    // In this case Math.PI/2 means it will start 90 degrees off from
    // X = 0 and Math.PI will end in 180 degrees from X = 0;
    // Argument 6 is if it should draw clockwise or counterclockwise.
    // The catch is that the start will move 90 degrees from X  always clockwise
    // the end is also like this. Only the drawing will be counterclockwise.
    // This means that in this case the arc will be completely different depending
    // On the drawing direction. The default is false.
    ctx.arc(750, 100, 100, Math.PI/2, Math.PI, false);
    ctx.stroke();
    ctx.fill(); // Even Though its a circle it always closes it with straight line

    ctx.beginPath();
    // Much more adequate way is to use this formula
    // degrees * PI / 180. In this case 138*Math.PI/180 moves the end
    // To the 138th degree and then it draws from 0 to 138th clockwise.
    ctx.arc(800,70, 100, 0, 138*Math.PI/180);
    ctx.stroke();

    var i = 49;
    var sign = -3; // The speed that its mouth will move
    // setInterval is loop alike, but refreshes once every few seconds. Its endless loop that will
    // not crash the browser because it doesnt refresh as fast as possible.
    // Setup variables that change and you have animation with FPS.
    setInterval(function () {
        ctx.beginPath();
        // Clears the background because the drawn images remain if not done. We will draw on top of it otherwise.
        ctx.clearRect(8, 338, 170,170);
        ctx.fillStyle = "#000";
        ctx.fillRect(8, 338, 170,170); // A rectangle for better font of the yellow packman.
        // Simple pacman. 50 offset from start and end. Overall 100 degrees open.
        // We change the offset with i to make its mouth move.
        ctx.arc(90, 420, 80, i*Math.PI/180, (360-i)*Math.PI/180);
        // Draw a line to the center.
        ctx.lineTo(85,420);
        ctx.closePath(); // Close with line from the center to the end.
        ctx.fillStyle = "yellow";
        ctx.lineWidth = 1;
        ctx.fill(); // First fill then stroke makes better border. OTherwise it draws
        // the fill on top of the border and things clip bad.

        // The ifs change the direction of the offset so the packman will open his mouth to a certain
        // extend and when it reaches it, it will start closing it and the opposite. When it reaches 0
        // it will start opening its mouth again.
        if(i<=0 || i >=50) { sign *= -1;}
        i+=sign;

    }, 16); // These are milliseconds. 1000 ms = 1 second. 64 frames per second = 1000ms/64 = 15.something
    // about 16. Try to keep the framerate about 60 or 16 ms update.

    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.moveTo(30, 570);
    ctx.quadraticCurveTo(90, 720, 150, 570);
    ctx.stroke();

    // Says that the lane afterwards will be dashed.
    // It takes array. The first is the width of dashes, the second is the
    // width of empty spaces.
    ctx.setLineDash([5, 3]);
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(20, 550);
    ctx.lineTo(90, 720);
    ctx.lineTo(160, 550);
    ctx.moveTo(35, 647);
    ctx.lineTo(143,647);
    ctx.stroke();
    // All this was for visual representation of how quadratic curve works.

    ctx.setLineDash([]); // The line dash needs to reset if you want to stop it. Empty array works.
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.moveTo(190, 430);
    // Much math. Many calculations. I dont like. It has lines and tangents
    // of these lines and it draws the curves according to the tangents.
    ctx.bezierCurveTo(290, 300, 300, 400, 400, 400);
    ctx.bezierCurveTo(400, 300, 388, 270, 650, 350);
    ctx.stroke();

    // To draw image we first need to create image node. We can do it with
    // document.createElement("img") or new Image(). Then we set the src.
    var squirrel = document.createElement("img");
    squirrel.src = "squirrel.jpg";
    // We need to preload the image beforehand or attach the draw method to
    // the onload even of the image for this to work. Otherwise the page loads
    // before the image and we cant draw it since it doest exist yet.
    squirrel.onload = function () {
        // Argument 1 source. Argument 2 - 5 are for cropping.
        // 2, 3 are x and y of the crop. 4 - 5 are widh and height
        // of the crop. 6 - 9 are the image draw. 6, 7 are x and y
        // of canvas to draw on. 8, 9 are width and height of the image.
        ctx.drawImage(squirrel, 490, 170, 120, 120, 690, 300, 200, 200);
        // The image can be drawn only with 3 arguments. The image node and X and Y
        // and it will keep its resolution. It can be drawn with 5 arguments as well.
        // The node, X and Y and the width and height (resize) of the image.
    }

    ctx.font = '80px "Monotype Corsiva"';// Fonts with more than one word should be in quotes.
    ctx.fillText("Filled text", 200, 500);
    ctx.strokeStyle = "magenta"; // We still need to change the styles of choke and fill
    ctx.strokeText("Outlined text", 200, 580);



}