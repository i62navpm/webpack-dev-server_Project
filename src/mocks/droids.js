export default [
  {
    id: 'one',
    coord: {x: randomPosition(610), y: randomPosition(660)}
  },
  {
    id: 'two',
    coord: {x: randomPosition(610), y: randomPosition(660)}
  },
  {
    id: 'three',
    coord: {x: randomPosition(610), y: randomPosition(660)}
  },{
    id: 'four',
    coord: {x: randomPosition(610), y: randomPosition(660)}
  }
];

function randomPosition(max=610, min=0) {
  return Math.random() * (max - min) + min;
}