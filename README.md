# NeoPixel LED Simulator
### Demo: https://1000hz.github.io/neopixel

Here's a little simulator to help sketch out LED animation functions for one of these things:
https://www.adafruit.com/products/2875


## Usage
The library includes some LED Modules (currently only `NeoPixelRing60`). These accept a callback to run on each render tick. The callback is passed an array of blank `Pixel(r,g,b,a)` instances, and the current tick. It must return an array of `Pixel`s to be rendered.

You'll also need to instantiate a `Simulator` class. `Simulator` constructors take LED Modules as arguments. After you've instantiated your `Simulator`, call `simulator.start()` to begin the light show.

```js
const neopixel = new NeoPixelRing60((pixels, t) => {
  return pixels.map(p => new Pixel(255, 255, 255, Math.random()))
})

const simulator = new Simulator(neopixel)
simulator.start()
```