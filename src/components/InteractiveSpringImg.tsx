import {
  type AnimationEvent,
  type ImgHTMLAttributes,
  type PointerEvent,
  useCallback,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'

const wrapCls =
  'relative mx-auto flex w-fit max-w-full touch-manipulation justify-center rounded-md [-webkit-tap-highlight-color:transparent] select-none'

function subscribeReducedMotion(cb: () => void) {
  const mq = matchMedia('(prefers-reduced-motion: reduce)')
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}

function prefersReducedMotionSnapshot() {
  return matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function InteractiveSpringImg(
  props: ImgHTMLAttributes<HTMLImageElement>,
) {
  const { className, src, alt, ...rest } = props
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    prefersReducedMotionSnapshot,
    () => false,
  )

  const host = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, rz: 0 })
  const [wobble, setWobble] = useState(false)

  const updateTilt = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (reduceMotion || wobble) return
      const el = host.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      if (rect.width < 8 || rect.height < 8) return
      const cap = (v: number) => Math.max(-1, Math.min(1, v))
      const nx = cap(((e.clientX - rect.left) / rect.width) * 2 - 1)
      const ny = cap(((e.clientY - rect.top) / rect.height) * 2 - 1)
      const maxXY = 20
      const maxZ = 24
      setTilt({
        rx: -ny * maxXY,
        ry: nx * (maxXY * 0.75),
        rz: nx * maxZ,
      })
    },
    [reduceMotion, wobble],
  )

  const resetTilt = useCallback(() => {
    if (!wobble) setTilt({ rx: 0, ry: 0, rz: 0 })
  }, [wobble])

  const onDown = useCallback(() => {
    if (reduceMotion || wobble) return
    setTilt({ rx: 0, ry: 0, rz: 0 })
    setWobble(true)
  }, [reduceMotion, wobble])

  const onAnimationEnd = useCallback((e: AnimationEvent<HTMLDivElement>) => {
    if (!e.animationName.includes('kiosk-img-wobble')) return
    setWobble(false)
  }, [])

  const transformStyle:
    | { transform: string; transition: string; backfaceVisibility: 'hidden' }
    | undefined =
    reduceMotion || wobble
      ? undefined
      : {
          transform: `perspective(480px) rotateZ(${tilt.rz}deg) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: 'transform 110ms cubic-bezier(0.2, 0.75, 0.35, 1)',
          backfaceVisibility: 'hidden',
        }

  return (
    <div
      ref={host}
      className={[wrapCls, wobble ? 'kiosk-img-wobble' : ''].join(' ').trim()}
      style={reduceMotion ? undefined : transformStyle}
      onPointerMove={updateTilt}
      onPointerLeave={resetTilt}
      onPointerCancel={resetTilt}
      onPointerDown={onDown}
      onAnimationEnd={onAnimationEnd}
    >
      <img
        {...rest}
        src={src}
        alt={alt ?? ''}
        className={className}
        draggable={false}
      />
    </div>
  )
}
