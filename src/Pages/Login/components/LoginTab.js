import React, { Component } from "react";
import "./LoginTab.scss";

export default class LoginTab extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      disabled: false,
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    fetch("http://10.58.6.1:8000/user/signin", {
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  render() {
    return (
      <div className="LoginTab">
        <div className="loginTabContainer">
          <div className="loginInput">
            <div className="loginEmail">
              <input
                name="email"
                type="email"
                placeholder="EMAIL"
                onChange={this.handleChange}
              />
            </div>
            <div className="loginPw">
              <input
                name="password"
                type="password"
                placeholder="PASSWORD"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="checkBtn">
            <span className="stayBtn">
              <input id="staySignUp" type="checkbox"></input>
              <label for="staySignUp">STAY SIGN UP</label>
            </span>
            <button className="forgotPw">FORGOT PASSWORD?</button>
          </div>
          <div className="submitBtn">
            <button onClick={this.handleSubmit} disabled={this.state.disabled}>
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    );
  }
}
//https://developer.mozilla.org/ko/docs/Web/HTML/Element/label  라벨
//https://www.w3schools.com/tags/tag_label.asp
//https://blueshw.github.io/2020/05/09/know-html-semantic-elements/ 시멘틱태그 블로그
//https://ofcourse.kr/html-course/form-%ED%83%9C%EA%B7%B8  input 종류

//placeholder 위로 조금만 올려야돼
