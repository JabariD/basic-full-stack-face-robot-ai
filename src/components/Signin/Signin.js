import React from 'react';
import axios from 'axios';

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
        }
    }


    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = () => {
        axios({
            method: 'post',
            url: 'http://localhost:3000/signin',
            data: {
                email: this.state.signInEmail,
                password: this.state.signInPassword
            }
          })
          .then(response => {
              if (response.data.id) {
                this.props.loadUser(response.data);
                this.props.onRouteChange('home');
              }
          });
    }

    render() {  
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                    </div>
                    <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                    </div>
                </fieldset>
                <div className="">
                    <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
                </div>
                <div className="lh-copy mt3">
                    <p onClick={() => this.props.onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                </div>
                </div>
            </main>
        </article>
    
        )
    }
}

export default Signin;

/*
NOTE: The difference between
onRouteChange('home') ------> Run this function everytime this is rendered.
vs
() => onRouteChange('home') -------> Run this function only when it's clicked

*/
