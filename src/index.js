import MyMap       from './modules/map/map';
import Enemies     from './modules/enemies/enemies';
import mockDroids  from './mocks/droids';
import makeRequest from './services/request';

export default class BattleCodeTest {
  constructor() {
    this.myWorld    = new MyMap();
    this.urlRequest = 'https://codetest.api.seedtag.com/radar';
  }

  addDroids(droids) {
    this.droids = droids.map((droid) => {
      this.addDroid(droid);
      this.setRandomProtocol(droid);
      this.setEnemies(droid);
      return droid;
    });
  }

  addDroid({id, coord}) {
    this.myWorld.addDroid(id, coord);
  }

  setRandomProtocol(droid) {
    let protocols = ["closest-enemies", "furthest-enemies", "assist-allies", "avoid-crossfire", "prioritize-mech", "avoid-mech"];
    droid.protocols = [];

    let nProtocols = parseInt(Math.random() * (+protocols.length - 1) + 1);

    for(let i=0; i < nProtocols; i++) {
      droid.protocols.push(protocols[parseInt(Math.random() * +protocols.length)]);
    }
  }

  setEnemies(droid) {
    droid.enemies = new Enemies();
  }

  startBattle() {
    this.getDataRequest(this.droids[0]);
    this.droids.map((droid) => {
      window.setInterval(() => {
        let data = this.getDataRequest(droid);
        data.scan && this.callApi(droid, data);
      }, 5000);
    });
    
  }

  getDataRequest(droid) {
    let data = {protocols: droid.protocols};
    let mapFn = {
      'closest-enemies': 'closestEnemies', 
      'furthest-enemies': 'furthestEnemies',
      'assist-allies': 'assistAllies', 
      'avoid-crossfire': 'avoidCrossfire', 
      'prioritize-mech': 'prioritizeMech',
      'avoid-mech': 'avoidMech' 
    };
    
    let targets = droid.protocols.map((protocol) => droid.enemies[mapFn[protocol]](droid)).slice(-1)[0];

    data.scan = targets.map((target) => {
      return {
        coordinates: {x: target.offsetLeft, y: target.offsetTop},
        enemies: target.dataset.enemies,
        allies: target.dataset.allies
      };
    });

    return data;
    
  }

  callApi(droid, data) {
    makeRequest(droid.id, this.urlRequest, data, this.manageResponse, this.managaError, this);
  }

  manageResponse(response, id) {
    let droid = this.droids.find((droid) => droid.id === id);
    this.myWorld.move(droid.id, response);
    this.myWorld.fire(droid.id, response);
    droid.enemies.targets.shift();
  }

  managaError(id) {
    let droid = this.droids.find((droid) => droid.id === id);
    droid.enemies.targets.shift();
  }
}

let bct = new BattleCodeTest();
bct.addDroids(mockDroids);
bct.startBattle();

