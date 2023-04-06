import React from 'react'

interface Props  {
    // children : React.ReactNode,
    placeholder: string
    width: string,
    height: string,
    bg ? : string,
    borderRadius ? : string
    border?: string
    type?: string,
    ts?: string
    borderBottom?:string,
    font?: string
    margin? :string
    name: string
    handleInputChange: (event:React.ChangeEvent<HTMLElement>, name:string)=>void

}

export default function Input({placeholder,
    width,
    height,
    bg,
    borderRadius,
    border,
    borderBottom,
    name,
    ts,
    type,
    font,
    handleInputChange,
    margin}: Props) {
  return (
    <input style={{ 
        padding: '10px 20px',
        display: "flex",
        outline: "none",
        justifyContent: "center",
        alignItems: "center",
      borderBottom: borderBottom ? borderBottom : "0",
        width: width,
        height: height,
        borderRadius: borderRadius ? borderRadius : "10px",
        backgroundColor: bg ? bg : "white",
        cursor: 'pointer',
        border: border ? border: "2px solid transparent",
        fontSize: ts ? ts : "1.6rem",
        fontFamily: font ? font : "Poppins",
        letterSpacing: "0.7px",
        margin : margin? margin : "0"

      }} placeholder={placeholder} onChange={(event)=>handleInputChange(event, name)} type = {!type? "text":type }/>
  )
}