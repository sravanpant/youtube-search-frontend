// In tailwind.config.js
module.exports = {
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#0052CC', // Professional blue tone
            50: '#E6F0FF',
            100: '#CCE0FF',
            200: '#99C2FF',
            300: '#66A3FF',
            400: '#3385FF',
            500: '#0052CC', // Primary blue
            600: '#0047B3',
            700: '#003D99',
            800: '#003380',
            900: '#002966',
          },
          secondary: {
            DEFAULT: '#FF5630', // For important actions/alerts
          },
          neutral: {
            50: '#F7F9FC',
            100: '#F0F2F5',
            200: '#E1E4E8',
            300: '#CFD3D9',
            400: '#B0B7C3',
            500: '#8C95A6',
            600: '#6B7280',
            700: '#4F5463',
            800: '#333845',
            900: '#1F2028',
          },
        },
      },
    },
  };