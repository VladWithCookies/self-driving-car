const canvas = document.querySelector('#root');
const context = canvas.getContext('2d');
const car = new Car(100, 100, 30, 50);

const animate = () => {
  canvas.height = window.innerHeight;
  canvas.width = 200;

  car.update();
  car.draw(context);

  requestAnimationFrame(animate);
}


car.draw(context);

animate();
