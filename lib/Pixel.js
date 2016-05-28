class Pixel {
  constructor(r,g,b,a) {
    this.set(r,g,b,a)
  }

  set(r,g,b,a) {
    this.r = r || 0
    this.g = g || 0
    this.b = b || 0
    this.a = a || 0
  }

  toColor() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
  }
}
