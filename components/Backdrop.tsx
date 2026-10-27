/**
 * The shared ambient backdrop's two fixed layers (glows + dot grid; the film
 * grain lives on <html>). Static on purpose: nothing here moves, so glass
 * surfaces blurring it (navbar, drawer) never have to re-blur while scrolling.
 */
export default function Backdrop() {
  return (
    <>
      <div className="backdrop-layer" aria-hidden="true">
        <div className="backdrop-glows" />
      </div>
      <div className="backdrop-layer backdrop-dots" aria-hidden="true" />
    </>
  )
}
