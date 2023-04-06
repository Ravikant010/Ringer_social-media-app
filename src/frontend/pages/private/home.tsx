import React from 'react'
import { getStyles } from '../../styles/global'
import { useWindowSize } from '../../styles/responsive_width_height'
import profile from "../../assests/icon/profile.svg"
import vedios from "../../assests/icon/videoplay.svg"
import home from "../../assests/icon/home.svg"
import { useNavigate } from 'react-router-dom'
import {useAtom} from "jotai"
import {allposts,fetch_post, allusers} from "../../store/storage"
import Postcard from '../../components/postcard'
import post_icon from "../../assests/icon/post.svg"
type Props = {}

function Home({}: Props) {
  const [width, height] = useWindowSize()
  const [allposts_] = useAtom(allposts)
  const [allusers_] = useAtom(allusers)
  const gridStyles = getStyles(width, height);
  const navigate = useNavigate()

const userNames = allusers_.users.map((user) => user.username);
const userimages = allusers_.users.map((user) => user.image);
  const Story_cirlce = ()=>{
    return <div style= {{width: "80px", height: "80px", borderRadius:"50%", background: "", border: "2px solid red"}}>

    </div>
  }
  React.useEffect(()=>{
    fetch_post()
  },[])
  console.log(allposts_.posts)

  return (
    <div style = {gridStyles}>
<div style={styles.contaienr}>
<div style = {styles.story_container}>
<Story_cirlce />
</div>
<div style={styles.post_container}>
  {
    allposts_.posts.map((args,index)=>{
return <Postcard title = {args.title} body = {args.body} tags = {args.tags} reaction={args.reactions} id  ={args.id} username={userNames[index]} image =  {userimages[index]}/>;
    })
  }
<div style={styles.navigation_menue}>
{
  [home, post_icon,vedios, profile].map((args,index) => <div style={{width: "34px", height: "34px", background: `url(${args})`, backgroundPosition: "center", backgroundSize: "cover"}} onClick={()=>{
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
    background: "#0F0F11"
  },
  story_container:{
    width: "94%",
    display: "flex",
    alignItems: "center",
    
    padding: "5% 3%",
    paddingTop: "10%",
    background: ""
 
  },
  post_container:{
    width: "100%",
    display: "flex",
    alignItems: "center",
    height: "100%",
    background: "",
    flexDirection: "column" as "column",
    marginTop: "0%",
    marginBottom: "100px",
    overflowY:"scroll" as "scroll"
  },
  navigation_menue : {
    width: "100%",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    position: "fixed" as "fixed",
    background: "#1C1C1C",
    bottom: "0"
  }
}
export default Home