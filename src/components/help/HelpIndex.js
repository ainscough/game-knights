import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';
export default class HelpIndex extends Component {
  render() {
    return (
      <Container text>
        <Header as='h2'>Help</Header>
        <p>Please select a topic from the left</p>
      </Container>
    )
  }
}
