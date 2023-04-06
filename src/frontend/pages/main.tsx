import React from 'react'
import { getStyles } from '../styles/global'
import Button from "../components/button"
import {useWindowSize} from "../styles/responsive_width_height"
import { useNavigate } from 'react-router-dom'
type Props = {}

export default function Main({}: Props) {
  const navigate = useNavigate()
  const [width, height] = useWindowSize()
  const gridStyles = getStyles(width, height);
  return (
    <div style = {gridStyles}>
       <div style = {styles.contaienr}>
    <div style  = {styles.top_container}></div>
    <div style = {styles.bottom_container}>
      Ringer
    <p style = {styles.p_text}>Connect with friends and share your world - all in one place</p>
    <Button height='60px' width='60%' border = "2px solid black" margin = "40px 0 0 0" onClick={()=>navigate("/login")}>Login</Button>
    <p style = {{...styles.p_text, borderBottom: "2px solid black", width: "auto", paddingBottom: "4px"}} onClick={()=>navigate("/signup")}>Signup</p>
    </div>
       </div>
    </div>
  )
}
const styles = {
  contaienr : {
    display: 'flex',
    flexDirection: 'column' as "column",
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    gridArea: "mobile",
   
 
  },
  top_container: {
    width: "100%",
    height: "50%",
    backgroundColor: "#131532",
    borderRadius: "0px 0px 150px 150px"
  },
  bottom_container: {
    width: "100%",
    height: "50%",
   fontSize: "3rem",
    // backgroundColor: "red",
    paddingTop :"30px",
    fontWeight: "bold",
   display: "flex",
   flexDirection: "column" as "column",
   justifyContent: "flex-start",
   alignItems: "center",
   
   
  },
p_text: {
fontSize: "1.2rem",
textAlign: "center" as "center",
width: "90%",

}
}