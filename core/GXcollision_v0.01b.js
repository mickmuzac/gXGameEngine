function Collision(){

	var map = new Array();
	var id = -1;
	var on = true;
	var update = true;
	//var collisionMap = new Array(new Array());
	
	this.enabled = function(check){
		
		if(check == undefined) return on;
		
		else if(check == "update") return update;
		
		else return on;
	}
	
	this.setUpdate = function(val){
		strict = val;
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
		
		var prop;
		//There are definitely more efficient ways to do this, 
		//but I didn't find this to be terribly inefficient for our purposes.
		for(var i = 0; i <= id; i++){
		
			if(i != num){
				
				prop = map[i].split(" ");
				prop[0] = parseInt(prop[0]);
				prop[1] = parseInt(prop[1]);
				prop[2] = parseInt(prop[2]);
				prop[3] = parseInt(prop[3]);

				if(prop[0] <= comp[0]+comp[2] && prop[0]+prop[2] >= comp[0] && prop[1] <= comp[1]+comp[3] && prop[1]+prop[3] >= comp[1])
					return true;	
			}
			
		}
		return false;
	}
	
	this.update = function(num, str){
	
		map[num] = "" + str;	
	}
	
}

















