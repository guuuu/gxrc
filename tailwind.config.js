module.exports = {
  content: ["./src/**/*.{ts,tsx}"], // or 'media' or 'class'
  theme: {
    extend: {
      "spacing": {
        "custom_scrollable_height": "calc(100vw - (100vw * 0.253))",
      },
    },
		backgroundColor: theme => ({
			...theme('colors'),
			'main_bg': '#212121',
			'sidebar_bg': '#2e2e2e',
			'sidebar_bt_bg': "#282828",
      'runesModal_bg': "#2e2e2e",
      'bt1': "#bf84fb",
      'bt2': "#ff0000",
      'bt3': "#00f0ff",
		}),
    fontSize: {
      'xs': '.75rem',
      'sm': '.875rem',
      'tiny': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    minWidth: {
      "36": "9rem",
    },
    minHeight: {
      "24": "6rem",
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
