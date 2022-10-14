import React, { useState } from "react";
import { forgotPassword } from "api/auth";

import "./style.css";

const ResetPassword = () => {
  const [values, setValues] = useState({
    newPassword: "",
    repeatPassword: "",
    loading: "",
    error: "",
    success: false,
  });

  const { newPassword, repeatPassword, error, loading, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    setValues({ ...values, loading: "loading" });

    if (!newPassword && !repeatPassword )  {
      return setValues({
        ...values,
        loading: "",
        success: false,
        error: "Fill all the fields",
      });
    }

    // if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    //   console.log("Please enter a valid email address");
    //   return setValues({
    //     ...values,
    //     loading: "",
    //     success: false,
    //     error: "Enter valid email",
    //   });
    // }
    try {
      const data = await forgotPassword(email);

      if (data.error) {
        console.log(data.error);
        return setValues({
          ...values,
          loading: "",
          success: false,
          error: data.error,
        });
      }
      return setValues({
        ...values,
        loading: "",
        success: true,
        error: "",
      });
    } catch (error) {
      return setValues({
        ...values,
        loading: "",
        success: false,
        error: error,
      });
    }
  };

  const errorMessage = () => {
    return (
      <div className="errorMessage-sec">
        <div
          className="errorMessage-cross-sec"
          onClick={() => setValues({ ...values, error: "" })}
        >
          <div className="errorMessage-cross-one"></div>
          <div className="errorMessage-cross-two"></div>
        </div>
        <div className="errorMessage-msg-sec">
          <p className="errorMessage-msg">{error}</p>
        </div>
      </div>
    );
  };
  return (
    <section className="login-section">
      <div className="login-bg-background"></div>
      <div className="wrap login-wrap">
        <div className="popup-small-sec login-popup">
          <div className="popup-group">
            <div className="popup-head-sec login-head-sec">
              <h1 className="popup-header">Reset Password</h1>
              <p className="popup-header-p">Please enter your new password</p>
            </div>

            <div className="popup-form">
              <div className="popup-form-single-group">
                <div className="popup-form-group">
                  <label className="popup-form-label">New Password</label>
                  <input
                    type="password"
                    className="popup-form-input"
                    onChange={handleChange("newPassword")}
                    value={newPassword}
                  />
                </div>
                <div className="popup-form-group">
                  <label className="popup-form-label">Repeat Password</label>
                  <input
                    type="password"
                    className="popup-form-input"
                    onChange={handleChange("repeatPassword")}
                    value={repeatPassword}
                  />
                </div>
              </div>
              {/* <p className="popup-header-p">
                {success && (
                  <p className="popup-header-p">
                    A one time password reset link has being send to your email,
                    You may go through the link and reset the password.{" "}
                    <b>Note: The link is valid only for 15minutes</b>
                  </p>
                )}
              </p> */}
              <button
                className="popup-form-btn login-popup-btn"
                onClick={onSubmit}
              >
                Change
              </button>
            </div>
          </div>
        </div>
        {error && errorMessage()}
      </div>
    </section>
  );
};

export default ResetPassword;
