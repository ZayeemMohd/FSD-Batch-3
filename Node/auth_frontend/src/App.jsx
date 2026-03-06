import { useState } from "react";
import axios from "axios";

function App() {
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");

  const [signinUsername, setSigninUsername] = useState("");
  const [signinPassword, setSigninPassword] = useState("");

  const [userInfo, setUserInfo] = useState('')

  async function signup() {
    await axios.post("http://localhost:8080/signup", {
      username: signupUsername,
      password: signupPassword,
      email: signupEmail,
    });
    alert("signed up successfully");
  }

  async function signin() {
    const response = await axios.post("http://localhost:8080/signin", {
      username: signinUsername,
      password: signinPassword,
    });

    console.log("token recieved: ", response.data.token);

    localStorage.setItem("token", response.data.token);
    getUserInfo()
    alert("sign in successfully");
  }

  async function getUserInfo(params) {
    try {
      const response = await axios.get("http://localhost:8080/me", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      alert(response.data.data);
      setUserInfo(response.data.data);
    } catch (error) {
      alert("First signin to get data");
    }
  }

  async function logout() {
    localStorage.setItem("token", "");
    setUserInfo('');
  }

  return (
    <>
      {userInfo !== "" ? (
        <div
          style={{
            margin: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2>Signin</h2>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setSigninUsername(e.target.value);
            }}
            value={signinUsername}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setSigninPassword(e.target.value);
            }}
            value={signinPassword}
          />
          <br />

          <button onClick={signin}>Submit</button>
        </div>
      ) : (
        <div>
          <div>
            <button onClick={getUserInfo}>Fetch my profile</button>
          </div>
          <div>
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      )}
      <div
        style={{
          margin: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>Signup</h2>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setSignupUsername(e.target.value);
          }}
          value={signupUsername}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setSignupPassword(e.target.value);
          }}
          value={signupPassword}
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setSignupEmail(e.target.value);
          }}
          value={signupEmail}
        />
        <br />
        <button onClick={signup}>Submit</button>
      </div>
    </>
  );
}

export default App;
