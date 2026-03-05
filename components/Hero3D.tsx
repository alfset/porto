'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { GithubUser } from '@/lib/github'

interface Hero3DProps {
  user: GithubUser | null
}

export default function Hero3D({ user }: Hero3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null
    if (!gl) return

    let animId: number
    let t = 0

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      gl!.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    // Vertex shader
    const vsSource = `
      attribute vec3 aPos;
      attribute float aSize;
      attribute float aPhase;
      uniform float uTime;
      uniform float uAspect;
      void main() {
        float y = aPos.y + sin(uTime * 0.4 + aPhase) * 0.06;
        float x = aPos.x + cos(uTime * 0.3 + aPhase * 1.3) * 0.03;
        gl_Position = vec4(x / uAspect, y, aPos.z, 1.0);
        gl_PointSize = aSize * (1.0 + sin(uTime + aPhase) * 0.3);
      }
    `
    const fsSource = `
      precision mediump float;
      uniform float uTime;
      void main() {
        vec2 coord = gl_PointCoord - vec2(0.5);
        float d = length(coord);
        if (d > 0.5) discard;
        float alpha = (1.0 - d * 2.0) * 0.7;
        gl_FragColor = vec4(0.06, 0.06, 0.06, alpha);
      }
    `

    function compileShader(type: number, src: string) {
      const s = gl!.createShader(type)!
      gl!.shaderSource(s, src)
      gl!.compileShader(s)
      return s
    }

    const prog = gl.createProgram()!
    gl.attachShader(prog, compileShader(gl.VERTEX_SHADER, vsSource))
    gl.attachShader(prog, compileShader(gl.FRAGMENT_SHADER, fsSource))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    // Generate particle field
    const N = 180
    const positions: number[] = []
    const sizes: number[] = []
    const phases: number[] = []

    for (let i = 0; i < N; i++) {
      positions.push((Math.random() - 0.5) * 2.2)
      positions.push((Math.random() - 0.5) * 2.2)
      positions.push(0)
      sizes.push(1.5 + Math.random() * 4)
      phases.push(Math.random() * Math.PI * 2)
    }

    // Lines connecting nearby particles (as additional points)
    const LINE_VERTS: number[] = []
    const pts = []
    for (let i = 0; i < N; i++) pts.push([positions[i * 3], positions[i * 3 + 1]])
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dx = pts[i][0] - pts[j][0]
        const dy = pts[i][1] - pts[j][1]
        if (Math.sqrt(dx * dx + dy * dy) < 0.38) {
          LINE_VERTS.push(pts[i][0], pts[i][1], 0)
          LINE_VERTS.push(pts[j][0], pts[j][1], 0)
        }
      }
    }

    // Buffers
    const posBuf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

    const sizeBuf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sizes), gl.STATIC_DRAW)

    const phaseBuf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, phaseBuf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(phases), gl.STATIC_DRAW)

    const lineBuf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, lineBuf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(LINE_VERTS), gl.STATIC_DRAW)

    const aPos = gl.getAttribLocation(prog, 'aPos')
    const aSize = gl.getAttribLocation(prog, 'aSize')
    const aPhase = gl.getAttribLocation(prog, 'aPhase')
    const uTime = gl.getUniformLocation(prog, 'uTime')
    const uAspect = gl.getUniformLocation(prog, 'uAspect')

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    function draw() {
      if (!canvas || !gl) return
      t += 0.008
      gl.clearColor(0.969, 0.961, 0.941, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)

      const aspect = canvas.width / canvas.height
      gl.uniform1f(uTime, t)
      gl.uniform1f(uAspect, aspect)

      // Draw lines
      gl.bindBuffer(gl.ARRAY_BUFFER, lineBuf)
      gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0)
      gl.enableVertexAttribArray(aPos)
      gl.disableVertexAttribArray(aSize)
      gl.disableVertexAttribArray(aPhase)
      gl.vertexAttrib1f(aSize, 1.0)
      gl.vertexAttrib1f(aPhase, 0.0)
      gl.drawArrays(gl.LINES, 0, LINE_VERTS.length / 3)

      // Draw points
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuf)
      gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0)
      gl.enableVertexAttribArray(aPos)

      gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuf)
      gl.vertexAttribPointer(aSize, 1, gl.FLOAT, false, 0, 0)
      gl.enableVertexAttribArray(aSize)

      gl.bindBuffer(gl.ARRAY_BUFFER, phaseBuf)
      gl.vertexAttribPointer(aPhase, 1, gl.FLOAT, false, 0, 0)
      gl.enableVertexAttribArray(aPhase)

      gl.drawArrays(gl.POINTS, 0, N)

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden bg-[#F7F5F0]">
      {/* 3D Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.55 }}
      />

      {/* Large background text */}
      <div
        className="absolute bottom-0 left-0 right-0 text-[20vw] font-bold leading-none text-[#0A0A0A]/[0.03] select-none pointer-events-none overflow-hidden whitespace-nowrap"
        style={{ fontFamily: 'Playfair Display, serif' }}
        aria-hidden
      >
        WEB3
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end max-w-[1400px] mx-auto w-full px-6 md:px-12 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Main content */}
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-8 animate-[fadeUp_0.7s_ease_both]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#9A9690]">
                Available for Web3 Projects
              </span>
            </div>

            <h1
              className="font-bold leading-[0.88] tracking-tight text-[#0A0A0A] mb-6 animate-[fadeUp_0.7s_0.1s_ease_both] opacity-0 [animation-fill-mode:forwards]"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(3.8rem, 10vw, 9.5rem)',
              }}
            >
              Alfino
              <br />
              <em className="text-[#3D3B38] not-italic">Setiawan</em>
            </h1>

            <div className="flex flex-wrap gap-2 mb-8 animate-[fadeUp_0.7s_0.2s_ease_both] opacity-0 [animation-fill-mode:forwards]">
              {['Web3 Dev', 'Smart Contracts', 'Validator Ops', 'dApp Builder'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 border border-[#0A0A0A]/12 text-[10px] tracking-widest uppercase text-[#3D3B38] bg-white/60 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p
              className="text-[12px] md:text-sm leading-relaxed text-[#3D3B38] max-w-lg mb-10 animate-[fadeUp_0.7s_0.3s_ease_both] opacity-0 [animation-fill-mode:forwards]"
              style={{ fontFamily: 'DM Mono, monospace' }}
            >
              Building and securing decentralized infrastructure.
              <br className="hidden md:block" />
              From smart contracts to validator nodes — end to end.
            </p>

            <div className="flex flex-wrap gap-3 animate-[fadeUp_0.7s_0.4s_ease_both] opacity-0 [animation-fill-mode:forwards]">
              <a
                href="#projects"
                className="group px-6 py-3.5 bg-[#0A0A0A] text-[#F7F5F0] text-[10px] tracking-[0.25em] uppercase hover:bg-[#1a1a1a] transition-colors flex items-center gap-2"
              >
                View Work
                <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a
                href="/cv-alfino-setiawan.pdf"
                download
                className="group px-6 py-3.5 border border-[#0A0A0A]/20 text-[10px] tracking-[0.25em] uppercase hover:border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#F7F5F0] transition-all text-[#3D3B38] flex items-center gap-2"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                Download CV
              </a>
              <a
                href="https://github.com/alfset"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 border border-[#0A0A0A]/10 text-[10px] tracking-[0.25em] uppercase text-[#9A9690] hover:text-[#0A0A0A] hover:border-[#0A0A0A]/30 transition-colors"
              >
                GitHub ↗
              </a>
            </div>
          </div>

          {/* Right panel — stats */}
          <div className="lg:col-span-4 animate-[fadeUp_0.7s_0.5s_ease_both] opacity-0 [animation-fill-mode:forwards]">
            <div className="bg-white/70 backdrop-blur-md border border-[#0A0A0A]/8 p-6">
              {user?.avatar_url && (
                <div className="flex items-center gap-4 mb-5 pb-5 border-b border-[#0A0A0A]/8">
                  <Image
                    src={user.avatar_url}
                    alt="avatar"
                    width={44}
                    height={44}
                    className="grayscale border border-[#0A0A0A]/10"
                  />
                  <div>
                    <p className="text-xs font-medium text-[#0A0A0A]">{user.name || 'alfset'}</p>
                    <p className="text-[10px] text-[#9A9690]">@{user.login}</p>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { v: user?.public_repos ?? '—', l: 'Repos' },
                  { v: user?.followers ?? '—', l: 'Followers' },
                  { v: user?.following ?? '—', l: 'Following' },
                ].map((s) => (
                  <div key={s.l} className="text-center">
                    <div className="text-2xl font-bold text-[#0A0A0A]" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {s.v}
                    </div>
                    <div className="text-[9px] uppercase tracking-widest text-[#9A9690] mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t border-[#0A0A0A]/8 space-y-2">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[#9A9690]">Indonesia</span>
                  <span className="text-[#0A0A0A]">🇮🇩</span>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[#9A9690]">Alias</span>
                  <span className="text-[#0A0A0A]">alfset · alfcomunitynode</span>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[#9A9690]">Focus</span>
                  <span className="text-[#0A0A0A]">Web3 · Validators</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="relative z-10 flex justify-center pb-8 animate-bounce">
        <svg className="w-4 h-4 text-[#9A9690]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>
    </section>
  )
}
