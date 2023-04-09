import {useWindowSize} from "./responsive_width_height"
const baseStyle = {
    display: "grid",
    height: "100vh",
    width: "100vw",
    justifyContent: "center",
    alignItems: "center",
    gridTemplateColumns: "repeat(2, 50%)",
  }; 
const globalstyles = {
  grid_layout_400: {
    ...baseStyle,

    gridTemplateAreas: '"mobile mobile"'
  },
  grid_layout_900: {
    ...baseStyle,
    backgroundColor: "blue",
  },
  
  };
  export const getStyles = (width:number, height: number) => {
    if (width <=  460) {
      return globalstyles.grid_layout_400;
    } 
    if (width >  400 && width <= 1000) {
        return globalstyles.grid_layout_900;
    }
  }