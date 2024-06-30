import React, { useState, useEffect, useRef } from "react";
import logo from "../../assets/images/logo.png";
import investImg from "../../assets/images/icon-signup.png"
import { fetchCountrys } from "../../services/CountryAPI";
import AuthService from "../../services/Auth";
import QR from "../../assets/images/QR.jpg";
import apple from "../../assets/images/apple.svg";
import android from "../../assets/images/google.svg";
import { useNavigate } from 'react-router-dom';


const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">Ô này không được để trống!</div>
    );
  }
};

const validFullName = (value) => {
  if (value.length < 3 || value.length > 20) {
    return <div className="invalid-feedback d-block">Tên không hợp lệ</div>;
  }
};

const validPhone = (value) => {
  if (value.length < 10 || value.length > 12) {
    return (
      <div className="invalid-feedback d-block">Số điện thoại không hợp lệ</div>
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


const Register = (props) => {

  const [countrys, setCountrys] = useState([]);
  const [error, setError] = useState(null);
  const form = useRef();

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const navigate = useNavigate();




  const onChangeFullName = (e) => {
    const fullName = e.target.value;
    setFullName(fullName);
  };

  const onChangePhone = (e) => {
    const phone = e.target.value;
    setPhone(phone);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeRePassword = (e) => {
    const rePassword = e.target.value;
    setRePassword(rePassword);
  };

  const onChangeCountry = (event) => {
    const country = event.target.value;
    setSelectedCountry(country);
  };

  useEffect(() => {
    const getCountrys = async () => {
      try {
        const data = await fetchCountrys();
        if (Array.isArray(data)) {
          setCountrys(data);
        } else {
          setError(new Error("Received data is not an array"));
        }
      } catch (error) {
        setError(error);
      }
    };

    getCountrys();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    // form.current.validateAll();
    AuthService.register(phone, fullName, password,rePassword, selectedCountry).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
        alert("Đăng ký thành công")
        navigate('/login');
      },
      (error) => {
        console.error(phone, fullName, password, selectedCountry);
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
                <div className="text-center mb-4">
                  <h2>Tham gia huấn luyện trước cuộc phiêu lưu</h2>
                  <p>
                    Nhận miễn phí <strong>500,000đ</strong> để bắt đầu
                  </p>
                </div>
                <form onSubmit={handleRegister} ref={form}>
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
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Nhập lại mật khẩu"
                          value={rePassword}
                          onChange={onChangeRePassword}
                          validations={[required, validPassword]}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Tên đầy đủ"
                          value={fullName}
                          onChange={onChangeFullName}
                          validations={[required, validFullName]}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <select
                          className="form-control"
                          value={selectedCountry}
                          onChange={onChangeCountry}
                        >
                          <option value="">Select a country</option>
                          <option value="240">Việt Nam</option>
                          {countrys &&
                            countrys.length > 0 &&
                            countrys
                              .filter((country) => country.id !== 240)
                              .map((country) => (
                                <option key={country.id} value={country.id}>
                                  {country.native}
                                </option>
                              ))}
                        </select>
                      </div>
                      <div className="form-group form-check mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="termsCheck"
                          required
                        />
                        <label
                          className="form-check-label"
                          htmlFor="termsCheck"
                        >
                          Bằng việc đăng ký, bạn đồng ý với{" "}
                          <a href="#">Điều khoản</a> và <a href="#">Quy định</a>{" "}
                          của chúng tôi.
                        </label>
                      </div>
                      <div className="form-group mb-3">
                        <button
                          type="submit"
                          className="btn btn-register w-100"
                        >
                          Đăng ký tài khoản
                        </button>
                      </div>
                    </div>
                  )}
                  {message && (
                    <div className="form-group">
                      <div
                        className={
                          successful
                            ? "alert alert-success"
                            : "alert alert-danger"
                        }
                        role="alert"
                      >
                        {message}
                      </div>
                    </div>
                  )}

                  {/* <checkButton style={{ display: "none" }} ref={checkBtn} /> */}
                </form>
                <div className="text-center mt-3">
                  <p>
                    Bạn đã có tài khoản? <a href="#">Đăng nhập</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 section-second">
          <div className="row d-flex flex-column">
            <div className="col-md-6 w-100 section-second-top mb-5">
              <div class="d-flex flex-row justify-content-center m-3">
                <div className="pe-4 me-4 border-end d-flex flex-column align-items-center">
                  <p className="mb-0" style={{fontSize: 56  + 'px'}}>7 tỷ</p>
                  <p className="mb-0">Người tin tưởng</p>
                </div>
                <div href="#" className="d-flex flex-column align-items-center">
                  <p style={{fontSize: 56  + 'px'}} className="mb-0">hơn 200</p>
                  <p className="mb-0">Quốc gia</p>
                </div>
              </div>
              <div className="d-flex w-100 justify-content-center mt-4">
                <img width="300px" height="190px" src={investImg}></img>
              </div>  
            </div>
            <div className="col-md-6 w-100 section-second-bottom">
                <div className="d-flex justify-content-center align-items-center text-center w-100">
                    <p style={{fontSize: 24  + 'px'}}>Quét mã QR để tải ứng dụng ONUS</p>
                </div>
                <div className="container d-flex justify-content-center">
                <div className="row ml-5">
                  <div className="col-md-6 mr-5">
                    <img width="164px" height="164px" src={QR}></img>
                  </div>
                  <div className="col-md-6 d-flex flex-column justify-content-center p-4">
                    <img width="140px" className="mb-3" height="50px" src={apple}></img>
                    <img width="140px" height="50px" src={android}></img>
                  </div>
                </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
