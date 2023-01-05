const canvas = document.querySelector('#root');

canvas.width = 200;

const context = canvas.getContext('2d');

const road = new Road(canvas.width / 2, canvas.width * 0.9);

const generateCars = (n) => {
  const cars = [];

  for (let i = 0; i <= n; i++) {
    cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, CONTROL_TYPES.AI));
  }

  return cars;
};

const cars = generateCars(100);
let bestCar = cars[0];

if (localStorage.getItem('bestBrain')) {
  bestCar.brain = JSON.parse(localStorage.getItem('bestBrain'));
}

const traffic = [
  new Car(road.getLaneCenter(1), -100, 30, 50, CONTROL_TYPES.DUMMY, 2),
  new Car(road.getLaneCenter(0), -300, 30, 50, CONTROL_TYPES.DUMMY, 2),
  new Car(road.getLaneCenter(2), -300, 30, 50, CONTROL_TYPES.DUMMY, 2),
];

const save = () => {
  localStorage.setItem('bestBrain', JSON.stringify(bestCar.brain));
};

const discard = () => {
  localStorage.removeItem('bestBrain');
};

const animate = () => {
  canvas.height = window.innerHeight;

  traffic.forEach((item) => item.update(road.borders, []));
  cars.forEach((car) => car.update(road.borders, traffic));

  bestCar = cars.find((car) => car.y === Math.min(...cars.map(({ y }) => y)));

  context.globalAlpha = 0.2;
  context.save();
  context.translate(0, -bestCar.y + canvas.height * 0.9);

  cars.forEach((car) => car.draw(context));

  context.globalAlpha = 1;
  road.draw(context);
  traffic.forEach((item) => item.draw(context));
  bestCar.draw(context, true);

  context.restore();

  requestAnimationFrame(animate);
}

animate();
