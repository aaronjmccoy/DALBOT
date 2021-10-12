//// RCL PHASE FUNCTIONS ////
Rooms.prototype.rcl1 = function() {
  let fSb = (this.read('first_spawn_built')?this.read('first_spawn_built'):this.spawns.length;
  let fSp = this.read('first_spawn_placed');
  let s = this.read('scored');
  let task;
  let schedule; //// TODO:
  //get the schedule for building a spawn - how I do dis...
  //let schedule = getschedule()
  //if I know the energy I will get per creep per trip to energy source
  //then I know how many trips it will take
  //and if I know how much energy is being deposited
  //I can calculate how much time it will take to dump 15k energy into a cs
  //function is: (distance per trip + upgrade time)*(number of trips)
  //((steps-to-source*2)+(carryCapacity/(5*workParts)))*(15000/carryCapacity) = ticks to upgrade
  //following this logic our best scenario is a 0 s-t-s source, because our problem gets reduced to:
  //(200/workParts) = ticks to upgrade
  // with a WWC you can upgrade in 100 ticks
  //our schedule should then look like [0...100] = upgrade
  //so a full schedule would be 0-15k - remote builders - 15k-200rcl - wwc @ 100
  //create a high priority task to construct a spawn

  //start from the check you'll make the most frequently
  if(!fSb){
    //is not built - is placed?
    if(!fSp){
      //first spawn has not been placed
      //has room been scored?
      if(!s){
        let rScore = this.score();
        this.update('scored', true);
      }
      //time to place a construction site
      this.update('first_spawn_placed', this.placeInitialSpawn());
      //time to build
      task = Game.getObjectById(fSp).createTask('build', 0, '15000', schedule);
    }
  }else{
    //time to upgrade
    task = this.controller.createTask('upgrade', 0, '200', schedule);
  }
	if (!s) {

  }else{
    //this is the easiest rcl - we need to place a spawn
    if (!fSp || fSp == -1) {

    }else{
      if (!fSb || fSb == -1) {
        let firstSpawnBuilt = (Game.getObjectById(fSp)?-1:true);
        if(firstSpawnBuilt){

        }
      }else{

      }
    }
  }

  //
  //now we build spawn unti it is in our mem
  //

  //after we place a spawn, we need to make a worker with WWC

  //that worker mines and fills spawn

  //spawn makes workers and they make extensions

  //now we can upgrade to rcl 2

}

Rooms.prototype.rcl2 = function() {
  //rcl2 lets you add a container and extensions
  //we can also upgrade all our creep bodies, namely miner to WWWWWC
}

Rooms.prototype.rcl3 = function() {
  //rcl 3 lets us get a tower and extensions
  //upgrade bodies again, miner to WWWWWWWC
}

Rooms.prototype.rcl4 = function() {
  //rcl4 allows optional storage (waste of time usually)
  //upgrade bodies again, miner to WWWWWWWWC
}

Rooms.prototype.rcl5 = function() {
  //rcl 5 allows 1 more tower and optional links
  //upgrade bodies again
}

Rooms.prototype.rcl6 = function() {
  //rcl 6 allows terminal and optional extractor and labs
  //upgrade bodies again (this should be the last one)
}

Rooms.prototype.rcl7 = function() {
  //rcl7 allows for optional factory
}

Rooms.prototype.rcl8 = function() {
  //rcl 8 allows observer, optional nuker and powerspawn
}
////CRUD FOR ROOM LEVEL MEMORY
//read
Room.prototype.read = function(key) {
  return Memory.rooms[this.name][key];
}
//write
Room.prototype.update = function(key, value) {
  Memory.rooms[this.name][key] = value;
}
//delete
Room.prototype.delete = function(key) {
  delete Memory.rooms[this.name][key];
}
