class Pixel {
  constructor(r,g,b,w) {
    this.set(r,g,b,w)
  }

  set(r,g,b,w) {
    this.channels = {
      r: Math.max(0, Math.min(255, r)),
      g: Math.max(0, Math.min(255, g)),
      b: Math.max(0, Math.min(255, b)),
      w: Math.max(0, Math.min(255, w)),
    }
  }

  channelRgba(c) {
    return `rgba(${c == 'r' || c == 'w' ? 255 : 0}, ${c == 'g' || c == 'w' ? 255 : 0}, ${c == 'b' || c == 'w' ? 255 : 0}, ${this.channels[c] / 255})`
  }

  render(ctx, x, y, r) {
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2, true)
    ctx.shadowBlur = 100

    Object.keys(this.channels).forEach(c => {
      const color = this.channelRgba(c)
      ctx.shadowColor = color
      ctx.fillStyle = color
      ctx.fill()
    })
  }

  toColor() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
  }
}
