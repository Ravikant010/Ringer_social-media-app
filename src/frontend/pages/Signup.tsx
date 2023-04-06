import React, {useState} from 'react'
import Input from "../components/Input"
import Button from '../components/button'
import countries from "../json/country_code.json"
import {signup_user} from "../controller/request"
import moment  from 'moment'
type Props = {}
interface User {
  fullname: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  DOB: string;
  country: string;
}
function Signup({}: Props) {
  const [user, setUser] = React.useState<User>({
    fullname: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    DOB: "",
    country: '',

  })
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDay(event.target.value);
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(event.target.value);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYear(event.target.value);
  };

  const handleSubmit = () => {
  
    const date = moment(`${year}-${month}-${day}`, "YYYY-MM-DD").format(
      "DD/MM/YYYY")
      setUser(prevState => ({
        ...prevState, 
        ["DOB"]: date as string
      }))
      console.log(user.DOB)
     // replace this with your logic to update the state
  };

  const [dialcode, setDialcode] = React.useState<Array<string>>()
  React.useEffect(()=>{
    const dialCodes = countries.map(country => country.dial_code);
    setDialcode(dialCodes)
  },[])
  console.log(countries)
  const [next, isNext] = React.useState<boolean>(false)
  function handleInputChange(event:React.ChangeEvent<HTMLElement>, name:string) {
    const inputElement = event.target as HTMLInputElement;
    const {value } = inputElement
    console.log(name, "name")
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  }
  React.useEffect(()=>{
    handleSubmit()
  }, [day, month, year])
  const CountrySelector = () => {
    return (
      <div style = {{width:'80%', height:'60px', marginTop: "30px",}}>
     <select style={{width: "100%", height: "100%", padding: "10px 20px", fontFamily: "Montserrat", background: "transparent", outline: "none", fontSize: "1.2rem",border: "2px solid #14213d"}} onChange={(event)=>{
            const element = event.target as HTMLSelectElement;
            const {value} = element
            setUser(prevState => ({
              ...prevState,
              ["country"]: value
            }));
              console.log(user.country)
        }}>
      {countries.map((country,index) => (
        <option  value={country.name} style={{width: "60%"}} key  ={index} >{country.name}</option>
      ))}
   
        </select>
      </div>
    );
  };

  
console.log(user)
  return (
    <div style={styles.container}>
  
<div style = {styles.input_container}>
<h3 style = {styles.SignupText}>Sign up</h3>
  { !next ? ["fullname","username", "email", "phone", ].map((args,index)=><Input width='80%' height='40px' placeholder={args} borderRadius='0' border = "2px solid #14213d" margin = "15px 0" name = {args} key = {args} handleInputChange = {handleInputChange}></Input>) : 
<div style = {{width: "100%", height: "60px", display: "flex", justifyContent: "flex-start", alignItems: "flex-end", background: ""}}>

{["DD","MM","YYYY"].map((args, index)=>{
return <input style={{border: "none", width: "20%", borderBottom: "6px solid #14213d", height: "80%", background:"transparent", outline: "none", fontSize: "1.4rem", textAlign: "center", display:"flex",justifyContent:"center",marginRight: "15px"}} placeholder={args}   onChange={
  index === 0
    ? handleDayChange
    : index === 1
    ? handleMonthChange
    : handleYearChange
}/>
})}

</div>

  }
{
  next ? <CountrySelector /> : null
}
{next ?   <Input width='80%' height='40px' placeholder={"Password"} borderRadius='0' border = "2px solid #14213d" margin = "30px 0" name = {"password"} handleInputChange = {handleInputChange} type  = "password"></Input> : ""}

  <Button  width='60%' height='60px' border='2px solid #14213d' borderRadius='0' margin='40px auto' onClick = {()=>{
  if(next){
return signup_user(user)
  }
  isNext(!next)
  }}
  
    >{!next ? "Next" : "Signup"}</Button>
</div>
    </div>
  )
}
const styles = {
    container : {
        display: 'flex',
        flexDirection: 'column' as "column",
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '100%',
        width: '100vw',
        gridArea: "mobile",
      },
      input_container: {
        background: "transparent",
        display: 'flex',
        flexDirection: 'column' as "column",
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        height: '100%',
    
        width: '80%',
        marginBottom: "50px",
        gridArea: "mobile",
        margin: "0 auto"
      },
      SignupText: {
      
        fontSize: "3rem",
        fontFamily: "Montserrat",
        fontWeight: "bold",
        // textAlign: "center"
      }
}

export default Signup