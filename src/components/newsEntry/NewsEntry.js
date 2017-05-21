import React, { Component } from 'react';
import { Button, Card, Grid, Header, Icon, Label, List, Popup } from 'semantic-ui-react';
import TimeAgo from 'timeago-react';

export default class NewsEntry extends Component {
  render() {
    const { info } = this.props;
    return (
      <Card fluid>
          <Card.Content
            href="https://www.reddit.com"
            target="_blank">
            <Card.Header>
              {info.header}
            </Card.Header>
            <Card.Meta>
              <TimeAgo datetime={info.postTime}/>
            </Card.Meta>
            <Card.Description>
              {info.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <List horizontal floated="left">
              <List.Item>
                <Label>
                  <Icon name="empty star"/>
                    {info.likes}
                </Label>
              </List.Item>
              <List.Item>
                <Label>
                  <Icon name="comment"/>
                    {info.likes}
                </Label>
              </List.Item>
            </List>
            <List horizontal floated="right">
              <List.Item>

                <Popup
                    trigger={
                      <Label>
                        <Icon name="tag"/>
                      </Label>}
                    flowing
                    hoverable
                  >
                    <Grid centered divided columns={3}>
                      <Grid.Column textAlign='center'>
                        <Header as='h4'>Basic Plan</Header>
                        <p><b>2</b> projects, $10 a month</p>
                        <Button>Choose</Button>
                      </Grid.Column>
                      <Grid.Column textAlign='center'>
                        <Header as='h4'>Business Plan</Header>
                        <p><b>5</b> projects, $20 a month</p>
                        <Button>Choose</Button>
                      </Grid.Column>
                      <Grid.Column textAlign='center'>
                        <Header as='h4'>Premium Plan</Header>
                        <p><b>8</b> projects, $25 a month</p>
                        <Button>Choose</Button>
                      </Grid.Column>
                    </Grid>
                  </Popup>
              </List.Item>
            </List>
          </Card.Content>
      </Card>
    );
  }
}
