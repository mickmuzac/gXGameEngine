/*
v0.02 is here for performance reasons. There are big optimizations in this version. 
v0.01 is embarrasing in comparison. To reimplement v0.01, the calls in GXgraphics must be changed.
*/
function Collision(){

	var map = new Array();
	var id = -1;
	var on = true;
	var update = true;
	//var collisionMap = new Array(new Array());
	
	this.enabled = function(check){
		
		return on;
	}
	
	this.enableCollisions = function(val){
		on = val;
	}
	
	this.add = function(str){
		
		map.push(str);
		id++;
		return id;
	}

	this.collide = function(num, comp){
		
		var prop = new Array(4);
		//There are definitely more efficient ways to do this, 
		//but I didn't find this to be terribly inefficient for our purposes.
		//This is VERY basic collision detection
		for(var i = 0; i <= id; i++){

			if(i != num){
				
				prop = map[i].getDetailedLocation();
				if(prop[0] <= comp[2] && prop[2] >= comp[0] && prop[1] <= comp[3] && prop[3] >= comp[1]){
				
					map[num].collisionEvent(map[i]);
					return true;	
				}
			}
			
		}
		return false;
	}
	
}

















