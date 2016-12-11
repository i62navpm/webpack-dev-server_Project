export default class MyMap {
  constructor() {
    this.world = new World({element: document.querySelector('#my_map')});
    return this.world;
  }
}