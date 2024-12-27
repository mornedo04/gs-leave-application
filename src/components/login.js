import { GoogleLogin } from "@react-oauth/google";
import { Component } from "react";

export default class Login extends Component {
    render() {

        const onFailure = (res) => {
            console.log("LOGIN FAILD! res: ", res);
        }

        return (
            <div>
                <GoogleLogin
                    buttonText="Login"
                    onSuccess={this.props.onSuccess}
                    onFailure={onFailure}
                    onError={() => {
                    console.log('Login Failed');
                    }}
                    
                />
            </div>
        )
    }
}

