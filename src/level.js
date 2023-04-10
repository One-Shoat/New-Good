import { ini, itens } from "."
let a = { i: 0 }
let timeouts = []
const canvas = document.getElementById("game")
function horda(num) {
    for (let i = 0; i < num; i++) {
        ini.push({ id: i, x: Math.floor(Math.random() * canvas.width), y: Math.floor(Math.random() * canvas.height), img: "http://127.0.0.1:5500/assets/sprite_0.png", type: "bugener", life: 3 })
    }
}

function level() {
  timeouts.forEach(timeout => clearTimeout(timeout));
  timeouts = []

  let delay = 0;
  for (a.i = 0; a.i < 1000; a.i++) {
    let j = a.i
    let timeout = setTimeout(() => {
      horda(3 * j)
    }, delay);
    timeouts.push(timeout)
    delay += 12000
  }
}
export { level, ini, a }
