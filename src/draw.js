function draw(ctx, img, x, y, width, height) {
    /**@type {CanvasRenderingContext2D} */
    const image = new Image()
    image.src = img
    ctx.drawImage(image, x, y, width, height)
}
function text(ctx, font, color, text, w, h) {
    let texts = ""
    if(font == "roboto") {
        texts = "24px Roboto"
    }
    if(font == "arial") {
        texts = "24px Arial"
    }
    ctx.font = texts
    ctx.fillStyle = color
    ctx.fillText(text, w, h)
}
export {draw, text}