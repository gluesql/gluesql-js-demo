const WHITE = 'white';
const BLACK = '#333';
const BLUE = '#7af';
const GREY = '#777';
const GREY_TRANSPARENT = 'rgba(0, 0, 0, 0.7)';

const color = {
  border: BLACK,
  console: {
    fg: WHITE,
    fgLabel: BLUE,
    bg: BLACK,
  },
  tab: {
    bgSelected: GREY,
    fg: BLACK,
    fgSelected: WHITE,
  },
  popup: {
    bg: WHITE,
    bgOverlay: GREY_TRANSPARENT,
  },
};

export default color;
