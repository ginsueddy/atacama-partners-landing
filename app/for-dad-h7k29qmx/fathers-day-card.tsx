'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

// Warm golden-hour gradient, echoing the sunset in the photo. Used on both the
// page background and the sealed-envelope overlay so the reveal is seamless.
const SUNSET =
  'bg-[radial-gradient(140%_120%_at_50%_0%,#fdeccb_0%,#f7cd84_24%,#ef9f55_46%,#dd6f3f_66%,#8f4a59_86%,#56324f_100%)]';

const BUBBLE_EMOJIS = ['🍺', '🍻', '🍺', '🍺', '🥂'];

type Bubble = {
  id: number;
  left: number; // percent
  size: number; // rem
  duration: number; // seconds
  delay: number; // seconds
  sway: number; // rem
  emoji: string;
};

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Beer emojis drifting gently up in the background. Positions are predetermined
// (not random) so the markup is identical on server and client — no hydration
// mismatch, no client-only effect needed.
const AMBIENT: Bubble[] = [
  { id: 0, left: 6, size: 1.6, duration: 11, delay: 0, sway: 1.5, emoji: '🍺' },
  { id: 1, left: 18, size: 2.1, duration: 9, delay: 2.5, sway: -2, emoji: '🍻' },
  { id: 2, left: 30, size: 1.4, duration: 13, delay: 5, sway: 2, emoji: '🍺' },
  { id: 3, left: 42, size: 2.4, duration: 10, delay: 1.2, sway: -1.2, emoji: '🍺' },
  { id: 4, left: 54, size: 1.7, duration: 12, delay: 3.8, sway: 1, emoji: '🥂' },
  { id: 5, left: 66, size: 2, duration: 8.5, delay: 6.2, sway: -2.4, emoji: '🍺' },
  { id: 6, left: 78, size: 1.5, duration: 14, delay: 0.8, sway: 2.2, emoji: '🍻' },
  { id: 7, left: 88, size: 2.2, duration: 9.5, delay: 4.4, sway: -1.6, emoji: '🍺' },
  { id: 8, left: 12, size: 1.9, duration: 12.5, delay: 7, sway: 1.8, emoji: '🍺' },
  { id: 9, left: 36, size: 1.5, duration: 10.5, delay: 8.5, sway: -2, emoji: '🍺' },
  { id: 10, left: 60, size: 2.3, duration: 11.5, delay: 2, sway: 2.4, emoji: '🍻' },
  { id: 11, left: 72, size: 1.6, duration: 13.5, delay: 5.5, sway: -1, emoji: '🍺' },
];

function AmbientBubbles({ count }: { count: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {AMBIENT.slice(0, count).map(b => (
        <span
          key={b.id}
          className="fd-bubble absolute bottom-[-3rem] select-none opacity-80"
          style={
            {
              left: `${b.left}%`,
              fontSize: `${b.size}rem`,
              '--fd-duration': `${b.duration}s`,
              '--fd-delay': `${b.delay}s`,
              '--fd-sway': `${b.sway}rem`,
            } as React.CSSProperties
          }
        >
          {b.emoji}
        </span>
      ))}
    </div>
  );
}

