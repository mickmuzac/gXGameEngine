var UP = 0;
var RIGHT = 1;
var DOWN = 2;
var LEFT = 3;

//Leaving this value extremely small until further updates
var framesPerSecond = 1/500;

//
var donec = 0;
var physics = new Collision();
physics.enableCollisions(true);
var input = new Input();
var graphics = new Graphics();
graphics.isReady = function(val){
	
		graphics.numReady++;
		//alert(graphics.numReady + " " + graphics.max);
		if(graphics.numReady >= graphics.max && graphics.isLoaded == true){
			graphics.done();
		}
}
document.onkeydown = 
	function(event){
		var key = input.getKey(event);
		//user function here
	}

//	
	
function Graphics(){
	var globalXOffset = 0;
	var globalYOffset = 0;
	var all = new Array();
	this.id = -1;
	this.numReady = 0;
	this.done;
	this.max = 0;
	this.isLoaded = false;
	//Parameter MUST be an array.
	this.register = function(maps, val){
	
		this.done = val;
		this.id += maps.length;
		this.max = maps.length;
		all = maps;
		for(var g = 0; g <= this.id; g++){
		
			all[g].load();
		}
		this.isLoaded = true;	
		if(this.numReady == this.max)
			graphics.isReady();
			
	}

	this.mainAdjust = function(x, y){
		globalXOffset += x;
		globalYOffset += y;
		for(var g = 0; g <= this.id; g++){
		
			all[g].adjust(globalXOffset, globalYOffset);
		}
	}
	
	this.renewAll = function(){
		for(var g = 0; g <= this.id; g++){
		
			all[g].renewMap();
		}
	}
	
	this.display = function(){
		this.renewAll();	
		for(var g = 0; g <= this.id; g++){
		
			all[g].display();
		}
	}
	
}

function SpriteMap(img, locX, locY, column, row, xTimes, yTimes){
	
	var tempLocX = locX;
	var tempLocY = locY;
	var tempColumn = column;
	var tempRow = row;
	var readyDisp = 0;
	var id = -1;
	var tempTimes = xTimes;
	var tempYtimes = yTimes;
	var saveSrc = img;
	var saveInstances = new Array();
	var sWidth = 0;
	var sHeight = 0;
	var tempImg = new Image();
	
	//x is the start of the column image, while y is the start of the row image. (0,0) is the top left image.
	this.createSprite = function(x, y, instance, overX, overY){
	
		var xOffset = tempTimes * x * sWidth;
		var yOffset = tempYtimes * y * sHeight;
		
		if(overX == undefined) overX = locX;
		if(overY == undefined) overY = locY;
		id++;
		//alert(sWidth + " " + img);
		saveInstances[id] = new Sprite(saveSrc, overX, overY, sWidth, sHeight, xOffset, yOffset, tempTimes, instance);
		return saveInstances[id];
	}
	
	this.renewMap = function(){
		
		for(var g = 0; g <= id; g++){
			saveInstances[g].renew();	
		}
	}
	
	this.adjust = function(offsetX, offsetY){

		for(var g = 0; g <= id; g++){
			saveInstances[g].adjust(offsetX, offsetY);	
		}
	}
	
	this.display = function(){

		for(var g = 0; g <= id; g++){
			saveInstances[g].display();	
		}
	}
	
	this.load = function(){
		
		tempImg.onload = graphics.isReady();
		tempImg.src = img;
		
		sWidth = Math.floor(tempImg.width/column);
		sHeight = Math.floor(tempImg.height/row);
		//alert(sWidth + " load " + img);
		tempImg = null;
	}
}

function Item(img, locX, locY, instance){

	var get = function(name){
		return document.getElementById(name);
	}

	var x = locX;
	var y = locY;
	var intervalMove;
	var intervalSprite;
	var main = get("main");
	var current = 0;
	var saveInstance = instance;
	
	main.innerHTML += "<div id='"+instance+"'></div>";
	var sObject = get(instance);
	
	var num = numSpX;
	var numY = numSpY;
	var sWidth = num * (times-1);
	
	sObject.style.visibility = 'hidden';
	sObject.style.height = numY+"px";
	sObject.style.width = num+"px";
	sObject.style.border = "#33FF00 solid 1px";
	sObject.style.zIndex = ""+Math.floor(y/5);
	sObject.style.background = "url('"+img+"') -"+xOffset+"px 0";
	sObject.style.position = "absolute";
	sObject.style.top = y+"px";
	sObject.style.left = x+"px";
	
	//PHYSICS!
	var phyId = physics.add(this);

}

/*
	Sprite class. Any movable image is considered a Sprite. Images that are immovable, but are animated should
	be declared as Items (use the gif format). Note that the use of Sprites without a parent SpriteMap is currently unsupported.
	img is the URL of the image
	locX is the starting x coordinate. 
	numSpX
*/

