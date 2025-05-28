// mapping: Never → 0, Rarely → 1, Sometimes → 2, Very frequently → 3

window.listeners = [
  {
    // person 1
    frequencies: {
      country:          0,  // Never
      kpop:             3,  // Very frequently
      pop:              3,  // Very frequently
      rnb:              2,  // Sometimes
      videoGameMusic:   2   // Sometimes
    },
    depression: 0.0,
    favGenre:   "Latin"
  },
  {
    // person 2
    frequencies: {
      country:          1,  // Rarely
      kpop:             1,  // Rarely
      pop:              3,  // Very frequently
      rnb:              1,  // Rarely
      videoGameMusic:   1   // Rarely
    },
    depression: 5.0,
    favGenre:   "Pop"
  },
  {
    // person 3
    frequencies: {
      country:          1,  // Rarely
      kpop:             0,  // Never
      pop:              2,  // Sometimes
      rnb:              0,  // Never
      videoGameMusic:   0   // Never
    },
    depression: 10.0,
    favGenre:   "Rap"
  }
];