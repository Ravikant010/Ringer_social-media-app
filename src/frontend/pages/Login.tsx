import React, {useState} from 'react'
import { getStyles } from '../styles/global'
import {useWindowSize} from "../styles/responsive_width_height"
import Input from '../components/Input'
import Button from '../components/button'
import google from "../assests/logo/google.png"
import facebook from  "../assests/logo/facebook.png"
import twitter from  "../assests/logo/twitter.png"
import { login_user } from '../controller/request'
import path from 'path'
type Props = {}
interface forlogin {
    email: string;
    password: string;
}
export default function Login({}: Props) {
    const [width, height] = useWindowSize()
    const [login, setLogin] = useState<forlogin>({ email: '', password: '' });

    function handleInputChange(event: React.ChangeEvent<HTMLElement>, name:string){
        const inputElement = event.target as HTMLInputElement
        const {value} = inputElement

        setLogin(prevState => ({...prevState, [name]: value}))
    }
    const grid = getStyles(width, height)
   

    
    console.log(process.env)
    return (
        <div style = {grid}>
                <div style = {styles.contaienr}>
                    <div style={{width: "100%", height: "45%"}}></div>
                     { ["email", "password"].map(args=> <Input width='60%' height='40px' placeholder={args} name = {args} handleInputChange = {handleInputChange} border = "2px solid #14213d" margin = "10px 0" borderRadius='0'/> ) }
                     <Button  width='60%' height='60px' border='2px solid #14213d' borderRadius='0' margin='40px auto 10px' onClick={()=>login_user(login)}>
                        Login
                     </Button>
                     <div style={{fontSize: "1.4rem", fontFamily: "Montserrat", width: "50%", textAlign: "center",borderBottom:"2px solid black", marginBottom: "14px"}}>OR</div>
          <div style = {{display: "flex", justifyContent: "space-around", alignItems: "center", width: "70%"}}>   {
                        [google, facebook, twitter,].map(args=>{
                            return <span style={{width: "25%", height: "30px", borderRadius: "5px" ,background: `url(${args})`, backgroundSize: "contain", backgroundPosition:"center", backgroundRepeat: "no-repeat"}}></span>
                        })
                    }
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

