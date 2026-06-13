"use client"

import { useEffect, useRef } from "react"

export function ShaderAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl =
      canvas.getContext("webgl") ??
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null)

    if (!gl) return

    const vertSrc = `
      attribute vec2 a_pos;

      void main() {
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `

    const fragSrc = `
      precision highp float;

      uniform vec2 u_res;
      uniform float u_time;

      float ring(vec2 uv, float t, float offset, float i) {
        float lw = 0.002;
        float ii = i * i;
        return lw * ii / abs(fract(t + offset + i * 0.01) * 5.0 - length(uv) + mod(uv.x + uv.y, 0.2));
      }

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_res) / min(u_res.x, u_res.y);
        float t = u_time * 0.05;

        float r = 0.0;
        float g = 0.0;
        float b = 0.0;

        r += ring(uv, t, 0.00, 0.0);
        r += ring(uv, t, 0.00, 1.0);
        r += ring(uv, t, 0.00, 2.0);
        r += ring(uv, t, 0.00, 3.0);
        r += ring(uv, t, 0.00, 4.0);

        g += ring(uv, t, -0.01, 0.0);
        g += ring(uv, t, -0.01, 1.0);
        g += ring(uv, t, -0.01, 2.0);
        g += ring(uv, t, -0.01, 3.0);
        g += ring(uv, t, -0.01, 4.0);

        b += ring(uv, t, -0.02, 0.0);
        b += ring(uv, t, -0.02, 1.0);
        b += ring(uv, t, -0.02, 2.0);
        b += ring(uv, t, -0.02, 3.0);
        b += ring(uv, t, -0.02, 4.0);

        gl_FragColor = vec4(r, g, b, 1.0);
      }
    `

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type)
      if (!shader) return null

      gl.shaderSource(shader, src)
      gl.compileShader(shader)

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn(gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }

      return shader
    }

    const vertexShader = compile(gl.VERTEX_SHADER, vertSrc)
    const fragmentShader = compile(gl.FRAGMENT_SHADER, fragSrc)

    if (!vertexShader || !fragmentShader) {
      if (vertexShader) gl.deleteShader(vertexShader)
      if (fragmentShader) gl.deleteShader(fragmentShader)
      return
    }

    const program = gl.createProgram()
    if (!program) {
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
      return
    }

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn(gl.getProgramInfoLog(program))
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
      return
    }

    gl.useProgram(program)

    const buffer = gl.createBuffer()
    if (!buffer) {
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
      return
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    )

    const aPos = gl.getAttribLocation(program, "a_pos")
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(program, "u_res")
    const uTime = gl.getUniformLocation(program, "u_time")

    if (!uRes || !uTime) {
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
      return
    }

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      const width = Math.max(1, Math.floor(canvas.clientWidth * pixelRatio))
      const height = Math.max(1, Math.floor(canvas.clientHeight * pixelRatio))

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }

      gl.viewport(0, 0, width, height)
      gl.uniform2f(uRes, width, height)
    }

    resize()
    window.addEventListener("resize", resize)

    let t = 1.0
    const draw = () => {
      t += 0.05
      gl.uniform1f(uTime, t)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      rafRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(rafRef.current)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ display: "block" }}
    />
  )
}
