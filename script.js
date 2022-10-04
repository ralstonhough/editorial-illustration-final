let man;
let clock;
let clockScroll = 0;
let manScroll = 1500;
let bounceAngle = 0;

function preload() {
  man = loadImage('falling-man.png');
  clock = loadImage('clocks.png');
};

function setup() {
    let cnv = createCanvas(700,466);
    cnv.position(innerWidth/4,0);
    background("black");
    translate(width / 2, height / 2);
    image(clock,0,0,10,10);
};

function draw() {
    translate(width / 2, height / 2);
    background("black");
    let bounceRad = radians(bounceAngle);

    push();
    rotate(-clockScroll/90);
    push();
    translate((cos(bounceRad)),(sin(bounceRad)));
    circleOfClocks(15, 0, 10);
    pop();
    push();
    translate((3*cos(bounceRad)),(3*sin(bounceRad)));
    circleOfClocks(35, 5, 20);
    pop();
    push();
    translate((5*cos(bounceRad)),(5*sin(bounceRad)));
    circleOfClocks(65, 10, 30);
    pop();
    push();
    translate((7*cos(bounceRad)),(7*sin(bounceRad)));
    circleOfClocks(115, 15, 60);
    pop();
    push();
    translate((8.5*cos(bounceRad)),(8.5*sin(bounceRad)));
    circleOfClocks(210, 20, 120);
    pop();
    push();
    translate((10*cos(bounceRad)),(10*sin(bounceRad)));
    circleOfClocks(400, 25, 240);
    pop();
    pop();
    
    push();
    imageMode(CORNER);
    rotate(-manScroll/75);
    image(man, 0, 0, manScroll, manScroll);
    pop();

    bounceAngle += 2;
};

function circleOfClocks(r, angle, size){
  for(let i=0; i<6; i++){
    let x = r * sin(angle);
    let y = r * cos(angle);
    imageMode(CENTER);
    image(clock, x, y, size, size);
        
    let clockRadius = size/2;
    let secondsRadius = clockRadius * 0.8;
    let minutesRadius = clockRadius * 0.7;
    let hoursRadius = clockRadius * 0.5;
    let clockDiameter = clockRadius * 1.7;
    let s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
    let m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
    let h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;
    
    stroke('red');
    strokeCap(PROJECT);
    strokeWeight(size/500);
    line(x, y, x + cos(s) * secondsRadius, y + sin(s) * secondsRadius);
    stroke(0);
    strokeWeight(size/75);
    line(x, y, x + cos(m) * minutesRadius, y + sin(m) * minutesRadius);
    strokeWeight(size/75);
    line(x, y, x + cos(h) * hoursRadius, y + sin(h) * hoursRadius);

    angle = angle + TWO_PI/6;
  };
};

function mouseWheel(event){
  print(event.delta);
  clockScroll += event.delta;
  if (manScroll > 0){
    manScroll -= (event.delta);
    return false;
  }
    else {
      manScroll = 0;
      return true;
    }
};

//Sin-based math for floating animation inspired
//by Sharvari Raut at blog.logrocket.com