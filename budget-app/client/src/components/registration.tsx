import {FormEvent, useState} from "react"; 
 
const PasswordErrorMessage = () => { 
 return ( 
   <p className="FieldError">Password should have at least 8 characters</p> 
 ); 
}; 
 
function Registration() { 
 const [firstName, setFirstName] = useState(""); 
 const [lastName, setLastName] = useState(""); 
 const [email, setEmail] = useState(""); 
 const [password, setPassword] = useState({ 
   value: "", 
   isTouched: false, 
 }); 
 const [role, setRole] = useState("role"); 

 const getIsFormValid = () => { 
   return ( 
     firstName && 
    // validateEmail(email) && 
     password.value.length >= 8 && 
     role !== "role" 
   ); 
 }; 
 
 const clearForm = () => { 
   setFirstName(""); 
   setLastName(""); 
   setEmail(""); 
   setPassword({ 
     value: "", 
     isTouched: false, 
   }); 
   setRole("role"); 
 }; 
 
 const handleSubmit = (e: FormEvent<HTMLFormElement>) => { 
   e.preventDefault(); 
   alert("Account created!");
 }

 
    return ( 
        <form className="Form" onSubmit={handleSubmit}> 
                <h2 className="FormTitle">Create an account</h2>
                <input type="text" className="Name" placeholder="Name" />
                <input type="number" className="PIN" placeholder="pin"/>
        </form>
    );
}

export default Registration;