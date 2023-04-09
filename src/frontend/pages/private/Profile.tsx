import React, { useEffect } from 'react'
import { getStyles } from '../../styles/global'
import profile from "../../assests/icon/profile.svg"
import vedios from "../../assests/icon/videoplay.svg"
import home from "../../assests/icon/home.svg"
import { useNavigate } from 'react-router-dom'
import { store } from "../../../index"
import post_icon from "../../assests/icon/post.svg"
import {useAtom} from "jotai"
import { user_details,allusers,following_count,followers_count, getFollowcount } from '../../store/storage'
import { useWindowSize } from '../../styles/responsive_width_height'
type Props = {}
interface _fetch_user {
  _id: string
  fullname: string;
  username: string;
  email: string;
  phone: number;
  DOB: string;
  country : string;
}
export default function Profile({}: Props) {
    const [width, height] = useWindowSize()
    const gridStyles = getStyles(width, height);
    const navigate = useNavigate()
    const [user]  = useAtom(user_details)
    const [allusers_] = useAtom(allusers)
    const userWithFullname = user as { _id: string
      fullname: string;
      username: string;
      email: string;
      phone: number;
      DOB: string;
      country : string;};


const UserCard = ({name, image,username}: {name:string, image:string,username:string})=>{
return <div style={{width: "90%", height: "auto", borderRadius: "10px", backgroundColor: "#1C1C1C",marginTop: "10px", marginBottom: "10px", padding: "3% 5%", display: "flex", alignItems: "center"}}>
  <div style={{height: "50px", width: "50px", borderRadius: "50%", background: `url(${image})`,backgroundSize: "cover" ,marginRight: "10px"}}>
  </div>
  <div style={{width: "80%"}}>
  <b>{ user.username}</b>
 <div>{name}</div> 

 </div>
 <div style={{color: "#1C5EFF", fontWeight: "bold"}}>Follow </div>
</div>
}
console.log(allusers_.users)
  return (
    <div style={gridStyles}>
      <div style = {styles.contaienr}>
      <div style = {styles.user_info_container}>
        <div style ={{width: "26%",   height: 0,
  paddingBottom: "26%",borderRadius: "50%", background: "red", display: "flex", alignItems: "center"}}>
        </div>
        <div style={{width: "auto", background:"", marginLeft: "20px", height:"100%", display: "flex", alignItems:"flex-start", flexDirection: "column", justifyContent:"center"}}>
        <div>{userWithFullname.fullname}</div>
        <div style={{marginTop: "10px"}}>{userWithFullname.email}</div>
        <div style={{display: "flex", width: "auto", justifyContent: "space-between", background: ""}}><div style={{marginTop: "10px"}}>followers {" "+store.get(followers_count)}</div>
        <div style={{marginTop: "10px", marginLeft: "20px"}}>following{" "+store.get(following_count)}</div>
        </div>
        <div style={{position: "relative", bottom: "-10%", left: "80%"}}>Edit</div>
        </div>
      </div>
      <div style  = {styles.userlist_container}>
          {
           allusers_.users.map((args, index)=>  index !== 10 ? <UserCard name={args.firstName} image = {args.image} username= {args.username}/>: null)
          }
        </div>
        <div style={styles.navigation_menue}>  {
  [home,post_icon, vedios, profile].map((args,index) => <div style={{width: "32px", height: "32px",background: `url(${args})`, backgroundPosition: "center", backgroundSize: "cover",}} onClick={()=>{
      if(index===0)
      return navigate("/home")
      if(index===2)
      return navigate("/reel")
      if(index===3)
      return navigate("/profile")
  }} key = {index}></div>)
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
    background: "#0F0F11",
    color: "white",
    fontFamily: "Montserrat"
  
  },
  user_info_container: {
    boxShadow: "rgba(0, 5, 2,0.27) 0px 0px 0.25em, rgba(0, 5, 20,0.05) 0px 0.25em 1em",
    width:"80%",
    padding: "0 5%",
    height: "160px",
    marginTop: "20px",
    flexShrink: "0",
    borderRadius: "20px",
    // border: "2px solid #0E0E10",
    background: "#1C1C1C",
    display: "flex",
    alignItems: "center",
    justifyContent: "sapce-around",
    fontSize: "0.9rem",

  },
  userlist_container: {
    width: "90%",
    height: "auto",
    background: "",
    // borderRadius: "20px",
    // border: "2px solid red",
    backgroundColor: "transparent",
    display: "flex",
    paddingTop: "14px",
   paddingBottom: "70px",
    flexDirection: "column" as "column",
    justifyContent: "flex-start",
    alignItems: "center",
    overflowY: "scroll" as "scroll",
  },
  navigation_menue : {
    width: "100%",
    minHeight: "50px",
    height: "60px",
    maxHeight: "60px",

    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    position: "fixed" as "fixed",
    background: "#1C1C1C",
    bottom: "0"
  }
}