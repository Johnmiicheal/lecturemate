import { extendTheme } from '@chakra-ui/react';
import "@fontsource/mulish";

// Create a theme instance.
const theme = extendTheme({
  fonts: {
    heading: `'Mulish', san-serif`,
    body:  `'Mulish', san-serif`,       
},
components: {
  Button: { baseStyle: {_focus: { boxShadow: 'none'}}},
},
textStyles: {
  h1: {
    // you can also use responsive styles
    fontSize: '3rem',
    fontWeight: 'bold',
    lineHeight: '110%',
    letterSpacing: '-2%',
    _selection:{
      background: '#474747',
      color: '#FFFFFF'
    }
  },
  h2: {
    fontSize: ['38px', '48px'],
    fontWeight: 'semibold',
    lineHeight: '110%',
    letterSpacing: '-1%',
    _selection:{
      background: '#474747',
      color: '#FFFFFF'
    }
  },
  text: {
    _selection:{
      background: '#474747',
      color: '#FFFFFF'
    }
  }
},


defaultProps: {
  focusBorderColor: '#53AF28',
},

});

export default theme;