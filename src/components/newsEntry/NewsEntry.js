import React, { Component } from 'react';
import { Card, Icon, Label, List } from 'semantic-ui-react';

export default class NewsEntry extends Component {
  render() {
    const { info } = this.props;

    return (
        <Card
          fluid={true}
          raised={true}>

          <Card.Content>
            <Card.Header>
              {info.header}
            </Card.Header>
            <Card.Meta>
              {info.postTime}
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
                <Label>
                  <Icon name="tag"/>
                </Label>

              </List.Item>
            </List>
          </Card.Content>
        </Card>
    );
  }
}
