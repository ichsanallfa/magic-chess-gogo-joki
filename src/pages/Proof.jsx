import { useEffect, useRef } from 'react'

const proofImages = Object.entries(
  import.meta.glob('../assets/proof/*.{png,jpg,jpeg,webp}', {
    eager: true,
    import: 'default',
  }),
).sort(([firstPath], [secondPath]) =>
  firstPath.localeCompare(secondPath, undefined, { numeric: true }),
)

export default function Proof() {
  const carouselRef = useRef(null)
  const firstGroupRef = useRef(null)
  const pausedUntilRef = useRef(0)
  const scrollPositionRef = useRef(0)

  const pauseForInteraction = () => {
    if (carouselRef.current) {
      scrollPositionRef.current = carouselRef.current.scrollLeft
    }
    pausedUntilRef.current = performance.now() + 350
  }

  const moveCarousel = (direction) => {
    const carousel = carouselRef.current
    const firstImage = carousel?.querySelector('.proof-image-link')
    if (!carousel || !firstImage) return

    pauseForInteraction()
    const imageGap = Number.parseFloat(getComputedStyle(firstImage.parentElement).gap) || 0
    const targetPosition =
      carousel.scrollLeft + direction * (firstImage.getBoundingClientRect().width + imageGap)
    scrollPositionRef.current = targetPosition
    carousel.scrollTo({
      left: targetPosition,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }

  useEffect(() => {
    const carousel = carouselRef.current
    const firstGroup = firstGroupRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!carousel || !firstGroup) return undefined

    let frameId
    let lastFrameTime = 0
    let isVisible = false

    const stopAnimation = () => {
      window.cancelAnimationFrame(frameId)
      frameId = undefined
    }

    const animate = (time) => {
      if (!lastFrameTime) lastFrameTime = time
      const elapsed = Math.min(time - lastFrameTime, 40)
      lastFrameTime = time

      if (time < pausedUntilRef.current) {
        scrollPositionRef.current = carousel.scrollLeft
      } else if (document.visibilityState === 'visible') {
        const speed = reducedMotion.matches ? 0.012 : 0.032
        const loopPoint = firstGroup.offsetWidth
        if (loopPoint > 0) {
          scrollPositionRef.current = (scrollPositionRef.current + elapsed * speed) % loopPoint
          carousel.scrollLeft = Math.floor(scrollPositionRef.current)
        }
      }

      if (isVisible) frameId = window.requestAnimationFrame(animate)
    }

    const startAnimation = () => {
      if (isVisible && document.visibilityState === 'visible' && frameId === undefined) {
        lastFrameTime = 0
        frameId = window.requestAnimationFrame(animate)
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
      if (isVisible) startAnimation()
      else stopAnimation()
    })
    observer.observe(carousel)

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') startAnimation()
      else stopAnimation()
    }

    carousel.addEventListener('pointerdown', pauseForInteraction)
    carousel.addEventListener('wheel', pauseForInteraction, { passive: true })
    carousel.addEventListener('keydown', pauseForInteraction)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      stopAnimation()
      observer.disconnect()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      carousel.removeEventListener('pointerdown', pauseForInteraction)
      carousel.removeEventListener('wheel', pauseForInteraction)
      carousel.removeEventListener('keydown', pauseForInteraction)
    }
  }, [])

  const renderProofImages = (isDuplicate = false) =>
    proofImages.map(([path, image], index) => (
      <a
        className="proof-image-link"
        href={image}
        key={`${path}-${isDuplicate ? 'duplicate' : 'original'}`}
        target="_blank"
        rel="noreferrer"
        aria-label={`Buka bukti joki ${index + 1} ukuran penuh`}
        tabIndex={isDuplicate ? -1 : undefined}
      >
        <img
          className="proof-image"
          src={image}
          alt={isDuplicate ? '' : `Bukti hasil joki ${index + 1}`}
          loading="lazy"
          decoding="async"
        />
        <span className="proof-image-number" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
      </a>
    ))

  return (
    <section className="proof-section" id="proof">
      <header className="proof-heading">
        <p className="eyebrow">HASIL / MAGIC CHESS GOGO</p>
        <h1>Bukti joki</h1>
        <p>Galeri bergeser perlahan. Geser sendiri untuk melihat hasil lainnya, lalu tekan gambar untuk melihat lebih jelas.</p>
      </header>
      <div className="proof-gallery">
        <button
          className="proof-arrow proof-arrow-left"
          type="button"
          aria-label="Geser bukti ke kiri"
          onClick={() => moveCarousel(-1)}
        />
        <div
          className="proof-carousel"
          ref={carouselRef}
          aria-label="Galeri bukti joki, geser secara horizontal"
          tabIndex="0"
        >
          <div className="proof-track">
            <div className="proof-group" ref={firstGroupRef}>{renderProofImages()}</div>
            <div className="proof-group" aria-hidden="true">
              {renderProofImages(true)}
            </div>
          </div>
        </div>
        <button
          className="proof-arrow proof-arrow-right"
          type="button"
          aria-label="Geser bukti ke kanan"
          onClick={() => moveCarousel(1)}
        />
      </div>
    </section>
  )
}
