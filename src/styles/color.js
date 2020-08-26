const WHITE = 'white';
const BLACK = '#333';
const GREY = '#777';
const GREY_TRANSPARENT = 'rgba(0, 0, 0, 0.7)';

const color = {
  border: BLACK,
  console: {
    fg: WHITE,
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
