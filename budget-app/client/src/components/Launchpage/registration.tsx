import { FormEvent, useState } from "react";

function PasswordErrorMessage() {
  return (
    <p className="FieldError">Password should have at least 8 characters</p>
  );
};

function Registration() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState({
    value: "",
    isTouched: false,
  });
  const [role, setRole] = useState("role");

  function getIsFormValid(): boolean {
    console.log("First Name: " + userName)
    console.log("Password: " + password)
    return userName !== "" && password.value.length >= 8;
  }

  const clearForm = () => {
    setUserName("");
    setPassword({
      value: "",
      isTouched: false,
    });
    setRole("role");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isValid: boolean = getIsFormValid();
    console.log("Is Valid: " + isValid)
    if(isValid === true) {
      alert("Account created!");
      clearForm()
    } else {
      alert("Account not created ... Nigga")
      PasswordErrorMessage()
      clearForm()
    }
    
  };

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <h2 className="FormTitle">Create an account</h2>
      <input
        value={userName}
        onChange= {(e) => setUserName(e.target.value)}      
      />

      <input 
        value={password.value}
        onChange={(e) => setPassword(prev => ({
          value: e.target.value,
          isTouched: true,
        }))
        }
      
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Registration;
