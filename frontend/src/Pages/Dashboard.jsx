import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import userI from "../user.jpg";

import { update, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import userPic from "../assets/userpic.jpg";
import authentication from "../assets/authentication.svg";
import useInputFocus from "../Components/useInputFocus";
import loginImg from "../assets/login.jpg"


// import "../css/register.css";
// import "../css/dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useInputFocus();
  const { user, isLoading } = useSelector((state) => state.auth);

  const [edit, setEdit] = useState(false);

  const [formData, setFormData] = useState({
    name: user ? user.name : " ",
    email: user ? user.email : " ",
    contact: user ? user.contact : " ",
    dob: user ? user.dob : " ",
    password: user ? user.password : " ",
  });
  const { name, email, contact, password, dob } = formData;

  useEffect(() => {
    console.log(user);
    if (!user) {
      navigate("/login");
    }

    // dispatch(getContact());

    // return () => {
    //   dispatch(reset());
    // };
  }, [user, dispatch, navigate]);

  const calculateAge = (dob) => {
    const dobDate = new Date(dob);
    const currentDate = new Date();

    let age = currentDate.getFullYear() - dobDate.getFullYear();

    // Adjust age if the current date hasn't reached the birthdate yet this year
    if (
      currentDate.getMonth() < dobDate.getMonth() ||
      (currentDate.getMonth() === dobDate.getMonth() &&
        currentDate.getDate() < dobDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleSubmit = (e) => {
    console.log("called");
    e.preventDefault();

    if (!name || !email || !contact || !password || !dob) {
      toast.error("all field is required");
    } else {
      dispatch(update(formData));
      setEdit(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  if (isLoading) {
    return <h1>Please Wait.....</h1>;
  }
  return !edit ? (
    <div className="l-form">
      <div className="shape1"></div>
      <div className="shape2"></div>

      <div className="profile">
        <img src={userPic} alt="User" className="profile__img" />
        {user && (
          <div className="profile__details">
            <h1 className="profile__name">{user.name}</h1>
            <div className="profile__info">
              <div className="profile__info-item">
                <span className="profile__label">Email:</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="profile__value">{user.email}</span>
              </div>

              <div className="profile__info-item">
                <span className="profile__label">Phone No:</span>
                <span className="profile__value">{user.contact}</span>
              </div>

              <div className="profile__info-item">
                <span className="profile__label">Age:</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span className="profile__value">{calculateAge(user.dob)}</span>
              </div>
            </div>
            {/* <button
              className="profile__button"
              onClick={() => {
                setEdit(true);
              }}
            >
              Edit Profile
            </button> */}

            <div
              className="profile__button"
              onClick={() => {
                setEdit(true);
              }}
            >
              {" "}
              Update Profile
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="l-form">
      <div className="shape1"></div>
      <div className="shape2"></div>

      <div className="form">
        <img src={loginImg} alt="" className="form__img" />
        {user && (
          <form action="" className="form__content" onSubmit={handleSubmit}>
            <h1 className="form__title">Update Profile</h1>

            {/* Name Input */}
            <div className="form__div">
              <div className="form__icon">
                <i className="bx bx-user-circle"></i>
              </div>
              <div className="form__div-input">
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
                <input
                  type="date"
                  className="form__input"
                  name="dob"
                  value={dob}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button className="form__button"> Edit Profile</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
