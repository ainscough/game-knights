import React, { PureComponent } from 'react';
import { Button, Card, Grid, Form, Message, Step } from 'semantic-ui-react';
import autobind from 'class-autobind';
import db from '../../base';

export default class Auth extends PureComponent {
  constructor(){
    super();
    autobind(this);
  }

  state = { username: '', email: '', password: '', rePassword: '',
            isError:false, errHeader:'', errMessage:'',
            step1Active:true, step1Complete:false, step1Checking:false,
            step2Active:false, step2Complete:false, step3Active:false}

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleStep1Submit = e => {
    e.preventDefault()
    const { username, email, password, rePassword } = this.state

    this.setState({step1Checking:true});

    const re = /[a-zA-Z 0-9\-\_]+/;
    for (var i = 0, len = username.length; i < len; i++) {
        if (!re.test(username[i])) {
          this.setState({errHeader:"Unauthorized Character(s) in Username",
                         errMessage:"Only A-Z, numbers, underscores, and dashes are allowed.",
                         isError:true,
                         step1Checking:false })
                         return;
        }
    }

    const emailRe = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    if (!emailRe.test(email)){
      this.setState({errHeader:"Email Address Not Recognized",
                     errMessage:"Please use an recongnized email format: 'email@domain'.",
                     isError:true,
                     step1Checking:false  })
                     return;
    }

    if (username.length > 24 || username.length < 6) {
      this.setState({errHeader:"Username Too Short or Long",
                     errMessage:"Must be 6-24 characters in length.",
                     isError:true,
                     step1Checking:false  })
                     return;
    }


    if(password.valueOf() != rePassword.valueOf())
    {
      this.setState({errHeader:"Passwords Do Not Match",
                     errMessage:"Ensure you typed your password correctly both times.",
                     isError:true,
                     step1Checking:false })
                     return;
    }




    db.fetch(`profiles/${username}`, {
          context: this,
          asArray: true,
          then(data){
            if(data.length > 0){
              this.setState({errHeader:"Username Already Exists",
                             errMessage:"Please choose another username.",
                             isError:true,
                             step1Checking:false })
                             return;
            }
            else{
              db.createUser({
                  email,
                  password
              }, this.createUserHandler);
            }
          }
        });
  }

  createUserHandler(error, userFB){

    if(error){
      console.log("error:", error.code);
      switch(error.code){
        case "auth/email-already-in-use":
          this.setState({errHeader:"E-mail Already Taken",
                         errMessage:"Please use another E-mail address.",
                         isError:true,
                         step1Checking:false})
          break;
          case "auth/invalid-email":
            this.setState({errHeader:"E-mail Address Not Valid",
                           errMessage:"Please ensure your email address is typed correctly (including the domain)",
                           isError:true,
                           step1Checking:false})
            break;
        default:
          this.setState({errHeader:error.code,
                         errMessage:error.message,
                         isError:true,
                         step1Checking:false})
      }

    }
    else{
      this.setState({ isError:false,
                      step1Active:false,
                      step1Checking:false,
                      step1Complete:true,
                      step2Active:true})
      const { username, email } = this.state;
      const profile = {
        username,
        email,
        userKey: userFB.uid
      }
      this.props.createUser(profile);
    }

  }


  render() {
    const {
            isError, errHeader, errMessage,
            step1Active, step1Complete, step1Checking,
            step2Active, step2Complete,
            step3Active } = this.state
    return (

        <Grid padded columns={3}>
          <Grid.Row centered>
            <Step.Group ordered>
              <Step active={step1Active} completed={step1Complete}>
                <Step.Content>
                  <Step.Title>Account Information</Step.Title>
                  <Step.Description>Enter Your Details</Step.Description>
                </Step.Content>
              </Step>
              <Step active={step2Active} completed={step2Complete}>
                <Step.Content>
                  <Step.Title>Profile Setup</Step.Title>
                  <Step.Description>Who You Want To Be</Step.Description>
                </Step.Content>
              </Step>
              <Step active={step3Active}>
                <Step.Content>
                  <Step.Title>Interests</Step.Title>
                  <Step.Description>What Content You Want To See</Step.Description>
                </Step.Content>
              </Step>
            </Step.Group>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column/>
             {step1Complete ? null :
               <Grid.Column>
                 <Card fluid>
                    <Card.Content>
                      <Form error={isError} onSubmit={this.handleStep1Submit}>
                        <Form.Input required name='username' label='Username' placeholder='Username' onChange={this.handleChange}/>
                        <Form.Input required name='password' label='Password' placeholder='Password' onChange={this.handleChange}/>
                        <Form.Input required name='rePassword' placeholder='Re-Type Password' onChange={this.handleChange}/>
                        <Form.Input required name='email' label='E-mail Address' placeholder='E-mail Address' onChange={this.handleChange}/>
                        <Message
                          error>
                          <Message.Header>{errHeader}</Message.Header>
                          <p>{errMessage}</p>
                        </Message>
                        <Button color="blue" floated="right" onClick={this.checkUsername}>Fetch</Button>
                        <Button color="blue" loading={step1Checking} floated="right" type='submit'>Next</Button>
                      </Form>
                    </Card.Content>
                    <Card.Content extra>
                        By signing up, you agree to our <u><a href="/help/terms">Terms</a></u> and that you have read our <u><a href="/terms/privacy">Privacy Policy</a></u> and <u><a href="/help/content">Content Policy</a></u>.
                    </Card.Content>
                  </Card>
                </Grid.Column>
              }

            </Grid.Row>

        </Grid>




    );
  }
}
