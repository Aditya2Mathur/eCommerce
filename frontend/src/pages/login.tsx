import { useState } from "react";
import { FcGoogle } from "react-icons/fc";


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    function loginHandle(){
        // login logic
    }
    return (
        <div className="login">
            <h1>Bro Store</h1>
            <h1>Login</h1>
            <main>
                <div>
                    <label > Username or Email </label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" name="username" /><br />
                </div>
                <div>
                    <label > Password </label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="username" /> <br />
                </div>
                <div>
                    <button id="loginBtn" onClick={loginHandle}>Login</button>
                </div>
                <div className="btnUppar">
                    <p>Already signed  up? <a className="signUp" href="/signup">Sign up here</a></p>
                    <button >
                        <FcGoogle/> <span >Sign in with Google</span>
                    </button>
                </div>
            </main>

        </div>
    )
}

export default Login;