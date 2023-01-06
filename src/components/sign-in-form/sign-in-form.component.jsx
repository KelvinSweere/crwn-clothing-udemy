import { async } from "@firebase/util";
import { useState } from "react";
import { 
    signInWithGooglePopup, 
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import '../sign-in-form/sign-in-form.styles.scss'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignInForm = () => {
    const [ formFields, setFormFields ] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleAuth = async (event) => {
        event.preventDefault();
        
        try {
            console.log('email = ', email, ' password = ', password);
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log('response = ', response);
            resetFormFields();
        }
        catch (error) {

            switch(error.code)
            {
                case "auth/user-not-found":
                    alert("User is not found");
                    break
                case 'auth/wrong-password':
                    alert("Wrong password!");
                    break
                default:
                    console.log(error);
            }
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    return(
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleAuth}>          
                <FormInput 
                    label="Email" 
                    inputOptions = {{
                        type:"email",
                        required: true, 
                        onChange: handleChange,
                        name:'email',
                        value: email
                    }}/>  
                    
                <FormInput 
                    label="Password" 
                    inputOptions = {{
                        type:"password",
                        required: true, 
                        onChange: handleChange,
                        name:'password',
                        value: password
                    }}/>  
                <div className="buttons-container">
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType='google'  onClick={signInWithGoogle}>
                        Google sign in
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;