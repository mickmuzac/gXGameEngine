function Input(){
	
	var keyNum;
	var childSprite;
	var smoothing = 0;
	//This will tell the engine which sprite to "move"
	this.register = function(instance){
	
		instance.register(true);
		childSprite = instance;
	}
	
	this.setKeys = function(){
		return true;
	}
	
	this.getKey = function (e)
	{
		//alert('key');
		//Thanks to the people at About.com
		if(window.event) // IE
		{
			keyNum = e.keyCode;
		}
	
		else if(e.which) // Netscape/Firefox/Opera
		{
			keyNum = e.which;
		}
		
		//The get key function will actually call the move function.
		if(keyNum == 37){
		
			if(childSprite.move(-3))
				graphics.mainAdjust(3, 0);
			
			if(smoothing == 3){
				childSprite.changeSprite();
				smoothing = 0;
			}
			
			smoothing++;
		}
		
		else if(keyNum == 38){
		
			if(childSprite.move(-3, 'y'))
				graphics.mainAdjust(0, 3);
			
			if(smoothing == 3){
				childSprite.changeSprite();
				smoothing = 0;
			}
			
			smoothing++;
		}
		
		else if(keyNum == 39){
		
			if(childSprite.move(3))
				graphics.mainAdjust(-3, 0);
			
			if(smoothing == 3){
				childSprite.changeSprite();
				smoothing = 0;
			}
			
			smoothing++;
		}
		
		else if(keyNum == 40){
		
			if(childSprite.move(3, 'y'))
				graphics.mainAdjust(0, -3);
			
			if(smoothing == 3){
				childSprite.changeSprite();
				smoothing = 0;
			}
			
			smoothing++;
		}
		
		return true;
	}

}