function Sprite(img, locX, locY, numSpX, numSpY, xOffset, yOffset, times, instance){

	var get = function(name){
		return document.getElementById(name);
	}

	var x = locX;
	var y = locY;
	var displayX = x;
	var displayY = y;
	var saveOffsetX = 0;
	var saveOffsetY = 0;
	var intervalMove;
	var intervalSprite;
	var main = get("main");
	var current = 0;
	var saveInstance = instance;
	var moving = false;
	var mainPlayer = false;
	var isCollided = true;
	
	//Time stuff
	var start = new Date().getTime();
	var animStart = new Date().getTime();
	
	main.innerHTML += "<div id='"+instance+"'></div>";
	var sObject = get(instance);
	
	//alert(sWidth);
	var num = numSpX;
	var numY = numSpY;
	var sWidth = num * (times-1);
	
	
	sObject.style.visibility = 'hidden';
	sObject.style.height = numY+"px";
	sObject.style.width = num+"px";
	sObject.style.border = "#33FF00 solid 1px";
	sObject.style.zIndex = ""+Math.floor(y/5);
	sObject.style.background = "url('"+img+"') -"+xOffset+"px -"+yOffset+"px";
	sObject.style.position = "absolute";
	sObject.style.top = y+"px";
	sObject.style.left = x+"px";
	
	
	//PHYSICS!
	var phyId = physics.add(this);

	this.collisionEvent = function(str){
	
		return true;
	}
	
	this.setCollisionCallBack = function(str){
	
		this.collisionEvent = str;
	}
	
	this.renew = function(){
		sObject = get(saveInstance);
	}
	
	this.adjust = function(offsetMoveX, offsetMoveY){
		saveOffsetX = offsetMoveX;
		saveOffsetY = offsetMoveY;
		displayX = offsetMoveX + x;
		displayY = offsetMoveY + y;
		if(mainPlayer == false){
		
			sObject.style.left = displayX+"px";
			sObject.style.top = displayY+"px";
		}
	}
	
	this.move = function(dest, direction){
		
		
		var diff = (new Date().getTime() - start) * .001;
		get("debug").innerHTML = diff + " -- " + framesPerSecond;
		
		if( diff < framesPerSecond){
			return;
			
		}
		
		else
			start = new Date().getTime();
		
		if(direction == undefined) direction = 'x';
		
		if(direction == 'x'){
			
			if(physics.enabled())
				isCollided = physics.collide(phyId, new Array(x+dest, y, x+dest+num, y+numY));
			else isCollided = false;
		
			if( isCollided == false){
			
				moving = true;
				x += dest;
		
				displayX = x + saveOffsetX;
				if(mainPlayer == false) sObject.style.left = displayX+"px";
			}
		
			else{
		
				this.stopMove();
				this.stopSprite();
				moving = false;
			}
		}
		
		else{
			
			if(physics.enabled())
				isCollided = physics.collide(phyId, new Array(x, y+dest, num+x, numY+dest+y));
			else isCollided = false;
		
			if( isCollided == false){
			
				moving = true;
				y += dest;
		
				displayY = y + saveOffsetY;
				if(mainPlayer == false) sObject.style.top = displayY+"px";
			}
		
			else{
		
				this.stopMove();
				this.stopSprite();
				moving = false;
			}
		}	
		
		return moving;
	}
	
	this.changeSprite = function(){
	
		if((new Date().getTime() - animStart) / 1000 < framesPerSecond)
			return;
			
		else
			animStart = new Date().getTime();
	
		if(num + current > sWidth) current = 0;
		else current += num;
		var tempCurrent = current+xOffset;
		sObject.style.background = "url('"+img+"') -"+tempCurrent+"px -"+yOffset+"px";
	}
	
	this.animateSprite = function(speed){
		
		
		intervalSprite = setInterval(saveInstance+".changeSprite()", speed);
	}
	
	this.animateMove = function(distance){
		
		intervalMove = setInterval(saveInstance+".move("+distance+")", 1);
	}
	
	this.stopMove = function(){
		clearInterval(intervalMove);
	}
	
	this.stopSprite = function(){
		clearInterval(intervalSprite);
	}
	
	this.stop = function(){
		clearInterval(intervalMove);
		clearInterval(intervalSprite);
	}
	
	this.debug = function(){

		alert(x + " " + numY);
	}
	
	this.display = function(){
		sObject.style.visibility = "visible";	
	}
	
	this.hide = function(){
		sObject.style.visibility = "hidden";
	}
	
	this.getInstance = function(){
	
		return sObject;
	}
	
	this.getName = function(){
	
		return saveInstance;
	}
	
	this.register = function(val){
	
		mainPlayer = val;
	}
	
	this.isMoving = function(){
	
		return moving;
	}
	
	this.isBlocked = function(){
	
		return isCollided;
	}
	
	this.eventClick = function(str){
	
		sObject.onclick = str;
	}
	
	this.getLocation = function(){
	
		return new Array(x, y);
		
	}
	
	this.getDetailedLocation = function(){
	
		return new Array(x, y, x+num, y+numY);
	}
}











