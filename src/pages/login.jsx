import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/login.css";
import "../css/login_animations.css";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const existDialog = useRef();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((authInfo) => {
        if (authInfo.token) {
          localStorage.setItem("user_token", JSON.stringify(authInfo));
          navigate("/home");
        } else {
          existDialog.current.showModal();
        }
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(true);
    }, 500);

    const formTimer = setTimeout(() => {
      setShowLoginForm(true);
    }, 1000); // Delay the login form by 1 second

    return () => {
      clearTimeout(timer);
      clearTimeout(formTimer);
    };
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="container--login">
      <dialog className="dialog dialog--auth" ref={existDialog}>
        <div>User does not exist</div>
        <button className="button--close" onClick={() => existDialog.current.close()}>
          Close
        </button>
      </dialog>
      <div className="logo-container">
        {showLogo && (
          <div className="fade-in">
            <img src="src/assets/Your_paragraph_text-removebg-preview.png" alt="HXNTER" />
          </div>
        )}
      </div>
      {showLoginForm && (
        <section className="login-section slide-in">
          <h1 className="text-4xl mb-6 text-center">Welcome to HXNTER</h1>
          <form className="form--login" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="inputUsername" className="form-label">
                Username
              </label>
              <input
                type="username"
                id="inputUsername"
                value={username}
                onChange={(evt) => setUsername(evt.target.value)}
                className="form-control"
                placeholder="Enter your username"
                required
                autoFocus
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword" className="form-label">
                Password
              </label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="inputPassword"
                  value={password}
                  onChange={(evt) => setPassword(evt.target.value)}
                  className="form-control"
                  placeholder="Enter your password"
                />
                <button type="button" className="password-toggle" onClick={togglePasswordVisibility}>
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-4">
              Sign in
            </button>
          </form>
          <div className="loginLinks mt-4 text-center">
            <p>Not a member yet?</p>
            <Link className="text-blue-600 hover:text-blue-800 visited:text-purple-600" to="/register">
              Register here
            </Link>
          </div>
        </section>
      )}
    </main>
  );
};
