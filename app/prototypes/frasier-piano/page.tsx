"use client";

import { useState, useCallback, useEffect } from 'react';
import styles from './styles.module.css';

// Piano notes mapping - frequencies relative to C4 (middle C)
const BASE_FREQUENCY = 261.63; // C4 frequency
const NOTES = {
  'C': 261.63,
  'C#': 277.18,
  'D': 293.66,
  'D#': 311.13,
  'E': 329.63,
  'F': 349.23,
  'F#': 369.99,
  'G': 392.00,
  'G#': 415.30,
  'A': 440.00,
  'A#': 466.16,
  'B': 493.88,
};

// Calculate pitch ratios relative to C
const PITCH_RATIOS = Object.fromEntries(
  Object.entries(NOTES).map(([note, frequency]) => [
    note,
    frequency / BASE_FREQUENCY
  ])
);

const WHITE_KEYS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const BLACK_KEYS = ['C#', 'D#', 'F#', 'G#', 'A#'];

export default function FrasierPiano() {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [pianoBuffer, setPianoBuffer] = useState<AudioBuffer | null>(null);

  useEffect(() => {
    // Initialize audio context on first user interaction
    const initAudio = async () => {
      if (!audioContext) {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        setAudioContext(ctx);
        
        // Load the MP3 file
        const buffer = await loadMp3Sample(ctx);
        setPianoBuffer(buffer);
      }
    };

    document.addEventListener('click', initAudio, { once: true });
    return () => document.removeEventListener('click', initAudio);
  }, [audioContext]);

  // Load the MP3 file and decode it
  const loadMp3Sample = async (ctx: AudioContext): Promise<AudioBuffer> => {
    try {
      const response = await fetch('/im-listening.mp3');
      if (!response.ok) {
        throw new Error(`Failed to load audio file: ${response.status}`);
      }
      
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
      
      return audioBuffer;
    } catch (error) {
      console.error('Error loading MP3 file:', error);
      
      // Fallback to a simple tone if MP3 loading fails
      const sampleRate = ctx.sampleRate;
      const duration = 1.0;
      const length = sampleRate * duration;
      const buffer = ctx.createBuffer(1, length, sampleRate);
      const data = buffer.getChannelData(0);
      
      for (let i = 0; i < length; i++) {
        const t = i / sampleRate;
        const envelope = Math.exp(-t * 3);
        data[i] = Math.sin(2 * Math.PI * BASE_FREQUENCY * t) * envelope * 0.3;
      }
      
      return buffer;
    }
  };

  const playNote = useCallback((note: string) => {
    if (!audioContext || !pianoBuffer) return;

    // Create buffer source and pitch-shift it
    const source = audioContext.createBufferSource();
    const gainNode = audioContext.createGain();
    
    source.buffer = pianoBuffer;
    
    // Pitch-shift by changing playback rate
    const pitchRatio = PITCH_RATIOS[note as keyof typeof PITCH_RATIOS];
    source.playbackRate.setValueAtTime(pitchRatio, audioContext.currentTime);
    
    // Connect audio nodes
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Set volume with very short fades to prevent clicks
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(5, audioContext.currentTime + 0.005); // 5ms fade-in
    
    // Calculate duration based on the buffer length and pitch ratio
    const duration = pianoBuffer.duration / pitchRatio;
    
    // Very short fade-out to prevent clicks
    gainNode.gain.setValueAtTime(5, audioContext.currentTime + duration - 0.005); // Hold volume until 5ms before end
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration); // 5ms fade-out
    
    // Start playback
    source.start(audioContext.currentTime);
    source.stop(audioContext.currentTime + duration);
  }, [audioContext, pianoBuffer]);

  const handleKeyDown = (note: string) => {
    setPressedKeys(prev => new Set(prev).add(note));
    playNote(note);
  };

  const handleKeyUp = (note: string) => {
    setPressedKeys(prev => {
      const newSet = new Set(prev);
      newSet.delete(note);
      return newSet;
    });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Frasier</h1>
        <p className={styles.subtitle}>A sophisticated musical experience</p>
      </header>

      <main className={styles.main}>
        <div className={styles.pianoContainer}>
          <div className={styles.piano}>
            {/* White keys */}
            <div className={styles.whiteKeys}>
              {WHITE_KEYS.map((note) => (
                <button
                  key={note}
                  className={`${styles.whiteKey} ${pressedKeys.has(note) ? styles.pressed : ''}`}
                  onMouseDown={() => handleKeyDown(note)}
                  onMouseUp={() => handleKeyUp(note)}
                  onMouseLeave={() => handleKeyUp(note)}
                  onTouchStart={() => handleKeyDown(note)}
                  onTouchEnd={() => handleKeyUp(note)}
                >
                </button>
              ))}
            </div>

            {/* Black keys */}
            <div className={styles.blackKeys}>
              {BLACK_KEYS.map((note) => {
                // Position black keys between correct white keys with proper percentage calculation
                // Each white key takes up 100/7 = 14.29% of the width
                const whiteKeyWidth = 100 / 7; // 14.29%
                
                const blackKeyPositions = {
                  'C#': whiteKeyWidth * 1,     // Between C and D (at position 1)
                  'D#': whiteKeyWidth * 2,     // Between D and E (at position 2)  
                  'F#': whiteKeyWidth * 4,     // Between F and G (at position 4)
                  'G#': whiteKeyWidth * 5,     // Between G and A (at position 5)
                  'A#': whiteKeyWidth * 6,     // Between A and B (at position 6)
                };
                
                const leftPosition = blackKeyPositions[note as keyof typeof blackKeyPositions];
                
                return (
                  <button
                    key={note}
                    className={`${styles.blackKey} ${pressedKeys.has(note) ? styles.pressedBlack : ''}`}
                    style={{ left: `${leftPosition}%` }}
                    onMouseDown={() => handleKeyDown(note)}
                    onMouseUp={() => handleKeyUp(note)}
                    onMouseLeave={() => handleKeyUp(note)}
                    onTouchStart={() => handleKeyDown(note)}
                    onTouchEnd={() => handleKeyUp(note)}
                  >
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className={styles.instructions}>
          <p>Click or tap the keys to play beautiful melodies</p>
          <p className={styles.quote}>"I'm listening..."</p>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Inspired by the sophisticated style of Frasier Crane</p>
      </footer>
    </div>
  );
}
