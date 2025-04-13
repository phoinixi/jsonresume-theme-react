export const spacing = {
  // Base spacing units (assuming 13px base font size)
  xs: 'px', // 1 pixel
  sm: '0.5rem', // 6.5px
  md: '1rem', // 13px
  lg: '1.5rem', // 19.5px
  xl: '2rem', // 26px

  card: {
    padding: {
      default: 'p-4',
      sidebar: 'p-2',
      print: 'print:p-0',
    },
    margin: {
      default: 'mb-0',
      sidebar: 'mb-2',
      print: 'print:mb-1',
    },
    gap: {
      default: 'gap-1.5',
      print: 'print:gap-0.5',
    },
  },
  section: {
    margin: {
      default: 'mb-4',
      print: 'print:mb-2',
    },
    item: {
      default: 'space-y-1.5',
      print: 'print:space-y-1',
      mobile: 'sm:space-y-2',
    },
  },
};

export const typography = {
  size: {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    print: {
      xs: 'print:text-[8px]',
      sm: 'print:text-[9px]',
      base: 'print:text-[11px]',
      tiny: 'print:text-[0.65rem]',
    },
  },

  weight: {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  },

  leading: {
    none: 'leading-none',
    tight: 'leading-tight',
    snug: 'leading-snug',
    normal: 'leading-normal',
  },

  color: {
    primary: 'text-foreground',
    secondary: 'text-foreground-secondary',
    tertiary: 'text-foreground-tertiary',
    brand: 'text-brand',
  },
};

export const borders = {
  radius: {
    default: 'rounded-md',
    lg: 'rounded-lg',
    print: 'print:rounded-sm',
  },
  width: {
    default: 'border',
    accent: 'border-2',
    left: 'border-l-1',
  },
  color: {
    transparent: 'border-transparent',
    default: 'border-color',
    brand: 'border-brand',
  },
};

export const colors = {
  bg: {
    card: 'bg-color-secondary',
    highlight: 'bg-white bg-opacity-5',
    tag: {
      default: 'bg-color-secondary',
      brand: 'bg-brand/10',
      accent: 'bg-accent/10',
      muted: 'bg-border/40',
    },
  },
  text: {
    primary: 'text-foreground',
    secondary: 'text-foreground-secondary',
    tertiary: 'text-foreground-tertiary',
    brand: 'text-brand',
    accent: 'text-accent',
  },
  border: {
    default: 'border-color',
    brand: 'border-brand',
    accent: 'border-accent/20',
    muted: 'border-color',
  },
};

export const breakpoints = {
  sm: 'sm:',
  md: 'md:',
  lg: 'lg:',
  xl: 'xl:',
  print: 'print:',
};
