// Word-by-word masked reveal for headings. Each word is wrapped in a mask
// (overflow:hidden) and translates up from below the mask; single IntersectionObserver
// triggers the reveal once on viewport entry (or on mount for hero headings).
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';

const DEFAULT_STAGGER = 80;
const DEFAULT_DURATION = 700;
const EMPHASIS_DURATION = 900;
const EMPHASIS_EXTRA_DELAY = 40;
const INTERSECTION_THRESHOLD = 0.2;

function getInitialReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function splitLines(text) {
  // Only an explicit newline starts a new line; ordinary spaces separate words
  // inside a line. Splitting on all whitespace would put every word on its own
  // block and shred the heading's `aria-label` into one word per line.
  return text
    .split('\n')
    .map((line) => line.trim().split(/\s+/).filter(Boolean))
    .filter((line) => line.length > 0);
}

export default function AnimatedHeading({
  as = 'h2',
  text,
  lines,
  className = '',
  stagger = DEFAULT_STAGGER,
  duration = DEFAULT_DURATION,
  delay = 0,
  emphasis = [],
  triggerOnMount = false,
  tabIndex,
}) {
  const [reduce] = useState(getInitialReducedMotion);

  const resolvedLines = useMemo(() => {
    if (Array.isArray(lines) && lines.length > 0) return lines;
    if (typeof text === 'string') return splitLines(text);
    return [[]];
  }, [lines, text]);

  const emphasisKey = emphasis.join('|');
  const emphasisSet = useMemo(() => new Set(emphasisKey ? emphasisKey.split('|') : []), [emphasisKey]);

  const fullText = useMemo(() => {
    return resolvedLines.map((line) => line.join(' ')).join('\n');
  }, [resolvedLines]);

  const flatIndexMap = useMemo(() => {
    const map = [];
    resolvedLines.forEach((line, lineIndex) => {
      line.forEach((_, wordIndex) => {
        map.push({ lineIndex, wordIndex });
      });
    });
    return map;
  }, [resolvedLines]);

  const totalDuration = useMemo(() => {
    let longest = duration;
    resolvedLines.forEach((line, lineIndex) => {
      line.forEach((word, wordIndex) => {
        const flat = flatIndexMap.findIndex((m) => m.lineIndex === lineIndex && m.wordIndex === wordIndex);
        const isEmphasis = emphasisSet.has(word);
        const wordDuration = isEmphasis ? EMPHASIS_DURATION : duration;
        const wordEnd = delay + flat * stagger + (isEmphasis ? EMPHASIS_EXTRA_DELAY : 0) + wordDuration;
        if (wordEnd > longest) longest = wordEnd;
      });
    });
    return longest + 100;
  }, [flatIndexMap, resolvedLines, duration, delay, stagger, emphasisSet]);

  const headingRef = useRef(null);
  const triggeredRef = useRef(false);
  const [visible, setVisible] = useState(() => reduce || triggerOnMount);

  useEffect(() => {
    if (reduce || triggerOnMount) return undefined;
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }
    const node = headingRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !triggeredRef.current) {
            triggeredRef.current = true;
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: INTERSECTION_THRESHOLD, rootMargin: '0px 0px -10% 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduce, triggerOnMount]);

  useEffect(() => {
    if (!visible) return undefined;
    const timer = window.setTimeout(() => {
      const node = headingRef.current;
      if (!node) return;
      // `will-change` lives on the words, so drop it there once the reveal is
      // over instead of leaving a compositor layer per word for the page's life.
      node.querySelectorAll('.word').forEach((word) => {
        word.style.willChange = 'auto';
      });
    }, totalDuration);
    return () => window.clearTimeout(timer);
  }, [visible, totalDuration]);

  if (reduce) {
    const Tag = as;
    const props = {};
    if (as === 'h2' || tabIndex !== undefined) props.tabIndex = tabIndex ?? -1;
    // Keeps the `animated-heading` class so `.line` still breaks the same way as
    // the animated version — reduced motion removes the movement, not the layout.
    const reducedClassNames = ['animated-heading', className].filter(Boolean).join(' ');
    return (
      <Tag ref={headingRef} className={reducedClassNames} aria-label={fullText} {...props}>
        {resolvedLines.map((line, lineIndex) => (
          <span key={`line-${lineIndex}`} className='line'>
            {line.map((word, wordIndex) => (
              <span key={`word-${lineIndex}-${wordIndex}`}>
                {emphasisSet.has(word) ? <em>{word}</em> : word}
                {wordIndex < line.length - 1 ? ' ' : ''}
              </span>
            ))}
            {lineIndex < resolvedLines.length - 1 ? ' ' : ''}
          </span>
        ))}
      </Tag>
    );
  }

  const Tag = as;
  const headingProps = {};
  if (as === 'h2' || tabIndex !== undefined) headingProps.tabIndex = tabIndex ?? -1;
  const classNames = ['animated-heading', className, visible ? 'is-visible' : ''].filter(Boolean).join(' ');

  return (
    <Tag ref={headingRef} className={classNames} aria-label={fullText} {...headingProps}>
      {resolvedLines.map((line, lineIndex) => (
        <span className='line' key={`line-${lineIndex}`} aria-hidden='true'>
          {line.map((word, wordIndex) => {
            const flatIndex = flatIndexMap.findIndex(
              (m) => m.lineIndex === lineIndex && m.wordIndex === wordIndex,
            );
            const isEmphasis = emphasisSet.has(word);
            const wordDuration = isEmphasis ? EMPHASIS_DURATION : duration;
            const wordDelay = delay + flatIndex * stagger + (isEmphasis ? EMPHASIS_EXTRA_DELAY : 0);
            const wordStyle = {
              '--word-duration': `${wordDuration}ms`,
              '--word-delay': `${wordDelay}ms`,
            };
            const content = isEmphasis ? <em>{word}</em> : word;
            return (
              <Fragment key={`mask-${lineIndex}-${wordIndex}`}>
                <span className='mask'>
                  <span className='word' style={wordStyle}>
                    {content}
                  </span>
                </span>
                {/* Real space between words so the heading copies and reads as
                    prose instead of "Ideastestedinpractice." */}
                {wordIndex < line.length - 1 ? ' ' : ''}
              </Fragment>
            );
          })}
          {/* Whitespace between block lines is not rendered, but it keeps the
              copied text and the `aria-label` identical. */}
          {lineIndex < resolvedLines.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}
