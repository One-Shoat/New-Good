import { draw, text } from "./draw"
import { a, level } from "./level"
import { demage } from "./music"
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
let item = [{ type: "a", name: "a", x: -999, y: -999 }]
let good = { x: canvas.width / 2, y: canvas.height / 2 }
let horda = 15

addEventListener("mousedown", (ev) => {
    mousex = ev.clientX
    mousey = ev.clientY
    isMouseDown = true;
    console.log(item)
    if (colision(mousex, mousey, canvas.width - 16, canvas.height - 16, 0.1)) {
        if (inventary == true) {
            return inventary = false
        } else {
            inventary = true
        }
    }
    if (inventary == true && colision(mousex, mousey, canvas.width - 64, canvas.height - 256, 0.05)) {
        if (point < 30) {
            return alert("pobre fudido")
        }
        point -= 30
        return item.push({ type: "graminea", name: "graminea", x: -999, y: -999, life: 3 })
    }
     if (inventary == true && colision(mousex, mousey, canvas.width - 64, canvas.height - 150, 0.05)) {
        if (point < 30) {
            return alert("pobre fudido")
        }
        point -= 30
        return item.push({ type: "cerca", name: "cerca", x: -999, y: -999, life: 7 })
    }
    if (inventary == true && colision(mousex, mousey, canvas.width - 64, canvas.height - 220, 0.05)) {
        if (point < 50) {
            return alert("pobre fudido")
        }
        point -= 50
        return item.push({ type: "stoneenner", name: "stoneenner", x: -999, y: -999, life: 5 })
    } else if (item[item.length - 1].type != "a") {
        item[item.length - 1].type = "pressed"
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
        if (ini[i].type == "rocketener") {
            if (ini[i].life == 2) {
                ini[i].img = "./assets/rocketener2.png"
            }
            if (ini[i].life == 1) {
                ini[i].img = "./assets/rocketener3.png"
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
addEventListener("mouseup", (ev) => {
    mousex = 0
    mousey = 0
    isMouseDown = false;
})
addEventListener("mousemove", (ev) => {
    if (item[item.length - 1].type != "pressed" && item[item.length - 1].type != "a") {
        item[item.length - 1].x = ev.clientX
        return item[item.length - 1].y = ev.clientY
    }
    return;

})
function dead() {
    if (life <= 0) {
        ini = []
        a.i = 0
        draw(ctx, "./assets/gameover.png", 0, 0, canvas.width, canvas.height)
        setTimeout(() => {
            life = 3
            if (point < 14) {
                point -= point
            } else {
                point -= 15

            }

            a.i = 0
            level()

        }, 2000)
    }
}
setInterval(() => {
     horda--
}, 1000) 
setInterval(() => {
     horda = 15
}, 15000) 
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
    text(ctx, "roboto", "red", `Hordas em: ${horda}`, 800, 70)
    for (let i = 0; i < ini.length; i++) {
        let objWidth = 20
        let objHeight = 20
        let vel = 0
        let diffX = canvas.width / 2 - ini[i].x
        let diffY = canvas.height / 2 - ini[i].y
        if (ini[i].type == "bugenner") {
            vel = 0.008
        }
        if (ini[i].type == "singulary") {
            vel = 0.004
        }
        if (ini[i].type == "rocketener") {
            vel = 0.016
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
            if (ini[i].type == "rocketener") {
                life -= 1.5
            }
            
            demage.play()
            ini.splice(i, 1)

        }

        draw(ctx, ini[i].img, ini[i].x, ini[i].y, 50, 50)
    }

    for (let i = 0; i < life; i++) {
        draw(ctx, "https://cdn.discordapp.com/attachments/1087504461364207656/1095433836432740362/Coracao_cheio.png", i * 50, 0, 150, 150)
    }
    if (inventary == true) {
        ctx.globalAlpha = 0.9
        draw(ctx, "https://media.discordapp.net/attachments/1087503910098436158/1095756195362508810/sprite__grama_de_pontos0_1.png?width=120&height=120", canvas.width - 128, canvas.height - 256, 128, 128)
        ctx.globalAlpha = 1
    }
    for (let i = 0; i < item.length; i++) {
        if (item[i].life < 0) {
            item.splice(i, 1)
        }
        for (let inicounter = 0; inicounter < ini.length; inicounter++) {
            if (colision(item[i].x, item[i].y, ini[inicounter].x, ini[inicounter].y, 0.1) && item[i].type == "pressed" && item[i].name == "stoneenner") {
                ini.splice(inicounter, 1)
                item[i].life -= 0.5
            }
            if (colision(item[i].x, item[i].y, ini[inicounter].x, ini[inicounter].y, 0.05) && item[i].type == "pressed") {
                if (ini[inicounter].type == "bugenner") {
                    item[i].life -= 1
                }
                if (ini[inicounter].type == "singulary") {
                    item[i].life -= 0.5
                }
                if (ini[inicounter].type == "rocketener") {
                    item[i].life -= 2
                }
                ini.splice(inicounter, 1)
            }
            

        }


        if (item[i].type == "graminea" || (item[i].type == "pressed" && item[i].name == "graminea")) {
            if (!item[i].lastUpdateTime) {
                item[i].lastUpdateTime = Date.now();
            }
            const now = Date.now();
            if ((now - item[i].lastUpdateTime) >= 3000) {
                item[i].lastUpdateTime = now;
                point += 1
            }
            draw(ctx, "./assets/graminea.png", item[i].x, item[i].y, 32, 32);
        }
        if (item[i].type == "stoneenner" || (item[i].type == "pressed" && item[i].name == "stoneenner")) {

            draw(ctx, "./assets/Coracao_cheio.png", item[i].x, item[i].y, 64, 64);
        }
        if (item[i].type == "cerca" || (item[i].type == "pressed" && item[i].name == "cerca")) {

            draw(ctx, "./assets/cerca.png", item[i].x, item[i].y, 32, 32);
        }
    }
    good.y = Math.floor(Math.random() * 21) + canvas.height / 2 - 10
    text(ctx, "roboto", "blue", `Points: ${point}`, 500, 70)
    draw(ctx, "https://media.discordapp.net/attachments/1087504461364207656/1095456781418893433/image.png?width=120&height=120", canvas.width - 128, canvas.height - 128, 128, 128)
    draw(ctx, "https://media.discordapp.net/attachments/1087504461364207656/1097932946888982558/KOtsu-export.png?width=287&height=287", good.x, good.y, 50, 50)
    dead()
}
render()
export { ini }