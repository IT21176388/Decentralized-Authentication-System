import React, { Component } from "react";
import { Card, Grid, Message, Image } from "semantic-ui-react";
import "../App.css";

class UserAccount extends Component {
  render() {
    return (
      <div className="user-account">
        <Grid centered stackable>
          <Grid.Row>
            <Grid.Column>
              <Card fluid>
                <Image
                  // src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                  src="https://react.semantic-ui.com/images/avatar/large/elyse.png"
                  wrapped
                  ui={false}
                  className="image-card"
                />
                <Card.Content>
                  <Card.Header>{this.props.username}</Card.Header>
                  <Card.Meta>
                    <span>User</span>
                  </Card.Meta>
                  <Card.Description>
                    <strong>
                      {this.props.username.charAt(0).toUpperCase() +
                        this.props.username.toLowerCase().slice(1)}
                    </strong>{" "}
                    is a Student in ABC University.
                    <br></br>
                    <a href="https://www.linkedin.com/" target="blank">
                      LinkedIn Profile
                    </a>
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Message size="mini">
                    {this.props.account.toLowerCase()}
                  </Message>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default UserAccount;
