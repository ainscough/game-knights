import React, { PureComponent } from 'react';
import { Advertisement, Card, Grid, Message, Rail, Segment } from 'semantic-ui-react';
import FeedContainer  from '../../containers/feed/FeedContainer'
import autobind from 'class-autobind';

export default class Home extends PureComponent {
  constructor(){
    super();
    autobind(this);
  }

  state = {isDismissed : false};

  handleDismiss() {
    const { isDismissed } = this.state;
    this.setState({isDismissed : true});
  }

  render() {
  const { isLoggedIn } = this.props;
  const { isDismissed } = this.state;
    return (
      <div>
        { isLoggedIn || isDismissed ? null :
          <Grid padded columns={2} centered>
          <Grid.Column>
            <Message info onDismiss={this.handleDismiss}>
              <Message.Header>New to Game Knights?</Message.Header>
              <p>This is your source for all things board game - articles, reviews, discussions, and tools - all consolidated in one place! Level up your stats, earn badges, and unlock rewards as you contribute to the community!</p>
              <p>Follow our <a href="/help/guide"><u><b>Guide</b></u></a> for more info or <a href="/auth"><u><b>Join Us</b></u></a>. </p>
            </Message>
          </Grid.Column>
        </Grid>
        }
        <FeedContainer/>
      </div>
    );
  }
}
