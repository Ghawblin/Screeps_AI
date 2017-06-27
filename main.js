var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require ('role.repairer');
var spawnlogic = require ('spawnlogic');
module.exports.loop = function () {
    
    //Delete name of dead creep (preserves memory)
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log(name + ' has gone to Valhalla');
        }
    }
    
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairer = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    //Find the amount of extensions
    var extensionsamount = Game.spawns['Ravens Nest'].room.find(FIND_MY_STRUCTURES, {
        filter: { structureType: STRUCTURE_EXTENSION }
    });
    //console.log(extensionsamount.length);
    
    
    
    
    
    
    //generate random 5 characters for names
    for( var i=0; i < 5; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    
    
    var butts = Game.cpu.getUsed();
    //console.log(butts);
    
    //Displays unit amounts per tick
    // console.log('Harvesters: ' + harvesters.length + '    ' + 'upgrader: ' + upgrader.length + '    ' + 'builder: ' + builder.length);
    
    if(extensionsamount.length < 5) {
        if(harvesters.length < 2) {
            var newName = Game.spawns['Ravens Nest'].createCreep([WORK,CARRY,CARRY,MOVE,MOVE], "Harvester " + text, {role: 'harvester'});
            console.log('Creating new Harvester: ' + newName);
        }
        if((builder.length < 1) && (harvesters.length >= 1)){
            var newName = Game.spawns['Ravens Nest'].createCreep([WORK,CARRY,CARRY,MOVE,MOVE], "Builder " + text, {role: 'builder'});
            console.log('Creating new Builder: ' + newName);
        }
        if((upgrader.length < 5) && (harvesters.length >= 1)) {
            var newName = Game.spawns['Ravens Nest'].createCreep([WORK,CARRY,CARRY,MOVE,MOVE], "Upgrader " + text, {role: 'upgrader'});
            console.log('Creating new Upgrader: ' + newName);
        }
        if((repairer.length < 2) && (harvesters.length >= 1)) {
            var newName = Game.spawns['Ravens Nest'].createCreep([WORK,CARRY,CARRY,MOVE,MOVE], "Repairer " + text, {role: 'repairer'});
            console.log('Creating new Repairer: ' + newName);
        }
    } else {
        if(harvesters.length < 2) {
            var newName = Game.spawns['Ravens Nest'].createCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], "Harvester " + text, {role: 'harvester'});
            console.log('Creating new Harvester: ' + newName);
        }
        if((builder.length < 1) && (harvesters.length >= 1)){
            var newName = Game.spawns['Ravens Nest'].createCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], "Builder " + text, {role: 'builder'});
            console.log('Creating new Builder: ' + newName);
        }
        if((upgrader.length < 5) && (harvesters.length >= 1)) {
            var newName = Game.spawns['Ravens Nest'].createCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], "Upgrader " + text, {role: 'upgrader'});
            console.log('Creating new Upgrader: ' + newName);
        }
        if((repairer.length < 2) && (harvesters.length >= 1)) {
            var newName = Game.spawns['Ravens Nest'].createCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], "Repairer " + text, {role: 'repairer'});
            console.log('Creating new Repairer: ' + newName);
        }
        
        
        if(Game.spawns['Ravens Nest'].spawning) {
            var spawningCreep = Game.creeps[Game.spawns['Ravens Nest'].spawning.name];
            Game.spawns['Ravens Nest'].room.visual.text(
            'Spawning Creep: ' + name,
            Game.spawns['Ravens Nest'].pos.x + 1,
            Game.spawns['Ravens Nest'].pos.y,
            {align: 'left', opacity: 0.8});
        }
        
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            if(creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
            if(creep.memory.role == 'repairer') {
                roleBuilder.run(creep);
            }
        }
    }
}



