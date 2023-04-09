interface Props  {
    children : React.ReactNode,
    width: string,
    height: string,
    bg ? : string,
    borderRadius ? : string
    border?: string
    ts?: string
    font?: string
    margin? :string
    onClick?: ()=>void

}
const Button: React.FC<Props> = ({ children, width, height, bg, borderRadius , border, ts, font, margin, onClick}) => {
    return (
      <button style={{ 
        padding: '10px 20px',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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

      }} onClick={onClick}>
        {children}
      </button>
    );
  }
  
  export default Button;