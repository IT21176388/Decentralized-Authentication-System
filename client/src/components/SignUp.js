import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthenticationHash from "../utils/AuthenticationHash";
import "../App.css";

class SignUp extends Component {
  state = {
    username: "",
    password: "",
    confirmPassword: "",
    digicode: "",
    alertMessage: "",
    status: "",
    signedUp: false,
  };

  onSignUp = async () => {
    if (
      this.state.username !== "" &&
      this.state.password !== "" &&
      this.state.confirmPassword !== "" &&
      this.state.digicode !== ""
    ) {
      let username = this.state.username.trim();
      let password = this.state.password.trim();
      let digicode = this.state.digicode.trim();

      if (this.state.password !== this.state.confirmPassword) {
        this.setState({
          alertMessage: "Passwords do not match",
          status: "failed",
          password: "",
          confirmPassword: "",
          digicode: "",
        });
        return;
      }

      if (password.length < 8) {
        this.setState({
          alertMessage: "At least 8 characters for password",
          status: "failed",
          password: "",
          confirmPassword: "",
          digicode: "",
        });
        return;
      } else {
      }
      if (digicode.length !== 6) {
        this.setState({
          alertMessage: "6 digit required for digicode",
          status: "failed",
          digicode: "",
        });
        return;
      } else {
        let userAddress = await this.props.contract.methods
          .getUserAddress()
          .call({ from: this.props.account });

        if (userAddress !== "0x0000000000000000000000000000000000000000") {
          this.setState({
            alertMessage: "This account already exists",
            status: "failed",
            username: "",
            password: "",
            confirmPassword: "",
            digicode: "",
          });

          return;
        } else {
          let hash = await AuthenticationHash(
            username,
            this.props.account,
            password,
            digicode,
            this.props.web3
          );

          await this.props.contract.methods
            .register(hash)
            .send({ from: this.props.account });

          this.setState({
            username: "",
            password: "",
            confirmPassword: "",
            digicode: "",
            status: "success",
            alertMessage: "Signup successful",
            signedUp: true,
          });

          this.props.accountCreated(this.state.signedUp);
          return;
        }
      }
    }
  };

  render() {
    return (
      <div className="sign-up">
        <div className="signup-form">
          <h8 className="box-topic">Create an account</h8>

          <div>
            {this.state.alertMessage !== "" &&
            this.state.status === "failed" ? (
              <div>{this.state.alertMessage}</div>
            ) : this.state.alertMessage !== "" &&
              this.state.status === "success" ? (
              <div>{this.state.alertMessage}</div>
            ) : (
              console.log("")
            )}
            <div className="input-box">
              <input
                className="input-field"
                required
                type="text"
                placeholder="Username"
                value={this.state.username}
                autoComplete="username"
                onChange={(e) => this.setState({ username: e.target.value })}
              />
            </div>
            <div className="input-box">
              <input
                className="input-field"
                required
                type="password"
                placeholder="Password"
                value={this.state.password}
                autoComplete="new-password"
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </div>
            <div className="input-box">
              <input
                className="input-field"
                required
                type="password"
                placeholder="Confirm Password"
                value={this.state.confirmPassword}
                autoComplete="confirm-new-password"
                onChange={(e) =>
                  this.setState({ confirmPassword: e.target.value })
                }
              />
            </div>
            <div className="input-box">
              <input
                className="input-field"
                required
                type="text"
                placeholder="6 Digit Code"
                value={this.state.digicode}
                autoComplete="digicode"
                onChange={(e) => this.setState({ digicode: e.target.value })}
              />
            </div>
            <div className="buttonns">
              <button
                className="input-submit"
                type="submit"
                onClick={this.onSignUp}
              >
                Sign Up
              </button>
            </div>
          </div>
          <div className="signin-onUp">
            Already have an account?{" "}
            <Link to="/sign-in" className="sign-link">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
