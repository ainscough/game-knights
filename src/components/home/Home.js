import React, { PureComponent } from 'react';

export default class Home extends PureComponent {
  render() {
    return (
      <div className="Home">
        <h2>Welcome to Game Knights!</h2>
        {this.props.children}
      </div>
    );
  }
}
