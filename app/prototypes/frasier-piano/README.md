# Frasier's Piano

A sophisticated piano prototype inspired by the elegant aesthetic of the Frasier title card. This interactive piano features beautiful visual design, smooth animations, and realistic sound using your custom MP3 sample.

## Features

- **Interactive Piano Keyboard**: Click or tap keys to play musical notes
- **Custom MP3 Sample**: Uses your "im-listening.mp3" file as the base sound, pitch-shifted across all keys
- **Frasier-Inspired Design**: Elegant typography, sophisticated color palette, and refined visual effects
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile devices
- **Visual Feedback**: Keys animate when pressed with sophisticated styling
- **Clean Aesthetic**: No key labels for a minimalist, professional appearance

## Design Inspiration

This prototype captures the sophisticated essence of the Frasier TV show title card:

- **Typography**: Elegant serif fonts (Playfair Display and Inter)
- **Color Palette**: Black background with blue gradient title (#4A90E2 → #357ABD → #2E6BA8)
- **Visual Effects**: Clean lines, minimal borders, and tasteful hover effects
- **Refined Proportions**: 30% thinner piano with extended black keys for better aesthetics

## Technical Implementation

- **Framework**: Next.js with React hooks
- **Audio**: Web Audio API with MP3 sample loading and pitch-shifting
- **Styling**: CSS Modules with responsive design
- **Interactivity**: Mouse and touch event handling
- **Sound Processing**: Real-time pitch manipulation using playback rate adjustment

## How to Use

1. **Navigate to the prototype**: Go to `/prototypes/frasier-piano` in your browser
2. **Start playing**: Click or tap any piano key to hear the corresponding musical note
3. **Explore the keyboard**: Try different combinations and melodies
4. **Enjoy the experience**: Appreciate the sophisticated visual design and custom sound

## Piano Layout

The piano includes a full octave with properly positioned keys:

- **White Keys**: C, D, E, F, G, A, B
- **Black Keys**: C#, D#, F#, G#, A# (positioned between the correct white keys)

Each key plays your "im-listening.mp3" sample at the appropriate pitch for authentic musical intervals.

## Audio Features

- **High Gain**: Increased volume (gain = 5) for clear playback
- **Click Prevention**: 5ms fade-in and fade-out to prevent audio artifacts
- **Dynamic Duration**: Playback duration adjusts based on pitch for natural sound
- **Fallback Support**: Graceful degradation if MP3 loading fails

## Browser Compatibility

- Modern browsers with Web Audio API support
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers on iOS and Android

## Quote

*"I'm listening..."* - Dr. Frasier Crane

---

*Created as part of the "Prototyping with Cursor" workshop*
