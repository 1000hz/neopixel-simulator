class NeoPixelRing60 {
  constructor(callback) {
    this.callback = callback
  }

  render(simulator, pixels) {
    const {canvas, ctx}   = simulator
    const {width, height} = canvas
    const radius = Math.min(width, height) / 2 - 50
    const x0 = width / 2
    const y0 = height / 2

    ctx.globalCompositeOperation = "source-over"
    ctx.lineWidth = radius / 8

    pixels.forEach((pixel, i) => {
      const angle = 360 / pixels.length * i * (Math.PI / 180)
      const x = x0 + radius * Math.cos(angle)
      const y = y0 + radius * Math.sin(angle)
      const pxRadius = ctx.lineWidth / 3
      const color = pixel.toColor()

      ctx.beginPath()
      ctx.arc(x, y, pxRadius, 0, Math.PI * 2, true)
      ctx.shadowBlur = color !== (new Pixel(0,0,0,1)).toColor() ? 100 : 0
      ctx.shadowColor = color
      ctx.fillStyle = color
      ctx.fill()
    })

    ctx.globalCompositeOperation = "destination-over"
    ctx.beginPath()
    ctx.shadowBlur = 0
    ctx.arc(x0, y0, radius, 0, Math.PI * 2, true)
    ctx.stroke()
    ctx.closePath()
  }

  run(simulator, t) {
    const pixels = this.callback.call(null, enumerate(60, () => new Pixel), t)
    this.render(simulator, pixels)
  }
}