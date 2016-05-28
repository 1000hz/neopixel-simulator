function rotate(start, delta, length) {
  return (length + (start + delta) % length) % length
}

function inRange(x, min, max) {
  return x >= min && x < max
}


const rVelocity = 1.2
const gVelocity = -0.9
const bVelocity = 1.0

const rLength = 15
const gLength = 10
const bLength = 12

let rOffset = 0
let gOffset = 0
let bOffset = 0

const neopixel  = new NeoPixelRing60((pixels, t) => {
  const length = pixels.length
  rOffset = rotate(rOffset % length, rVelocity, length)
  gOffset = rotate(gOffset % length, gVelocity, length)
  bOffset = rotate(bOffset % length, bVelocity, length)

  return pixels.map((pixel, i) => {
    const r = inRange(rotate(i, -rOffset, length), 0, rLength) ? 255 : 0
    const g = inRange(rotate(i, -gOffset, length), 0, gLength) ? 255 : 0
    const b = inRange(rotate(i, -bOffset, length), 0, bLength) ? 255 : 0
    const a = Math.min(1, Math.abs(Math.sin((t + i) * Math.PI / 180)) + 0.5)

    return new Pixel(r, g, b, a)
  })
})


const simulator = new Simulator(neopixel)
simulator.start()