type Variant = 'down';
interface Breakpoints {
  lg: number;
}

const breakpoints: Breakpoints = {
  lg: 900,
};

export const mediaQuery = (type: Variant, bp: keyof typeof breakpoints) => {
  const queries = {
    down: (bp: number) => `@media (max-width: ${bp}px)`,
  };
  return queries[type](breakpoints[bp]);
};
