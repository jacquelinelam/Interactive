function setup() {
  // set the background size of our canvas
  createCanvas(800, 400);
  strokeWeight(3);

  // erase the background with a "grey" color
  background(51);

  // set all content drawn from this point forward
  // so that it uses "white" (0 = black, 255 = white)
  fill(255);

  // write some text at position 100,100
  textSize(13);
  textStyle(ITALIC);
  text("When the pursuit of natural harmony is a shared journey, great heights can be attained. - Lynn Hill", 50,50);

}

function draw(){
  // moutain 1
    // draw a triangle at x-position = 320, 680,490 & y position= 350,350,100
    strokeWeight(3);
    fill(19,41,64);
    triangle(320,350,680,350,490,100);
    /* draw quad as snow accumlated on top of mountains
    at x1,y1,x2,y2,x3,y3,x4,y4)*/
    strokeWeight(0);
    fill(225,225,225,150);
    quad(490,100,444,169,464,152,470,157);
    quad(490,100,470,158,504,142,532,160);
    strokeWeight(2);
    line(400,350,490,100);

  //mountain 2
    strokeWeight(3);
    fill(51,90,117);
    triangle(120,350,500,350,320,160);
    strokeWeight(0);
    fill(225,225,225,150);
    quad(320,160,300,224,291,205,250,227);
    quad(320,162,370,215,336,208,302,225);
    strokeWeight(2);
    line(260,350,320,160);

  //mountain 3
    strokeWeight(3);
    fill(46,107,147);
    triangle(600,350,750,350,675,200);
    strokeWeight(0);
    fill(225,225,225,150);
    quad(675,200,659,233,667,229,671,237);
    quad(675,200,673,238,683,232,691,239);
    strokeWeight(2);
    line(660,350,675,200);

  //mountain 4
    strokeWeight(3);
    fill(98,129,143);
    triangle(280,350,750,350,530,250);
    strokeWeight(0);
    fill(225,225,225,150);
    quad(530,250,459,280,518,265,566,279);
    quad(530,250,569,279,570,273,589,279);
    strokeWeight(2);
    line(670,350,530,250);

  /*draw an ellipse at 650,80, radius = 25
    with no stroke and smooth edges*/
    smooth();
    strokeWeight(0);
    fill(241,235,152,100);
    ellipse(650,80,25,25);

  // /* draw quad as snow accumlated on top of mountains
  // at x1,y1,x2,y2,x3,y3,x4,y4)
  // */
  // fill(225,225,225,150);
  // quad(320,160,300,224,291,205,250,227);
  // quad(320,162,370,215,336,208,302,225);
  // quad(490,100,444,169,464,152,470,157);
  // quad(490,100,470,158,504,142,532,160);
  // quad(530,250,459,280,518,265,566,279);
  // quad(530,250,569,279,570,273,589,279);
  // quad(675,200,659,233,667,229,671,237);
  // quad(675,200,673,238,683,232,691,239);


}
