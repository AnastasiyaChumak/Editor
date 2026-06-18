import { useEffect, useRef } from "react"

interface WidthResizerProps {
  value: number
  onChangeWidth: (width: number) => void
  min?: number
  max?: number
  step?: number
}

export function WidthResizer({
  value,
  onChangeWidth,
  min = 300,
  max = 1000,
  step = 10,
}: WidthResizerProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const el = inputRef.current
    if (!el) return
    const pct = ((value - min) / (max - min)) * 100
    el.style.setProperty("--fill", `${pct}%`)
  }, [value, min, max])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeWidth(Number(e.target.value))
  }

  return (
    <div className="editor-resizer-container">
      <svg
        className="resizer-icon"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12H3M7 8l-4 4 4 4M17 8l4 4-4 4" />
      </svg>
      <input
        ref={inputRef}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="resizer-input"
        aria-label="Editor width"
      />
      <span className="resizer-value">{value}px</span>
    </div>
  )
}