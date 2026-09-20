import React, { useEffect, useRef, useState } from 'react';

/**
 * WheatAnimation Component
 * 
 * A dynamic, scroll-linked wheat animation for the Prali Pay landing page.
 * Implements layered wind physics, scroll-linked growth/reveal, and subtle parallax.
 * 
 * Performance:
 * - Uses requestAnimationFrame with spring physics (stiffness: 100, damping: 30)
 * - GPU-accelerated CSS transforms (translate, rotate, scale) and opacity only
 * - Full prefers-reduced-motion support
 * - Clean unmount with zero leaks
 */
export default function WheatAnimation({ className = '' }) {
  const containerRef = useRef(null);
  const animFrameRef = useRef(null);

  // Motion state refs (avoids unnecessary React re-renders for 60fps smoothness)
  const motionRef = useRef({
    // Scroll progress (0 to 1)
    scrollProgress: 0,
    targetScrollProgress: 0,
    // Spring physics for scroll
    scrollVelocity: 0,
    // Time tracking for wind
    time: 0,
    // Reduced motion flag
    reducedMotion: false,
    // Calculated dynamic values
    stalkAngle: 0,
    headAngle: 0,
    leafLeftAngle: 0,
    leafRightAngle: 0,
    secondaryStalkAngle: 0,
    growthScale: 0.85,
    windIntensity: 1,
    glowOpacity: 0.4,
    parallaxY: 0
  });

  // Local state for initial mount/reduced-motion render
  const [isReady, setIsReady] = useState(false);

  // DOM node refs for direct transform updates (60fps without React render overhead)
  const primaryStalkRef = useRef(null);
  const primaryHeadRef = useRef(null);
  const primaryLeafLeftRef = useRef(null);
  const primaryLeafRightRef = useRef(null);
  const flagLeafRef = useRef(null);
  const secondaryStalkRef = useRef(null);
  const tertiaryStalkRef = useRef(null);
  const glowRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionRef.current.reducedMotion = mediaQuery.matches;

    const handleReducedMotionChange = (e) => {
      motionRef.current.reducedMotion = e.matches;
    };
    mediaQuery.addEventListener('change', handleReducedMotionChange);

    // Scroll listener with passive flag for peak scrolling performance
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      // Calculate scroll progress relative to the upper landing page area (0 to 1200px)
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1200
      );
      // Normalized progress: 0 at top of hero, ~0.5 around problem/trust, 1.0 down the page
      const rawProgress = Math.min(Math.max(scrollY / (window.innerHeight * 1.4), 0), 1);
      motionRef.current.targetScrollProgress = rawProgress;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    setIsReady(true);

    // Animation Loop
    let lastTimestamp = performance.now();

    const animate = (timestamp) => {
      const dt = Math.min((timestamp - lastTimestamp) / 1000, 0.05); // Cap delta time
      lastTimestamp = timestamp;

      const m = motionRef.current;
      m.time += dt;

      // Spring smoothing for scroll progress (stiffness: 100, damping: 28)
      const springStiffness = 100;
      const springDamping = 28;
      const springForce = (m.targetScrollProgress - m.scrollProgress) * springStiffness;
      const dampingForce = -m.scrollVelocity * springDamping;
      const acceleration = springForce + dampingForce;
      m.scrollVelocity += acceleration * dt;
      m.scrollProgress += m.scrollVelocity * dt;

      // Ensure clamped between 0 and 1
      const p = Math.min(Math.max(m.scrollProgress, 0), 1);

      // Scroll-linked stages:
      // 0–20%: Subtle beginning, gentle sway
      // 20–40%: Wheat extends, leaves move, head unfurls
      // 40–60%: Full bloom, natural wind movement, gentle horizontal sway
      // 60–80%: Dynamic wind flow, subtle parallax
      // 80–100%: Settles into smooth final posture
      let baseGrowth = 0.88;
      let targetWind = 1;
      let targetGlow = 0.35;

      if (p < 0.2) {
        // Stage 1: 0 - 20%
        const t = p / 0.2;
        baseGrowth = 0.88 + t * 0.06; // 0.88 -> 0.94
        targetWind = 0.7 + t * 0.3;    // 0.7 -> 1.0
        targetGlow = 0.3 + t * 0.2;
      } else if (p < 0.4) {
        // Stage 2: 20 - 40%
        const t = (p - 0.2) / 0.2;
        baseGrowth = 0.94 + t * 0.06; // 0.94 -> 1.0
        targetWind = 1.0 + t * 0.3;    // 1.0 -> 1.3
        targetGlow = 0.5 + t * 0.25;
      } else if (p < 0.6) {
        // Stage 3: 40 - 60%
        const t = (p - 0.4) / 0.2;
        baseGrowth = 1.0 + t * 0.03;  // 1.0 -> 1.03
        targetWind = 1.3 + t * 0.2;    // 1.3 -> 1.5
        targetGlow = 0.75 + t * 0.15;
      } else if (p < 0.8) {
        // Stage 4: 60 - 80%
        const t = (p - 0.6) / 0.2;
        baseGrowth = 1.03 - t * 0.02; // 1.03 -> 1.01
        targetWind = 1.5 - t * 0.3;    // 1.5 -> 1.2
        targetGlow = 0.9 - t * 0.2;
      } else {
        // Stage 5: 80 - 100%
        const t = (p - 0.8) / 0.2;
        baseGrowth = 1.01 - t * 0.01; // 1.01 -> 1.0
        targetWind = 1.2 - t * 0.4;    // 1.2 -> 0.8
        targetGlow = 0.7 - t * 0.2;
      }

      m.growthScale = baseGrowth;
      m.windIntensity = targetWind;
      m.glowOpacity = targetGlow;
      m.parallaxY = p * -45; // Subtle upward floating parallax

      // Wind Physics (Multi-harmonic sine/cosine breeze simulation)
      if (!m.reducedMotion) {
        const t = m.time;
        const w = m.windIntensity;

        // Base breeze (slow gentle breathing wave ~ 0.5Hz)
        const breeze = Math.sin(t * 1.2) * 0.65 + Math.cos(t * 0.8 + 1.2) * 0.35;
        // Gust component (faster micro-gust ~ 1.9Hz)
        const gust = Math.sin(t * 2.6 + 2.1) * 0.25;
        // Combined wind force
        const wind = (breeze + gust) * w;

        // Stalk: -2deg to +2deg
        m.stalkAngle = wind * 1.8;
        // Wheat Head (with slight delay/phase lag): -3deg to +3deg
        const headLag = Math.sin(t * 1.2 - 0.5) * 1.6 + Math.cos(t * 2.6 + 1.5) * 0.6;
        m.headAngle = headLag * w * 1.5;
        // Left leaf: -4deg to +4deg
        m.leafLeftAngle = (Math.sin(t * 1.4 + 0.8) * 2.2 + Math.cos(t * 2.2) * 0.8) * w;
        // Right leaf: -4deg to +4deg (opposite phase)
        m.leafRightAngle = (Math.sin(t * 1.3 - 0.9) * 2.0 - Math.cos(t * 2.1 + 0.4) * 0.9) * w;
        // Secondary stalk (different timing):
        m.secondaryStalkAngle = (Math.cos(t * 1.1 + 0.6) * 1.5 + Math.sin(t * 2.4) * 0.4) * w;
      } else {
        // Reduced motion: static dignified posture with subtle scroll response only
        m.stalkAngle = p * 1.5;
        m.headAngle = p * 2.0;
        m.leafLeftAngle = p * -1.5;
        m.leafRightAngle = p * 2.0;
        m.secondaryStalkAngle = p * -1.0;
      }

      // Apply transforms directly to DOM elements (GPU accelerated)
      if (primaryStalkRef.current) {
        primaryStalkRef.current.style.transform = `translateY(${m.parallaxY * 0.8}px) scale(${m.growthScale}) rotate(${m.stalkAngle}deg)`;
      }
      if (primaryHeadRef.current) {
        primaryHeadRef.current.style.transform = `rotate(${m.headAngle}deg)`;
      }
      if (primaryLeafLeftRef.current) {
        primaryLeafLeftRef.current.style.transform = `rotate(${m.leafLeftAngle}deg)`;
      }
      if (primaryLeafRightRef.current) {
        primaryLeafRightRef.current.style.transform = `rotate(${m.leafRightAngle}deg)`;
      }
      if (flagLeafRef.current) {
        flagLeafRef.current.style.transform = `rotate(${m.leafLeftAngle * 0.8}deg)`;
      }
      if (secondaryStalkRef.current) {
        secondaryStalkRef.current.style.transform = `translateY(${m.parallaxY * 0.5}px) scale(${m.growthScale * 0.85}) rotate(${m.secondaryStalkAngle}deg)`;
      }
      if (tertiaryStalkRef.current) {
        tertiaryStalkRef.current.style.transform = `translateY(${m.parallaxY * 0.3}px) scale(${m.growthScale * 0.72}) rotate(${m.secondaryStalkAngle * -0.7}deg)`;
      }
      if (glowRef.current) {
        glowRef.current.style.opacity = m.glowOpacity;
        glowRef.current.style.transform = `scale(${1 + p * 0.25})`;
      }

      // Animate floating biomass particles
      if (particlesRef.current) {
        const particles = particlesRef.current.children;
        const w = m.windIntensity;
        for (let i = 0; i < particles.length; i++) {
          const pEl = particles[i];
          const speed = 25 + i * 8;
          const phase = i * 1.3;
          // Loop upward from y=500 to y=60
          const currentY = 500 - ((m.time * speed + i * 70) % 460);
          const currentX = 170 + Math.sin(m.time * 1.5 + phase) * (18 + i * 6) * w + (m.stalkAngle * 3);
          const opacity = Math.sin(((500 - currentY) / 460) * Math.PI) * 0.7;
          pEl.setAttribute('cx', currentX);
          pEl.setAttribute('cy', currentY);
          pEl.setAttribute('opacity', opacity);
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('scroll', handleScroll);
      mediaQuery.removeEventListener('change', handleReducedMotionChange);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    >
      <svg
        viewBox="0 0 340 620"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible drop-shadow-sm"
      >
        <defs>
          {/* Subtle Ambient Sunlight & Biomass Energy Aura */}
          <radialGradient id="wheat-glow" cx="50%" cy="30%" r="45%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.32" />
            <stop offset="45%" stopColor="#10b981" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </radialGradient>

          {/* Golden Straw to Agricultural Earth Gradient */}
          <linearGradient id="wheat-stem" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#14532d" />
            <stop offset="25%" stopColor="#16a34a" />
            <stop offset="55%" stopColor="#d97706" />
            <stop offset="85%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>

          {/* Secondary Stalk Muted Straw Gradient */}
          <linearGradient id="wheat-stem-secondary" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#0f3d26" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#b45309" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#fcd34d" stopOpacity="0.7" />
          </linearGradient>

          {/* Rich Golden Kernel Gradient */}
          <linearGradient id="kernel-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="30%" stopColor="#f59e0b" />
            <stop offset="70%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>

          {/* Kernel Highlight */}
          <linearGradient id="kernel-highlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#fef3c7" stopOpacity="0" />
          </linearGradient>

          {/* Leaf Botanical Blade Gradient */}
          <linearGradient id="wheat-leaf" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#15803d" />
            <stop offset="40%" stopColor="#16a34a" />
            <stop offset="80%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>

          {/* Delicate Awn Glow Filter */}
          <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- LAYER 1: Ambient Radiant Aura --- */}
        <ellipse
          ref={glowRef}
          cx="175"
          cy="180"
          rx="120"
          ry="150"
          fill="url(#wheat-glow)"
          style={{ transition: 'opacity 0.3s ease-out', willChange: 'transform, opacity' }}
        />

        {/* --- LAYER 1B: Floating Biomass Energy Spores --- */}
        <g ref={particlesRef} className="pointer-events-none">
          <circle cx="160" cy="400" r="2.2" fill="#fbbf24" opacity="0.6" filter="url(#soft-glow)" />
          <circle cx="175" cy="350" r="2.8" fill="#10b981" opacity="0.7" filter="url(#soft-glow)" />
          <circle cx="185" cy="300" r="2.0" fill="#f59e0b" opacity="0.5" filter="url(#soft-glow)" />
          <circle cx="155" cy="240" r="2.5" fill="#34d399" opacity="0.6" filter="url(#soft-glow)" />
          <circle cx="180" cy="180" r="3.0" fill="#fef08a" opacity="0.75" filter="url(#soft-glow)" />
          <circle cx="168" cy="120" r="2.2" fill="#10b981" opacity="0.6" filter="url(#soft-glow)" />
        </g>

        {/* --- LAYER 2: Background Tertiary Sprout --- */}
        <g 
          ref={tertiaryStalkRef}
          style={{ transformOrigin: '130px 580px', willChange: 'transform' }}
          opacity="0.38"
        >
          {/* Stem */}
          <path
            d="M 130 580 Q 120 450 115 320 Q 112 250 108 190"
            stroke="url(#wheat-stem-secondary)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Subtle leaves */}
          <path
            d="M 125 480 Q 80 430 65 410 C 85 435 110 460 122 475 Z"
            fill="url(#wheat-stem-secondary)"
          />
          <path
            d="M 118 380 Q 160 340 175 320 C 150 345 130 365 116 375 Z"
            fill="url(#wheat-stem-secondary)"
          />
          {/* Small background head */}
          <g transform="translate(108, 190) scale(0.65)">
            {[-35, -20, -5, 10, 25, 40, 55, 70].map((yOffset, i) => (
              <g key={`tert-${i}`} transform={`translate(0, ${yOffset})`}>
                <ellipse cx="-7" cy="0" rx="6" ry="11" transform="rotate(-28 -7 0)" fill="url(#wheat-stem-secondary)" />
                <ellipse cx="7" cy="0" rx="6" ry="11" transform="rotate(28 7 0)" fill="url(#wheat-stem-secondary)" />
                <path d="M -7 -6 Q -18 -32 -22 -55" stroke="#fcd34d" strokeWidth="0.8" strokeOpacity="0.5" />
                <path d="M 7 -6 Q 18 -32 22 -55" stroke="#fcd34d" strokeWidth="0.8" strokeOpacity="0.5" />
              </g>
            ))}
          </g>
        </g>

        {/* --- LAYER 3: Midground Secondary Stalk --- */}
        <g
          ref={secondaryStalkRef}
          style={{ transformOrigin: '195px 580px', willChange: 'transform' }}
          opacity="0.55"
        >
          {/* Stem */}
          <path
            d="M 195 580 Q 208 460 215 340 Q 220 230 226 140"
            stroke="url(#wheat-stem-secondary)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Leaf */}
          <path
            d="M 204 460 Q 260 410 280 380 C 255 415 220 445 206 455 Z"
            fill="url(#wheat-leaf)"
            opacity="0.75"
          />
          <path
            d="M 213 360 Q 165 310 145 285 C 175 315 200 345 211 355 Z"
            fill="url(#wheat-leaf)"
            opacity="0.75"
          />
          {/* Secondary Wheat Head */}
          <g transform="translate(226, 140) scale(0.8)">
            {[-45, -30, -15, 0, 15, 30, 45, 60, 75].map((yOffset, i) => (
              <g key={`sec-${i}`} transform={`translate(0, ${yOffset})`}>
                <ellipse cx="-8" cy="0" rx="7" ry="13" transform="rotate(-30 -8 0)" fill="url(#kernel-gold)" opacity="0.8" />
                <ellipse cx="8" cy="0" rx="7" ry="13" transform="rotate(30 8 0)" fill="url(#kernel-gold)" opacity="0.8" />
                <path d="M -8 -8 Q -20 -40 -26 -68" stroke="#fef3c7" strokeWidth="0.9" strokeOpacity="0.65" />
                <path d="M 8 -8 Q 20 -40 26 -68" stroke="#fef3c7" strokeWidth="0.9" strokeOpacity="0.65" />
              </g>
            ))}
          </g>
        </g>

        {/* --- LAYER 4: Foreground Hero Wheat Stalk --- */}
        <g 
          ref={primaryStalkRef}
          style={{ transformOrigin: '160px 590px', willChange: 'transform' }}
        >
          {/* Main Tapered Botanical Culm (Stem) */}
          <path
            d="M 160 590 Q 157 460 162 330 Q 166 220 172 100"
            stroke="url(#wheat-stem)"
            strokeWidth="4.2"
            strokeLinecap="round"
          />

          {/* Stem Nodes (Botanical Joint Swells) */}
          <ellipse cx="158" cy="470" rx="3.5" ry="2" fill="#92400e" opacity="0.85" />
          <ellipse cx="161" cy="360" rx="3.2" ry="1.8" fill="#b45309" opacity="0.85" />
          <ellipse cx="165" cy="255" rx="3" ry="1.6" fill="#d97706" opacity="0.85" />

          {/* Lower Left Leaf (Arching gracefully outward) */}
          <g 
            ref={primaryLeafLeftRef}
            style={{ transformOrigin: '158px 470px', willChange: 'transform' }}
          >
            <path
              d="M 158 470 C 130 440 85 410 40 380 C 75 405 125 445 156 466 Z"
              fill="url(#wheat-leaf)"
            />
            {/* Leaf Vein */}
            <path
              d="M 158 470 Q 105 425 40 380"
              stroke="#fef08a"
              strokeWidth="0.75"
              strokeOpacity="0.5"
            />
          </g>

          {/* Lower Right Leaf (Arching gracefully down-right) */}
          <g 
            ref={primaryLeafRightRef}
            style={{ transformOrigin: '161px 365px', willChange: 'transform' }}
          >
            <path
              d="M 161 365 C 195 330 250 310 295 315 C 255 335 205 355 163 368 Z"
              fill="url(#wheat-leaf)"
            />
            {/* Leaf Vein */}
            <path
              d="M 161 365 Q 225 325 295 315"
              stroke="#fef08a"
              strokeWidth="0.75"
              strokeOpacity="0.5"
            />
          </g>

          {/* Flag Leaf (Upper leaf just below the spike) */}
          <g 
            ref={flagLeafRef}
            style={{ transformOrigin: '165px 255px', willChange: 'transform' }}
          >
            <path
              d="M 165 255 C 145 220 105 185 70 160 C 98 190 135 230 163 252 Z"
              fill="url(#wheat-leaf)"
            />
          </g>

          {/* --- The Wheat Spike (Ear / Head) --- */}
          <g
            ref={primaryHeadRef}
            style={{ transformOrigin: '172px 250px', willChange: 'transform' }}
          >
            {/* Spikelets (16 Alternating Kernel Hulls with Golden Lighting) */}
            {[
              { y: -70, leftAwn: '-32', rightAwn: '32', scale: 0.8 },
              { y: -54, leftAwn: '-36', rightAwn: '36', scale: 0.88 },
              { y: -38, leftAwn: '-40', rightAwn: '40', scale: 0.95 },
              { y: -22, leftAwn: '-44', rightAwn: '44', scale: 1.0 },
              { y: -6,  leftAwn: '-46', rightAwn: '46', scale: 1.04 },
              { y: 10,  leftAwn: '-46', rightAwn: '46', scale: 1.06 },
              { y: 26,  leftAwn: '-45', rightAwn: '45', scale: 1.05 },
              { y: 42,  leftAwn: '-43', rightAwn: '43', scale: 1.02 },
              { y: 58,  leftAwn: '-40', rightAwn: '40', scale: 0.98 },
              { y: 74,  leftAwn: '-36', rightAwn: '36', scale: 0.94 },
              { y: 90,  leftAwn: '-32', rightAwn: '32', scale: 0.88 },
              { y: 106, leftAwn: '-28', rightAwn: '28', scale: 0.82 }
            ].map((sp, idx) => {
              const stemY = 135 + sp.y;
              return (
                <g key={`spikelet-${idx}`} transform={`translate(172, ${stemY}) scale(${sp.scale})`}>
                  {/* Left Kernel */}
                  <g>
                    <ellipse
                      cx="-9.5"
                      cy="0"
                      rx="8.5"
                      ry="15"
                      transform="rotate(-32 -9.5 0)"
                      fill="url(#kernel-gold)"
                      filter="drop-shadow(0 1px 1px rgba(0,0,0,0.08))"
                    />
                    {/* Golden Highlight Line */}
                    <path
                      d="M -15 -4 Q -12 -12 -7 -14"
                      stroke="url(#kernel-highlight)"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                    {/* Elegant Long Awn (Wheat Bristle) */}
                    <path
                      d={`M -10 -9 Q -24 -48 ${sp.leftAwn} -88`}
                      stroke="#fef08a"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                      opacity="0.85"
                    />
                  </g>

                  {/* Right Kernel */}
                  <g>
                    <ellipse
                      cx="9.5"
                      cy="0"
                      rx="8.5"
                      ry="15"
                      transform="rotate(32 9.5 0)"
                      fill="url(#kernel-gold)"
                      filter="drop-shadow(0 1px 1px rgba(0,0,0,0.08))"
                    />
                    {/* Golden Highlight Line */}
                    <path
                      d="M 15 -4 Q 12 -12 7 -14"
                      stroke="url(#kernel-highlight)"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                    {/* Elegant Long Awn (Wheat Bristle) */}
                    <path
                      d={`M 10 -9 Q 24 -48 ${sp.rightAwn} -88`}
                      stroke="#fef08a"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                      opacity="0.85"
                    />
                  </g>

                  {/* Central Glume / Rachis Junction */}
                  <ellipse
                    cx="0"
                    cy="-2"
                    rx="3.2"
                    ry="5.5"
                    fill="#b45309"
                    opacity="0.9"
                  />
                  <ellipse
                    cx="0"
                    cy="-2"
                    rx="2"
                    ry="3.5"
                    fill="#fbbf24"
                    opacity="0.75"
                  />
                </g>
              );
            })}

            {/* Terminal Apical Spikelet & Crown Awns at the very tip */}
            <g transform="translate(172, 50)">
              <ellipse cx="0" cy="0" rx="6" ry="12" fill="url(#kernel-gold)" />
              {/* Crown awns reaching high into the sky */}
              <path d="M 0 -8 Q 0 -50 0 -95" stroke="#fef08a" strokeWidth="1.3" strokeLinecap="round" opacity="0.9" />
              <path d="M -3 -7 Q -14 -48 -22 -90" stroke="#fef08a" strokeWidth="1.1" strokeLinecap="round" opacity="0.85" />
              <path d="M 3 -7 Q 14 -48 22 -90" stroke="#fef08a" strokeWidth="1.1" strokeLinecap="round" opacity="0.85" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
