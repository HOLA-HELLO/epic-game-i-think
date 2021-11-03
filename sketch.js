var titanic, titanicAnimation,titanicSinkingAnimation,titanicQuieto;
var iceberg, icebergIMG, icebergWasapGroup;
var ocean, oceanAnimation;
var titanicFog, titanicFogImg;
var borde1,borde2;
var gameOver,gameOverIMG;
var score =0;
var play = 1;
var end = 2;
var win = 0;
var gameState = play;

function preload(){

    titanicAnimation = loadAnimation("Imagenes/Titanic2.gif",
    "Imagenes/Titanic3.gif","Imagenes/Titanic4.gif","Imagenes/Titanic5.gif",
    "Imagenes/Titanic6.gif","Imagenes/Titanic7.gif","Imagenes/Titanic8.gif",
    "Imagenes/Titanic9.gif","Imagenes/Titanic10.gif",
    "Imagenes/Titanic11.gif","Imagenes/Titanic12.gif","Imagenes/Titanic13.gif",
    "Imagenes/Titanic14.gif","Imagenes/Titanic15.gif","Imagenes/Titanic16.gif",
    "Imagenes/Titanic17.gif","Imagenes/Titanic18.gif","Imagenes/Titanic19.gif",
    "Imagenes/Titanic20.gif","Imagenes/Titanic21.gif","Imagenes/Titanic22.gif",
    "Imagenes/Titanic23.gif");

    titanicSinkingAnimation = loadAnimation("Imagenes/TitanicSink0001.gif","Imagenes/TitanicSink0002.gif","Imagenes/TitanicSink0003.gif",
    "Imagenes/TitanicSink0004.gif","Imagenes/TitanicSink0005.gif","Imagenes/TitanicSink0006.gif",
    "Imagenes/TitanicSink0007.gif","Imagenes/TitanicSink0008.gif",
    "Imagenes/TitanicSink0009.gif","Imagenes/TitanicSink0010.gif","Imagenes/TitanicSink0011.gif",
    "Imagenes/TitanicSink0012.gif","Imagenes/TitanicSink0013.gif",
    "Imagenes/TitanicSink0014.gif","Imagenes/TitanicSink0015.gif","Imagenes/TitanicSink0016.gif",
    "Imagenes/TitanicSink0017.gif","Imagenes/TitanicSink0018.gif",
    "Imagenes/TitanicSink0019.gif","Imagenes/TitanicSink0020.gif","Imagenes/TitanicSink0021.gif",
    "Imagenes/TitanicSink0022.gif","Imagenes/TitanicSink0023.gif",
    "Imagenes/TitanicSink0024.gif","Imagenes/TitanicSink0025.gif","Imagenes/TitanicSink0026.gif",
    "Imagenes/TitanicSink0027.gif","Imagenes/TitanicSink0028.gif",
    "Imagenes/TitanicSink0029.gif","Imagenes/TitanicSink0030.gif","Imagenes/TitanicSink0031.gif",
    "Imagenes/TitanicSink0032.gif");

    titanicQuieto = loadAnimation("Imagenes/TitanicSink0022.gif");
    gameOverIMG = loadImage("Imagenes/GAMEOVER.png");
    icebergIMG = loadImage("Imagenes/iceberg.png");
    
}

function setup(){
    createCanvas(1000,1000);

   // ocean = createSprite(500,500,1000,1000);
   // ocean.shapeColor = (26,26,232);

    titanic = createSprite(500,800,10,10);
    titanic.debug = true;
    titanic.setCollider("rectangle",-10,-10,300,30);
    titanic.addAnimation("Titanic",titanicAnimation);
    titanic.addAnimation("quieto",titanicQuieto);
    titanic.addAnimation("titanicSinkingAnimation",titanicSinkingAnimation);

    borde1 = createSprite(500,10,1000,10);
    borde1.visible = false;
    borde2 = createSprite(500,990,1000,10);
    borde2.visible = false;

    gameOver = createSprite(500,500,10,10);
    gameOver.addImage("GAMEOVERIMG",gameOverIMG);
    gameOver.visible = false;

    icebergWasapGroup = new Group();

}

function draw(){
    background(0,0,102);
    if(gameState == play){
        //ocean.velocityY = (0.1);
        score = score+Math.round(getFrameRate()/60);
        //TITANIC MOVIMIENTO
        if(keyDown("S")||keyDown("down")){

            titanic.y= titanic.y +2.5;
        
        }

        if(keyDown("W")||keyDown("up")){

            titanic.y = titanic.y -2.5;
        
        }

        if(score == 2000){

            gameState = win;

        }

        iceberSpawn();

        titanic.collide(borde1);
        titanic.collide(borde2);

        if(icebergWasapGroup.isTouching(titanic)){

            icebergWasapGroup.setVelocityXEach(0);
            
            gameState = end;

        }

    

        fill ("white");
        text("Score "+score,500,50);

    }else if(gameState == end){
        //for(i=0;i<10 ;i++){ }
        icebergWasapGroup.setVelocityXEach(0);
        titanic.changeAnimation("titanicSinkingAnimation",titanicSinkingAnimation);
        titanic.changeAnimation("quieto",titanicQuieto);
        //iceberg.lifetime = 1000000000000000000000000000000000000000000000;
        console.log("tocando un atomo del titanic");
        gameOver.visible = true;

    }else if(gameState == win){

        titanic.x = 500;
        titanic.y = 500;

    }

    drawSprites();
}

function iceberSpawn(){
    if(frameCount % 60 == 0){
        iceberg = createSprite(1100,100,50,20);
        iceberg.addImage("ICEBERG",icebergIMG);
        iceberg.scale = random(0.1, 2)
        iceberg.shapeColor = "withe";
        iceberg.y= random(100,1000);
        iceberg.velocityX = -2;
        iceberg.velocityX = -(6+score/100);
        iceberg.lifetime = 210;

        icebergWasapGroup.add(iceberg)
    }



}