export default class Enemies {
  constructor() {
    this.enemies = {
      soldiers: Array.prototype.slice.call(document.getElementsByClassName('type-soldier')),
      mechs: Array.prototype.slice.call(document.getElementsByClassName('type-mech'))
    };
    
    this.targets = [];
    this.range = 100;
  }

  closestEnemies(droid) {
    for(let i in this.enemies) {
      this.targets = this.targets.concat(this.enemies[i].filter((enemy) => this.geEuclideanDistance(droid, enemy) < this.range));
    }
    return this.targets;
  }

  furthestEnemies(droid) {
    for(let i in this.enemies) {
      this.targets = this.targets.concat(this.enemies[i].filter((enemy) => this.geEuclideanDistance(droid, enemy) >= this.range));
    }
    return this.targets;
  }

  assistAllies() {
    for(let i in this.enemies) {
      this.targets = this.enemies[i].sort((a, b) => b.dataset.allies - a.dataset.allies);
    }
    return this.targets;
  }

  avoidCrossfire() {
    for(let i in this.enemies) {
      this.targets = this.targets.concat(this.enemies[i].filter((enemy) => !parseInt(enemy.dataset.allies)));
    }
    return this.targets;
  }

  prioritizeMech() {
    this.targets = this.enemies.mechs.concat(this.enemies.soldiers);
    return this.targets;
  }

  avoidMech() {
    this.targets = this.enemies.soldiers;
    return this.targets;
  }

  geEuclideanDistance(droid, enemy) {
    let distance = Math.sqrt( Math.pow(droid.coord.x - enemy.offsetTop, 2) + Math.pow(droid.coord.y - enemy.offsetLeft, 2));
    return distance;
  }
}