import { useWindowSize } from "../styles/responsive_width_height"
import heart from "../assests/icon/heart_.png"
import { SVGProps } from "react";
import Button from "./button"
import Comment from "../assests/icon/chat.png"

interface MyImageProps extends SVGProps<SVGImageElement> {
  href: string;
}

const Postcard = ({ title, body, tags, reaction , id:number, username, image}: {
    title: string,
    body:string,
    tags: string[],
    reaction:number
    id:number,
    username?: string,
    image:string
}) => {

    return (
      <div style = {styles.postcard_container}>
        <div style={{width: "100%", display: "flex", alignItems: "flex-end"}}><div style = {{width: "60px", height: "60px", borderRadius: "50%",background: `url(${image})`, backgroundSize: "cover",backgroundPosition: "center" }}></div>
        <div style = {{marginBottom: "5px", borderBottom: "2px solid white", width: "30%", paddingBottom: "5px"}}>{username}</div>
        <button style = {{background: "#1C5EFF", border: "none", outline: "none", color: "white", height: "24px", width: "auto", borderRadius: "10px", marginLeft: "40%", marginBottom: "5%"}}>Follow</button>
        </div>
        <div style = {{  fontFamily: "Poppins",fontSize: "1rem"}}>{title}</div>
        <div style = {{marginBottom: "5px", borderBottom: "2px solid white", width: "10%", paddingBottom: "5px"}}></div>
        <div>
            {body}
        </div>
        <div style = {{width: "100%", height:"40px", background: "", margin: "0 auto", display: "flex", alignItems: "center"}}>
          <div style={{display: "flex", alignItems: "center"}}>  <img src = {heart} width={"24px"} style = {{marginRight: "5px"}}/> {reaction}</div>
          <div style={{display: "flex", alignItems: "center", marginLeft: "3%"}}>
          <img src = {Comment} width={"30px"} style = {{marginRight: "5px"}}/> {reaction}
          </div>
          <div style={{width: "50%", position: "relative", left:"10%"}}><p style={{float: "right", borderBottom: "2px solid white"}}>all comments</p></div>
        </div>
      </div>
    );
  };
  const styles = {
    postcard_container :{
        width: "80%",
        borderRadius: "10px",
        marginTop: "20px",
      padding: "10px",
      color: "white",
        // height: "200px",
        background: "#1C1C1C",
    }
  }
  export default Postcard;