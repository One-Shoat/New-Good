import { draw, text } from "./draw"
import { a, level } from "./level"
import demage from "./music"
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
let inventary = false
let item

addEventListener("mousedown", (ev) => {
    mousex = ev.clientX
    mousey = ev.clientY
    isMouseDown = true;
 
     if (inventary == true && colision(mousex, mousey, canvas.width - 64, canvas.height - 256, 0.05,8)) {
       item = "graminea"
    } else {
       item = ""
    }
    if (colision(mousex, mousey, canvas.width - 16, canvas.height - 16, 0.1)) {
        if (inventary == true) {
            return inventary = false
        } else {
            inventary = true
        }
    }
    for (let i = 0; i < ini.length; i++) {
        if (ini[i].type == "bugenner") {
            if (ini[i].life == 2) {
                ini[i].img = "./assets/sprite_1.png"
            }
            if (ini[i].life == 1) {
                ini[i].img = "./assets/sprite_2.png"
            }
        }
        if (ini[i].type == "singulary") {
            if (ini[i].life == 4) {
                ini[i].img = "./assets/sprite_singulary0.png"
            }
            if (ini[i].life == 3) {
                ini[i].img = "./assets/sprite_singulary1.png"
            }
            if (ini[i].life == 2) {
                ini[i].img = "./assets/sprite_singulary2.png"
            }
            if (ini[i].life == 1) {
                ini[i].img = "./assets/sprite_singulary3.png"
            }
        }
        if (isMouseDown && colision(ini[i].x, ini[i].y, mousex, mousey, 0.06)) {
            ini[i].life -= 1
            point += 1

            break
        }

    }
})
addEventListener("mousemove", (ev) => {
    if(item !== "") {
       draw(ctx, "https://cdn.discordapp.com/attachments/1087504461364207656/1095433836432740362/Coracao_cheio.png", ev.clientX, ev.clientY, 50, 50)
    }
})
addEventListener("mouseup", (ev) => {
    mousex = 0
    mousey = 0
    isMouseDown = false;
})
function dead() {
    if (life <= 0) {
        ini = []
        a.i = 0

        text(ctx, "arial", "red", "A energia, foi redestribuida por todos os cantos do universo.", 50, 50)
        setTimeout(() => {
            if (point > 14) {
                point -= 15
            } else {
                point -= point
            }

            a.i = 0
            level()
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
        let vel = 0
        let diffX = canvas.width / 2 - ini[i].x
        let diffY = canvas.height / 2 - ini[i].y
        if(ini[i].type == "bugenner") {
            vel = 0.008
        }
        if(ini[i].type == "singulary") {
            vel = 0.004
        }
        let newX = ini[i].x + diffX * vel
        let newY = ini[i].y + diffY * vel
        ini[i].x = newX
        ini[i].y = newY
        if (ini[i].life < 0) {
            ini.splice(i, 1)
        }
        if (rectIntersect(ini[i].x, ini[i].y, canvas.width / 2, canvas.height / 2, 0.04, objWidth, objHeight)) {
            if (ini[i].type == "bugenner") {
                life -= 1
            }
            if (ini[i].type == "singulary") {
                life -= 0.5
            }
            demage.play()
            ini.splice(i, 1)

        }

        draw(ctx, ini[i].img, ini[i].x, ini[i].y, 50, 50)
    }

    dead()
    for (let i = 0; i < life; i++) {
        draw(ctx, "https://cdn.discordapp.com/attachments/1087504461364207656/1095433836432740362/Coracao_cheio.png", i * 50, 0, 150, 150)
    }
    if (inventary == true) {
        ctx.globalAlpha = 0.9
        draw(ctx, "https://media.discordapp.net/attachments/1087503910098436158/1095756195362508810/sprite__grama_de_pontos0_1.png?width=120&height=120", canvas.width - 128, canvas.height - 256, 128, 128)
        ctx.globalAlpha = 1
    }
    text(ctx, "roboto", "blue", `Points: ${point}`, 500, 70)
    draw(ctx, "https://media.discordapp.net/attachments/1087504461364207656/1095456781418893433/image.png?width=120&height=120", canvas.width - 128, canvas.height - 128, 128, 128)
    draw(ctx, "https://media.discordapp.net/attachments/1091018990089932850/1093625787413966903/New_Piskel_20.png?width=128&height=128", canvas.width / 2, canvas.height / 2, 50, 50)
}
render()
export { ini }