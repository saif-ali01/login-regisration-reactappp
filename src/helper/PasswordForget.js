import { toast } from "react-toastify";

export const validatePasswordForget = (email,otp) => {

    let isValid=true;

    if (!email && !otp) {
        toast.error("Please Fill Your Details", {
            style: {
                width: "100%",
                fontSize: "12x",
                letterSpacing: "2px",
                borderRadius: "8px",
            },
        })
        return false;
    }



    if (!email && !otp) {
        toast.error("Please Fill Your Details", {
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
        toast.error("Email is empty!", {
            style: {
                width: "100%",
                fontSize: "12x",
                letterSpacing: "2px",
                borderRadius: "8px",
            },
        });
        isValid = false;
    } else if (!email.includes('@') || !email.includes('.')) {
        toast.error("Enter valid email!", {
            style: {
                width: "100%",
                fontSize: "12x",
                letterSpacing: "2px",
                borderRadius: "8px",
            },
        });
        isValid = false;
    }
    if (!otp) {
        toast.error("Password is empty!", {
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
}


export const validateEmail = (email) => {

    let isValid=true;


   
    if (!email) {
        toast.error("Email is empty!", {
            style: {
                width: "100%",
                fontSize: "12x",
                letterSpacing: "2px",
                borderRadius: "8px",
            },
        });
        isValid = false;
    } else if (!email.includes('@') || !email.includes('.')) {
        toast.error("Enter valid email!", {
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
}
