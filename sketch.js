var dog,happyDog,database,foodStock;
var foodRemaining=0;

function preload()
{
  dog=loadImage("dogImg.png");
  happyDog=loadImage("dogImg1.png");
}

function setup() {
	createCanvas(500,500);
  
  database=firebase.database();

  if (keyWentDown(UP_ARROW)){
    writeStocks(foodStock);
    dog.addimage(happyDog);
  }

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() { 
  background("green");
  image(dog,300,250,150,150);

  drawSprites();
  
  textSize(15);
  fill("white");
  text("Note: Press Up Arrow key to feed milk to Bruno",100,50);
  text("Food Remaining: ",100,150);

}

function readStock(data){
foodStock=data.val();
}

function writeStocks(x) {
  if(x<=0){
    x=0;
  }
  else {
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}

