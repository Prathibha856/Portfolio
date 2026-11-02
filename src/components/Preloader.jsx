// ML-themed session preloader. Types out a model-training terminal sequence
// (with an animated progress bar on the 4th line), then fades the overlay
// upward and out to reveal the site. Runs once per session (sessionStorage
// flag), skippable via click or any keypress, bypassed entirely when
// prefers-reduced-motion is enabled or when navigator.webdriver is true
// (so Playwright tests are not blocked by the overlay).
import { useEffect, useRef, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import './Preloader.css';

const STORAGE_KEY = 'ml-preloader-shown';
const LINE_DELAY_MS = 280;
const POST_LAST_DELAY_MS = 500;
const FADE_MS = 600;
const PROGRESS_BAR_MS = 1200;
const TOTAL_BLOCKS = 10;
const FILLED_TARGET = 8;
const TRAINING_LINE_INDEX = 3; // 0-indexed (4th line)

const LINES = [
  '$ initializing environment...',
  '$ loading dataset (284,000 records)...',
  '$ normalizing features...',
  '$ training model [PLACEHOLDER] epoch 84/100',
  '$ loss: 0.0234 · accuracy: 0.9512',
  '$ model converged ✓',
  '> Welcome.',
];

function buildTrainingLine(filled) {
  const filledBlocks = '█'.repeat(filled);
  const emptyBlocks = '░'.repeat(TOTAL_BLOCKS - filled);
  return `$ training model [${filledBlocks}${emptyBlocks}] epoch 84/100`;
}

function shouldShow() {
  if (typeof window === 'undefined') return false;
  if (typeof navigator !== 'undefined' && navigator.webdriver) return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return !window.sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return true;
  }
}

function markShown() {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, '1');
  } catch {
    /* storage unavailable */
  }
}

export default function Preloader({ children }) {
  const [visible, setVisible] = useState(shouldShow);
  const [linesShown, setLinesShown] = useState(0);
  const [progressFilled, setProgressFilled] = useState(0);
  const [hintVisible, setHintVisible] = useState(false);
  const [fading, setFading] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!visible) return undefined;
    if (startedRef.current) return undefined;
    startedRef.current = true;

    const timers = [];
    for (let i = 1; i <= LINES.length; i++) {
      timers.push(
        window.setTimeout(() => setLinesShown(i), i * LINE_DELAY_MS)
      );
    }

    // Animate the 4th line's progress bar 0 → 8 blocks over ~1.2s,
    // starting when line 4 first appears.
    let rafId = 0;
    const progressStart = (TRAINING_LINE_INDEX + 1) * LINE_DELAY_MS;
    timers.push(
      window.setTimeout(() => {
        const t0 = performance.now();
        const tick = (now) => {
          const t = Math.min((now - t0) / PROGRESS_BAR_MS, 1);
          const eased = 1 - Math.pow(1 - t, 2);
          setProgressFilled(Math.round(eased * FILLED_TARGET));
          if (t < 1) rafId = window.requestAnimationFrame(tick);
        };
        rafId = window.requestAnimationFrame(tick);
      }, progressStart)
    );

    const fadeStart = LINES.length * LINE_DELAY_MS + POST_LAST_DELAY_MS;
    timers.push(window.setTimeout(() => setFading(true), fadeStart));
    timers.push(
      window.setTimeout(() => {
        markShown();
        setVisible(false);
      }, fadeStart + FADE_MS)
    );

    // Reveal the skip hint after 800ms.
    timers.push(window.setTimeout(() => setHintVisible(true), 800));

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [visible]);

  // Scroll lock while the preloader is up.
  useEffect(() => {
    if (!visible) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [visible]);

  // Skip handlers.
  useEffect(() => {
    if (!visible) return undefined;
    const skip = () => {
      markShown();
      setVisible(false);
    };
    const onKey = () => skip();
    const onPointer = () => skip();
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onPointer);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onPointer);
    };
  }, [visible]);

  if (!visible) return children;

  const renderLine = (line, index) => {
    if (index === TRAINING_LINE_INDEX) return buildTrainingLine(progressFilled);
    return line;
  };

  return (
    <>
      <Motion.div
        key='preloader'
        className='preloader'
        role='status'
        aria-live='polite'
        aria-label='Loading portfolio'
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: fading ? 0 : 1, y: fading ? -20 : 0 }}
        transition={{ duration: FADE_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
      >
        <pre className='preloader-log' aria-hidden='true'>
          {LINES.slice(0, linesShown).map((line, i) => (
            <Motion.span
              key={`line-${i}`}
              className='preloader-line'
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >{renderLine(line, i)}</Motion.span>
          ))}
        </pre>
        <Motion.span
          className='preloader-cursor'
          aria-hidden='true'
          initial={{ opacity: 0 }}
          animate={{ opacity: fading ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >▍</Motion.span>
        <Motion.p
          className='preloader-hint'
          aria-hidden='true'
          initial={{ opacity: 0 }}
          animate={{ opacity: hintVisible && !fading ? 0.4 : 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >Press any key to skip</Motion.p>
      </Motion.div>
      {children}
    </>
  );
}