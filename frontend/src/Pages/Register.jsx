import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useInputFocus from "../Components/useInputFocus";
import authentication from "../assets/authentication.svg";
import { register, reset } from "../features/auth/authSlice";
import loginImg from "../assets/login.jpg"


const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useInputFocus();

  const { isLoading, isError, isSucess, user, msg } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    dob: "",
    password: "",
  });

  const { name, email, contact, password, dob } = formData;

  useEffect(() => {
    if (isError) {
      toast.error(msg);
    }

    if (user) {
      toast.success("sucess");
      navigate("/");
    }
    dispatch(reset());
  }, [isError, user, isSucess, msg, dispatch, navigate]);

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

    if (!name || !email || !contact || !password || !dob) {
      toast.error("all field is required");
    } else {
      dispatch(register(formData));
    }
  };
  if (isLoading) {
    return <h1>Please Wait....</h1>;
  }

  return (
    <div className="l-form">
      <div className="shape1"></div>
      <div className="shape2"></div>

      <div className="form">
        <img src={loginImg} alt="" className="form__img" />

        <form action="" className="form__content" onSubmit={handleSubmit}>
          <h1 className="form__title">Sign Up</h1>

          {/* Name Input */}
          <div className="form__div">
            <div className="form__icon">
              <i className="bx bx-user-circle"></i>
            </div>
            <div className="form__div-input">
              <label htmlFor="name" className="form__label">
                Enter Name:
              </label>
              <input
                type="text"
                className="form__input"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="form__div">
            <div className="form__icon">
              <i className="bx bx-envelope"></i>
            </div>
            <div className="form__div-input">
              <label htmlFor="text" className="form__label">
                Email:
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

          {/* Phone No. Input */}
          <div className="form__div">
            <div className="form__icon">
              <i className="bx bx-phone"></i>
            </div>
            <div className="form__div-input">
              <label htmlFor="phone" className="form__label">
                Phone No.:
              </label>
              <input
                type="text"
                className="form__input"
                name="contact"
                // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                value={contact}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Date Input */}
          <div className="form__div">
            <div className="form__icon">
              <i className="bx bx-calendar"></i>
            </div>
            <div className="form__div-input">
              <label htmlFor="date" className="form__label"></label>
              <input
                type="date"
                className="form__input"
                name="dob"
                value={dob}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="form__div">
            <div className="form__icon">
              <i className="bx bx-lock"></i>
            </div>
            <div className="form__div-input">
              <label htmlFor="password" className="form__label">
                Password:
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

          {/* Confirm Password Input */}
          <div className="form__div">
            <div className="form__icon">
              <i className="bx bx-lock"></i>
            </div>
            <div className="form__div-input">
              <label htmlFor="confirmPassword" className="form__label">
                Confirm Password:
              </label>
              <input type="password" className="form__input" name="password" />
            </div>
          </div>

          <input type="submit" className="form__button" value="Sign Up" />
          <p className="signin-link">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>

          <div className="form__social">
            <span className="form__social-text">Sign up with</span>

            {/* Facebook Icon */}
            <a href="#" className="form__social-icon">
              <i className="bx bxl-facebook"></i>
            </a>

            {/* Google Icon */}
            <a href="#" className="form__social-icon">
              <i className="bx bxl-google"></i>
            </a>

            {/* Instagram Icon */}
            <a href="#" className="form__social-icon">
              <i className="bx bxl-instagram"></i>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
