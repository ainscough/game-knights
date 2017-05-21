import React, { Component } from 'react';
import { Grid, Rail, Segment } from 'semantic-ui-react';
import { Link } from 'react-router';

export default class Help extends Component {
  render() {
    return (
      <Grid centered columns={2}>
        <Grid.Column>
          <Segment>
            <Rail close position='left'>
              <Segment.Group>
                <Segment> <Link to="/help/guide">Guide</Link></Segment>
                <Segment> <Link to="/help/faq">FAQ</Link></Segment>
                <Segment> <Link to="/help/aboutUs">About Us</Link></Segment>
              </Segment.Group>
              <Segment.Group>

                <Segment> <Link to="/help/terms">Terms</Link></Segment>
                <Segment> <Link to="/help/content">Content</Link></Segment>
                <Segment> <Link to="/help/privacy">Privacy</Link></Segment>

              </Segment.Group>

            </Rail>
            {React.cloneElement(this.props.children.props.children, ...this.props)}



          </Segment>
        </Grid.Column>
      </Grid>


    )
  }
}
