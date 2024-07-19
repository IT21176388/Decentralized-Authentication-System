import React, { Component } from "react";
import web3Connection from "./web3Connection";
import Contract from "./Contract";
import Formate from "./utils/Formate";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import UserAccount from "./components/UserAccount";
import "./App.css";

class App extends Component {
  state = {
    web3: null,
    account: null,
    contract: null,
    balance: null,
    activeItem: "home",
    signedUp: false,
    loggedIn: false,
    username: "",
  };

  handleItemClick = (name) => {
    this.setState({ activeItem: name });
  };

  componentDidMount = async () => {
    try {
      const web3 = await web3Connection();
      const contract = await Contract(web3);
      const accounts = await web3.eth.getAccounts();

      this.setState({ web3, contract, account: accounts[0] }, this.start);
    } catch (error) {
      alert(`Failed to load web3`);
      console.error(error);
    }

    await this.getAccount();
  };

  start = async () => {
    await this.getAccount();
    const { web3, contract, account } = this.state;

    console.log("web3 =", web3);
    console.log("Contract =", contract);
    console.log("Acoount =", account);
  };

  getAccount = async () => {
    if (this.state.web3 !== null || this.state.web3 !== undefined) {
      await window.ethereum.on("accountsChanged", async (accounts) => {
        this.setState({
          account: accounts[0],
          loggedIn: false,
        });

        this.state.web3.eth.getBalance(accounts[0], (err, balance) => {
          if (!err) {
            this.setState({
              balance: Formate(this.state.web3.utils.fromWei(balance, "ether")),
            });
          }
        });
      });
    }
  };

  accountCreated = async (signedUp) => {
    this.setState({ signedUp });
  };

  userSignedIn = async (loggedIn, username) => {
    this.setState({ loggedIn, username });
  };

  loggedOut = async (loggedIn) => {
    this.setState({ loggedIn });
  };

  render() {
    const { activeItem } = this.state;

    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <div className="main-page">
          <BrowserRouter>
            <nav className="home-nav">
              <ul>
                <li
                  className={activeItem === "home" ? "active" : ""}
                  onClick={() => this.handleItemClick("home")}
                >
                  <Link to="/">Home</Link>
                </li>
                <li
                  className={activeItem === "help" ? "active" : ""}
                  onClick={() => this.handleItemClick("help")}
                >
                  <Link to="/help">Help</Link>
                </li>
                {this.state.loggedIn && (
                  <li
                    className={activeItem === "user account" ? "active" : ""}
                    onClick={() => this.handleItemClick("user account")}
                  >
                    <Link to="/user-account">User Account</Link>
                  </li>
                )}
                {!this.state.loggedIn && (
                  <li
                    className={activeItem === "sign in" ? "active" : ""}
                    onClick={() => this.handleItemClick("sign in")}
                  >
                    <Link to="/sign-in">Sign In</Link>
                  </li>
                )}
                {this.state.loggedIn ? (
                  <li
                    className={activeItem === "sign out" ? "active" : ""}
                    onClick={() => this.handleItemClick("sign out")}
                  >
                    <Link to="/sign-out">Sign Out</Link>
                  </li>
                ) : (
                  <li
                    className={activeItem === "sign up" ? "active" : ""}
                    onClick={() => this.handleItemClick("sign up")}
                  >
                    <Link to="/sign-up">Sign Up</Link>
                  </li>
                )}
              </ul>
            </nav>

            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/help">
                <h2>Help page</h2>
              </Route>
              {this.state.loggedIn ? (
                <Route path="/user-account">
                  <UserAccount
                    account={this.state.account}
                    username={this.state.username}
                  />
                </Route>
              ) : (
                <Route path="/user-account" className="pgpgmessage">
                  You have been logged out.
                </Route>
              )}
              {
                <Route path="/sign-in">
                  {this.state.loggedIn ? (
                    <Redirect to="/user-account" />
                  ) : (
                    <SignIn
                      web3={this.state.web3}
                      contract={this.state.contract}
                      account={this.state.account}
                      signedUp={this.state.signedUp}
                      userSignedIn={this.userSignedIn}
                    />
                  )}
                </Route>
              }

              {this.state.loggedIn ? (
                <Route path="/sign-out">
                  <SignOut loggedOut={this.loggedOut} />
                </Route>
              ) : (
                <Route path="/sign-out" className="pgpgmessage">
                  You've been logged out. <br></br>
                  Thank you!
                </Route>
              )}
              {
                <Route path="/sign-up">
                  <SignUp
                    web3={this.state.web3}
                    contract={this.state.contract}
                    account={this.state.account}
                    accountCreated={this.accountCreated}
                  />
                </Route>
              }
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