export default function FathersDayCard({ serifClassName }: { serifClassName?: string }) {
  const [opened, setOpened] = useState(false);
  const [gone, setGone] = useState(false); // envelope overlay fully removed
  const [reduced, setReduced] = useState(false);
  const [bursts, setBursts] = useState<Bubble[]>([]);
  const burstId = useRef(0);

  useEffect(() => {
    // Client-only read of the user's motion preference (unknowable during SSR).
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional one-shot sync from a platform API
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const cheers = useCallback(() => {
    if (reduced) return;
    const next = Array.from({ length: 16 }, () => {
      const id = burstId.current++;
      return {
        id,
        left: rand(8, 92),
        size: rand(1.4, 2.4),
        duration: rand(1.8, 3),
        delay: rand(0, 0.25),
        sway: rand(-3, 3),
        emoji: pick(BUBBLE_EMOJIS),
      } as Bubble;
    });
    setBursts(prev => [...prev, ...next]);
  }, [reduced]);

  const open = useCallback(() => {
    if (opened) return;
    setOpened(true);
    if (reduced) {
      setGone(true);
      return;
    }
    cheers();
    // Unmount the overlay after the flap opens (~0.7s) and lifts away (~0.8s).
    window.setTimeout(() => setGone(true), 1600);
  }, [opened, reduced, cheers]);

  const removeBurst = useCallback((id: number) => {
    setBursts(prev => prev.filter(b => b.id !== id));
  }, []);

  return (
    <main className={cn('relative min-h-screen w-full text-foreground', SUNSET)}>
      {/* ===== The card, revealed beneath the envelope ===== */}
      <section className="relative z-10 flex min-h-screen items-center justify-center p-5 sm:p-6">
        {!reduced && <AmbientBubbles count={10} />}

        <article
          className={cn(
            'relative w-full max-w-md overflow-hidden rounded-[1.75rem] border border-primary/15 bg-card text-card-foreground shadow-2xl shadow-black/40 transition-all duration-700 ease-out',
            opened ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-6 scale-95 opacity-0',
          )}
          style={{ transitionDelay: opened && !reduced ? '900ms' : '0ms' }}
        >
          {/* Photo */}
          <div className="relative aspect-[1276/1328] w-full">
            <Image
              src="/images/fathers-day.png"
              alt="Appa and me at golden hour with the NYC skyline behind us"
              fill
              priority
              sizes="(max-width: 640px) 90vw, 420px"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card to-transparent" />
          </div>

          {/* Message */}
          <div className="px-6 pb-8 pt-1 text-center sm:px-8">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
              June 21, 2026
            </p>
            <h1
              className={cn(
                'mt-2 text-balance text-4xl font-semibold leading-tight text-primary sm:text-5xl',
                serifClassName,
              )}
            >
              Happy Father&rsquo;s Day
            </h1>

            <div className="mx-auto my-5 flex items-center justify-center gap-3 text-lg">
              <span className="h-px w-10 bg-border" />
              <span aria-hidden>🍺</span>
              <span className="h-px w-10 bg-border" />
            </div>

            {/* === MESSAGE === */}
            <p className="text-pretty text-base leading-relaxed text-foreground/80">
              Happy Father&rsquo;s Day, Appa! Hope you are having a nice
              Father&rsquo;s Day! I&rsquo;m grateful that every day I get to call
              you my dad, and thank you for always being there for me. Hopefully
              you get to enjoy a cold one today (I know how important it is for you).
            </p>
            <p className={cn('mt-6 text-xl italic text-foreground/75', serifClassName)}>
              Love, Ginsu <span className="text-foreground/55">(+ the buddha)</span>
            </p>
            {/* === END MESSAGE === */}

            <button
              type="button"
              onClick={cheers}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              Cheers
              <span aria-hidden className="text-xl">
                🍺
              </span>
            </button>
          </div>

          {/* Bubbles burst from the Cheers button */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            {bursts.map(b => (
              <span
                key={b.id}
                onAnimationEnd={() => removeBurst(b.id)}
                className="fd-pop absolute bottom-16 select-none"
                style={
                  {
                    left: `${b.left}%`,
                    fontSize: `${b.size}rem`,
                    '--fd-duration': `${b.duration}s`,
                    '--fd-delay': `${b.delay}s`,
                    '--fd-sway': `${b.sway}rem`,
                    '--fd-distance': `-${Math.round(rand(13, 22))}rem`,
                    '--fd-spin': `${Math.round(rand(-40, 40))}deg`,
                  } as React.CSSProperties
                }
              >
                {b.emoji}
              </span>
            ))}
          </div>
        </article>
      </section>

      {/* ===== Sealed envelope overlay (the gate you tap to open) ===== */}
      {!gone && (
        <div
          className={cn(
            'fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-700 ease-in',
            SUNSET,
            opened ? 'pointer-events-none -translate-y-[110vh] opacity-0' : 'opacity-100',
          )}
          style={{ transitionDelay: opened ? '700ms' : '0ms' }}
        >
          {!reduced && <AmbientBubbles count={12} />}

          <p className="relative z-10 mb-9 text-center text-sm font-medium uppercase tracking-[0.25em] text-amber-50/80 drop-shadow">
            A card for you, Appa
          </p>

          <button
            type="button"
            onClick={open}
            aria-label="Open your Father's Day card"
            className="group relative z-10 block cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-50/50 focus-visible:ring-offset-0"
            style={{ perspective: '1200px' }}
          >
            <div className="relative aspect-[7/5] w-[min(20rem,78vw)] transition-transform duration-300 group-hover:-translate-y-1">
              {/* soft shadow on the ground */}
              <div className="absolute -bottom-6 left-1/2 h-6 w-3/4 -translate-x-1/2 rounded-[50%] bg-black/25 blur-md" />

              {/* back panel + interior (revealed when the flap lifts) */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-[#5a2f24] to-[#7a4230]" />

              {/* pocket front (bottom + side panels) */}
              <div
                className="absolute inset-0 rounded-xl bg-gradient-to-b from-[#e3a468] to-[#cf7e3c]"
                style={{ clipPath: 'polygon(0% 0%, 50% 52%, 100% 0%, 100% 100%, 0% 100%)' }}
              />

              {/* flap (rotates up and back to open) */}
              <div
                className="absolute inset-0 origin-top rounded-t-xl bg-gradient-to-b from-[#f0b67e] to-[#e29c57] transition-transform duration-700 ease-in-out"
                style={{
                  clipPath: 'polygon(0% 0%, 100% 0%, 50% 52%)',
                  transform: opened ? 'rotateX(-168deg)' : 'rotateX(0deg)',
                  transformStyle: 'preserve-3d',
                }}
              />

              {/* wax seal */}
              <div
                className={cn(
                  'absolute left-1/2 top-1/2 z-20 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-2xl shadow-lg ring-4 ring-[#b5431b]/40 transition-all duration-300',
                  opened ? 'scale-0 opacity-0' : 'scale-100 opacity-100',
                )}
              >
                <span aria-hidden>🍺</span>
              </div>
            </div>
          </button>

          <span
            className={cn(
              'relative z-10 mt-12 text-sm font-medium uppercase tracking-[0.2em] text-amber-50/90 transition-opacity duration-300',
              opened ? 'opacity-0' : 'fd-bob opacity-100',
            )}
          >
            Tap to open
          </span>
        </div>
      )}
    </main>
  );
}
