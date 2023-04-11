import {draw, text } from "./draw"
import {a, level} from "./level"
const canvas = document.getElementById("game")
/**@type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d")
let ini = []
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let point = 0
let mousex
let mousey
let life = 3
let isMouseDown = false
let itens = {point, life}

addEventListener("mousedown", (ev) => {
    mousex = ev.clientX
    mousey = ev.clientY
    isMouseDown = true;
    if(colision(mousex, mousey, 1128, 728, 0.1)) {
        alert("colision detected")
    }
    for (let i = 0; i < ini.length; i++) {
        if(ini[i].life == 2) {
            ini[i].img = "http://127.0.0.1:5500/assets/sprite_1.png"
        }
        if(ini[i].life == 1) {
            ini[i].img = "http://127.0.0.1:5500/assets/sprite_2.png"
        }
        if (isMouseDown && colision(ini[i].x, ini[i].y, mousex, mousey, 0.06)) {
            ini[i].life -= 1
            point += 1
            
            break
        }
    }
})
addEventListener("mouseup", (ev) => {
    mousex = 0
    mousey = 0
    isMouseDown = false;
})
function dead() {
    if (life == 0) {
        ini = []
        a.i = 0
        text(ctx, "arial", "red", "A energia, foi redestribuida por todos os cantos do universo.", 50, 50)
        setTimeout(() => {
            if(life == 0) {
                point -= 15
                a.i = 0
                level()
                
            }
            life = 3
        }, 2000)
    }
}

function colision(x, y, mx, my, margin) {
    let dx = Math.abs(mx - x);
    let dy = Math.abs(my - y);
    return dx <= margin * canvas.width && dy <= margin * canvas.height;
}
function rectIntersect(x, y, mx, my, margin, width, height) {
    let dx = mx - x;
    let dy = my - y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let radius = (width + height) / 4;
    return distance < radius + margin * canvas.width;
}
level()
function render() {
    requestAnimationFrame(render)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < ini.length; i++) {
        let objWidth = 20
        let objHeight = 20
        let diffX = canvas.width / 2 - ini[i].x
        let diffY = canvas.height / 2 - ini[i].y

        let newX = ini[i].x + diffX * 0.008
        let newY = ini[i].y + diffY * 0.008
        ini[i].x = newX
        ini[i].y = newY
        if (ini[i].life < 0) {
            ini.splice(i, 1)
        }
        if (rectIntersect(ini[i].x, ini[i].y, canvas.width / 2, canvas.height / 2, 0.04, objWidth, objHeight)) {
            ini.splice(i, 1)
            life -= 1
        }

        draw(ctx, ini[i].img, ini[i].x, ini[i].y, 50, 50)
    }
        
    dead()
    for(let i = 0; i < life; i++) {
        draw(ctx, "https://cdn.discordapp.com/attachments/1087504461364207656/1095433836432740362/Coracao_cheio.png",i * 50, 0, 150, 150)
    }
    text(ctx, "roboto", "blue", `Points: ${point}`, 500, 70)
    draw(ctx, "https://media.discordapp.net/attachments/1087504461364207656/1095456781418893433/image.png?width=120&height=120", 1000, 600, 128, 128)
    draw(ctx, "https://media.discordapp.net/attachments/1091018990089932850/1093625787413966903/New_Piskel_20.png?width=128&height=128", canvas.width / 2, canvas.height / 2, 50, 50)
}
render()
export {ini, itens}