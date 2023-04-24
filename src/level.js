import { ini } from "."
let a = { i: 0 }
let timeouts = []
const canvas = document.getElementById("game")
function horda(num, type) {
    for (let i = 0; i < num; i++) {
      if(type == "bugenner") {
        ini.push({ id: i, x: Math.floor(Math.random() * canvas.width), y: Math.floor(Math.random() * canvas.height), img: "./assets/sprite_0.png", type: "bugenner", life: 3 })
      }  
      if(type == "singulary") {
        ini.push({ id: i, x: Math.floor(Math.random() * canvas.width), y: Math.floor(Math.random() * canvas.height), img: "https://media.discordapp.net/attachments/1087504461364207656/1095427124929769472/Sprite-0005.png?width=46&height=46", type: "singulary", life: 5 })
      }  
      if(type == "rocketener") {
        ini.push({ id: i, x: Math.floor(Math.random() * canvas.width), y: Math.floor(Math.random() * canvas.height), img: "./assets/rocketener.png", type: "rocketener", life: 2 })
      }  
    }
}
function level() {
  timeouts.forEach(timeout => clearTimeout(timeout));
  timeouts = []

  let delay = 0;
  for (a.i = 0; a.i < 1000; a.i++) {
    let j = a.i
    if(j <= 10) {
      let timeout = setTimeout(() => {
        horda(j * 2, "bugenner")
        horda(j, "singulary")
        
      }, delay);
      timeouts.push(timeout)
      delay += 15000
    } 
    if(j >= 10 && j <= 30) {
      let timeout = setTimeout(() => {
        horda(j / 2, "singulary")
        horda(j / 3, "rocketener")
        
      }, delay);
      timeouts.push(timeout)
      delay += 15000
    }
    
  }
}
export { level, ini, a }
