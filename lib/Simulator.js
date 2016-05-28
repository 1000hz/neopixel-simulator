class Simulator {
  constructor(...objects) {
    this.objects = objects
    this.initCanvas()
  }

  initCanvas() {
    this.canvas = document.createElement("canvas")
    this.ctx = this.canvas.getContext("2d")

    this.setBodyStyle()
    this.setCanvasDimensions()
    window.onresize = this.setCanvasDimensions.bind(this)

    document.body.appendChild(this.canvas)
  }

  setBodyStyle() {
    document.body.style.margin = "0"
    document.body.style.position = "absolute"
    document.body.style.top = "0"
    document.body.style.right = "0"
    document.body.style.bottom = "0"
    document.body.style.left = "0"
  }

  setCanvasDimensions() {
    this.canvas.width  = document.body.clientWidth
    this.canvas.height = document.body.clientHeight
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  start() {
    let paused = false
    let t = 0

    const loop = () => {
      if (!paused) {
        this.clear()
        this.objects.forEach(obj => obj.run(this, t++))
      }

      this.animationId = window.requestAnimationFrame(loop)
    }

    this.animationId = window.requestAnimationFrame(loop)

    const SPACEBAR = 32
    window.addEventListener("keydown", (e) => {
      if (e.which == SPACEBAR) {
        paused = !paused
      }
    })
  }

  stop() {
    window.cancelAnimationFrame(this.animationId)
  }
}