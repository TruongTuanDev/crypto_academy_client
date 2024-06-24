import React, { useState, useEffect, useRef } from "react";
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import logo from "../../assets/images/logo.png";
import QR from "../../assets/images/QR.jpg";
import GoogleIcon from "../../assets/images/google.jpg";
import faceIcon from "../../assets/images/facebook.png";
import AuthService from "../../services/Auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        Ô này không được để trống!
      </div>
    );
  }
};

const validPhone = (value) => {
  if (value.length < 10 || value.length > 12) {
    return (
      <div className="invalid-feedback d-block">
        Số điện thoại không hợp lệ
      </div>
    );
  }
};

const validPassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="invalid-feedback d-block">
        Độ dài mật khẩu phải nằm trong khoảng 6-40 kí tự
      </div>
    );
  }
};

const Login = (props) => {
  const [error, setError] = useState(null);
  const form = useRef();
  const checkBtn = useRef();

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("")
  const onChangePhone = (e) => {
    const phone = e.target.value;
    setPhone(phone);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };


  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleLogin= (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    // form.current.validateAll();

      AuthService.register(phone,password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 section-first">
          <div className="row d-flex flex-column">
            <div className="header-register w-100 text-center d-flex justify-content-start">
              <img src={logo} alt="Logo" className="me-5" />
              <div className="d-flex flex-row justify-content-center">
                <div
                  href="#"
                  className="pe-4 me-4 border-end d-inline-flex align-items-center"
                >
                  Tiếng Việt
                </div>
                <div href="#" className="d-inline-flex align-items-center">
                  English
                </div>
              </div>
            </div>
            <div className="form-register container-fluid d-flex justify-content-center align-items-center ">
              <div className="col-md-6 ">
                <div className="text-center mb-4 mt-2">
                  <h2>Đăng nhập <br/> 
                  để kết nối với chúng tôi</h2>
                  <p>
                    Nhận miễn phí <strong>500,000đ</strong> để bắt đầu
                  </p>
                </div>
                <form onSubmit={handleLogin} ref={form}>
                  {!successful && (
                    <div>
                      <div className="form-group mb-3">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Số điện thoại"
                            name="phone"
                            value={phone}
                            onChange={onChangePhone}
                            validations={[required, validPhone]}
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Mật khẩu"
                          value={password}
                          onChange={onChangePassword}
                          validations={[required, validPassword]}
                        />
                      </div>
                      
                      
                     
                     
                      <div className="form-group mb-3">
                        <button type="submit" className="btn btn-register w-100">
                          Đăng nhập tài khoản
                          
                        </button>
                      </div>
                    </div>
                  )}
                  {message && (
                    <div className="form-group">
                      <div
                        className={successful ? "alert alert-success" : "alert alert-danger"}
                        role="alert"
                      >
                        {message}
                      </div>
                    </div>
                  )}
                  
                  {/* <checkButton style={{ display: "none" }} ref={checkBtn} /> */}
                  <Divider sx={{ my: 2}} className="mt-4">hoặc</Divider>
                  <div className="form-group mb-3">
            <button type="submit" className="btn w-100 d-flex align-items-center justify-content-center border">
                <img src={GoogleIcon} alt="GoogleIcon" className="me-auto" height={20} />
                <span className="position-absolute w-100 text-center">
                            Tiếp tục với <strong>Google</strong>
                          </span>
            </button>
            </div>
            <div className="form-group mb-3">
            <button type="submit" className="btn w-100 d-flex align-items-center justify-content-center border">
                <img src={faceIcon} alt="faceIcon" className="me-auto" height={20} />
                <span className="position-absolute w-100 text-center">
                            Tiếp tục với <strong>Facebook</strong>
                          </span>
            </button>
            </div>
                </form>
                <div className="text-center mt-3">
                  <p>
                    Bạn chưa có tài khoản? <a href="#">Đăng kí</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 section-second text-center">
        <div className="text-center mb-4 ">
        <img src={logo} alt="faceIcon" className="me-auto custom-margin-logo" height={150} />
        <h2>Đăng nhập tài khoản </h2>
        <div className="row mt-5">
        <div className="col-md-6">
        <h4 >Quét mã QR </h4>
            <img src={QR} alt="faceIcon" className="me-auto" height={250} />
            <p className="mt-4">
            Sử dụng <strong>ứng dụng</strong> để quét mã <strong>QR</strong>
            </p>
        </div>
        <div className="col-md-6 mt-2">
        <h4>Hướng dẫn quét </h4>
           <p className="text-start">
            <i><strong>B1:</strong> Truy cập và mở công cụ <strong>Quét QR</strong> trực tuyến của chúng tôi.</i>
           </p>
           <p className="text-start">
            <i><strong>B2:</strong> Nhấp vào tùy chọn<strong> “Quét mã QR”</strong> có sẵn trong công cụ của chúng tôi.</i>
           </p>
           <p className="text-start">
            <i><strong>B3:</strong> Hướng máy ảnh của bạn vào <strong>mã QR</strong> mà bạn muốn quét.</i>
           </p>
           <p className="text-start">
            <i><strong>B4:</strong> Giữ chắc điện thoại và đợi <strong>Camera</strong> quét, vậy là đăng nhập thành công</i>
           </p>
        </div>
        </div>
        <div className="mt-5">
          <h3><i>Nhanh tay nhận quà liền tay từ Crypto nào!</i></h3>
        </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Login;