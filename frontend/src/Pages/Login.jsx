import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import useInputFocus from "../Components/useInputFocus";
import authentication from "../assets/authentication.svg";
import loginImg from "../assets/login.jpg"

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useInputFocus();

  const [formData, setFormData] = useState({
    email: "",

    password: "",
  });

  const { isLoading, isError, user, msg } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(msg);
    }

    if (user) {
      toast.success("Login successful!");
      navigate("/");
    }

    return () => {
      dispatch(reset());
    };
  }, [isError, user, msg, dispatch, navigate]);

  const { email, password } = formData;

  //geting inputed data when change happen
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //handlesubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Fill all field");
    } else {
      dispatch(login(formData));
    }
  };

  if (isLoading) {
    return <h1>please wait.....</h1>;
  }
  return (
    <>
      <div className="l-form">
        <div className="shape1"></div>
        <div className="shape2"></div>

        <div className="form">
          <img src={loginImg} alt="" className="form__img" />

          <form action="" className="form__content" onSubmit={handleSubmit}>
            <h1 className="form__title">Welcome To Ginger Media</h1>

            <div className="form__div form__div-one">
              <div className="form__icon">
                <i className="bx bx-user-circle"></i>
              </div>

              <div className="form__div-input">
                <label htmlFor="username" className="form__label">
                   enter(gmail/Number)
                </label>
                <input
                  type="text"
                  className="form__input"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form__div">
              <div className="form__icon">
                <i className="bx bx-lock"></i>
              </div>

              <div className="form__div-input">
                <label htmlFor="password" className="form__label">
                  Enter Password
                </label>
                <input
                  type="password"
                  className="form__input"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <a href="#" className="form__forgot">
              Forgot Password?
            </a>

            <input type="submit" className="form__button" value="Login" />
            <p className="signup-link">
              Create a new account <Link to={"/signup"}>Sign Up</Link>
            </p>

            <div className="form__social">
              <span className="form__social-text">login with</span>

              <a href="#" className="form__social-icon">
                <i className="bx bxl-facebook"></i>
              </a>
              <a href="#" className="form__social-icon">
                <i className="bx bxl-google"></i>
              </a>
              <a href="#" className="form__social-icon">
                <i className="bx bxl-instagram"></i>
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
