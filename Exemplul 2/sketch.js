let lifetime; 

let population; 

let lifecycle; 
let recordtime;

let target;

let diam = 24;          
let temp; 
let display_temp;

let obstacles = [];

let popmax;
let started;
let mutationRate;
let exist=false;

function isOverlap(ax0, ay0, ax1, ay1,  bx0,  by0,  bx1, by1){
    let topA =  Math.min(ay0, ay1);
    let botA =  Math.max(ay0, ay1);
    let leftA =  Math.min(ax0, ax1);
    let rightA =  Math.max(ax0, ax1);
    let topB =  Math.min(by0, by1);
    let botB =  Math.max(by0, by1);
    let leftB =  Math.min(bx0, bx1);
    let rightB =  Math.max(bx0, bx1);
    if(botA <= topB  || botB <= topA || rightA <= leftB || rightB <= leftA)
        return false;
    return true;   
}
   
function checkStarted()
{
	
	if(!exist)
	{	
		lifecycle = 0;
		lifetime=Number(document.getElementById("timp").value);
		recordtime = lifetime;
		exist=true;
		diam=Number(document.getElementById("d").value);
		mutationRate=Number(document.getElementById("rm").value)
		popmax=Number(document.getElementById("popmax").value);  
		target.w=diam;
		target.h=diam;
		population = new Population(mutationRate, popmax);
	}
	if(started==true)
	{
		started=false;
		document.getElementById("buton").innerHTML="Rezumă";
	}
	else if(started==false)
	{
		started=true;
		document.getElementById("buton").innerHTML="Pauză";
	}
}

function restart()
{
	exist=false;
	started=false;
	document.getElementById("buton").innerHTML="Start";	
}

function setup() 
{
  createCanvas(windowWidth -10, windowHeight -99);
  target = new Obstacle(width / 2 - 12, diam, diam, diam);
  lifetime=500;
  started=false;   
  lifecycle = 0;
  recordtime = lifetime;  
  mutationRate = 0.01;
  num=0;
  obstacles = [];
}

function draw() 
{
  background(255); 
 
  
if(exist)
{
if(started)
{ 
  if (lifecycle < lifetime) 
  {
    population.live(obstacles);
    if ((population.targetReached()) && (lifecycle < recordtime)) 
	{
      recordtime = lifecycle;
    }
    lifecycle++;   
  } 
  else 
  {	    
    lifecycle = 0;
    population.calcFitness();
    population.selection();
    population.reproduction();
  }
}
else
	population.display();  
  fill(0);
  noStroke(); 
  text("Generația #: " + population.getGenerations(), 0,height - 36);
  text("Timp rămas: " + (lifetime - lifecycle), 0, height -18);
  text("Timp record: " + recordtime, 0, height);
}
	if(target)
		target.display();
	for (let i = 0; i < obstacles.length; i++) 
	{
		obstacles[i].display();
	}
	if(temp && document.getElementById("Adaugă obstacol").checked==1)
		temp.display(); 
}


let ok=false;
let oldX,oldY;

function mousePressed() 
{ 
  if(mouseX> windowHeight - height && mouseY > windowWidth - width)
  {
    
	  if(document.getElementById("Mută ținta").checked==1)
	{	 
		target.position.x = mouseX-diam/2;
		target.position.y = mouseY-diam/2;
		recordtime = lifetime;
	}
	else if(document.getElementById("Adaugă obstacol").checked==1)
	{		
		if(ok==false)
		{
			oldX=mouseX;
			oldY=mouseY;
			ok=true;
		}		
	}
	else if(document.getElementById("Șterge obstacol").checked==1)
	{
		let point = createVector(mouseX, mouseY); 
		for (let i = 0; i < obstacles.length; i++) 
		{
			if(obstacles[i].contains(point))
			{
				obstacles.splice(i,i+1);
			}
		}
	}
  }
}

function mouseDragged()
{
	if(mouseX> windowHeight - height && mouseY > windowWidth - width)
	{
		if(document.getElementById("Adaugă obstacol").checked==1)
		{
	let overlap=false;
	for (let i = 0; i < obstacles.length; i++) 
	{
	if(isOverlap(obstacles[i].position.x,obstacles[i].position.y,obstacles[i].position.x+obstacles[i].w-1,obstacles[i].position.y+obstacles[i].h-1,oldX,oldY,mouseX,mouseY))
	{
		overlap=true;
	}
	}
	if(!overlap)
	{	
	if(oldX<mouseX&& oldY<mouseY)
	{
		temp = new Obstacle(oldX,oldY,mouseX-oldX, mouseY-oldY);		
	}
	else if(oldX>mouseX&& oldY<mouseY)
	{
		temp = new Obstacle(mouseX,oldY,oldX-mouseX, mouseY-oldY);
	}
	else if(oldX<mouseX&& oldY>mouseY)
	{
		temp = new Obstacle(oldX,mouseY,mouseX-oldX, oldY - mouseY);
	}
	else if(oldX>mouseX&& oldY>mouseY)
	{
		temp = new Obstacle(mouseX,mouseY,oldX-mouseX, oldY - mouseY);
	}	
	}
	else temp = undefined;
	
		}
	}
}

function mouseReleased()
{
	if(mouseX> windowHeight - height && mouseY > windowWidth - width)
	{
		if(document.getElementById("Adaugă obstacol").checked==1)
		{		
			let overlap=false;
			for (let i = 0; i < obstacles.length; i++) 
			{
				if(isOverlap(obstacles[i].position.x,obstacles[i].position.y,obstacles[i].position.x+obstacles[i].w-1,obstacles[i].position.y+obstacles[i].h-1,oldX,oldY,mouseX,mouseY))
				{
					overlap=true;
				}
			}
			if(!overlap)
			{

				obstacles.push(temp);
				ok=false;
				temp= undefined ;
				recordtime=lifitime;
			}
			else
			{
				ok=false;
			}
		}
	}
	else
	{
		ok=false;
	}
}