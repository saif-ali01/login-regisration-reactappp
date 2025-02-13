import { toast } from "react-toastify";

export const validateSignInFields = ({ email, password}) => {
    let isValid = true;
  if(!email&& !password ){
    toast.error("Please Fill Your Details",  {
            style: {
                width: "100%",
                fontSize: "12x",
                letterSpacing: "2px",
                borderRadius: "8px",       
            },
        })
    return false;
  }



  if(!email&& !password ){
    toast.error("Please Fill Your Details",  {
        style: {
            width: "100%",
            fontSize: "12x",
            letterSpacing: "2px",
            borderRadius: "8px",       
        },
    })
    return false;
  }
 
  if (!email) {
    toast.error("Email is empty!",  {
        style: {
            width: "100%",
            fontSize: "12x",
            letterSpacing: "2px",
            borderRadius: "8px",       
        },});
    isValid = false;
  } else if (!email.includes('@') || !email.includes('.')) {
    toast.error("Enter valid email!",  {
        style: {
            width: "100%",
            fontSize: "12x",
            letterSpacing: "2px",
            borderRadius: "8px",       
        },});
    isValid = false;
  }
    if (!password) {
      toast.error("Password is empty!",  {
        style: {
            width: "100%",
            fontSize: "12x",
            letterSpacing: "2px",
            borderRadius: "8px",       
        },
    });
      isValid = false;
    }
  
  
    return isValid; // Return true if all fields are valid, otherwise false
  };
  