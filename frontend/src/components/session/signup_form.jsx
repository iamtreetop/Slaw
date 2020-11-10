import React from 'react';
import { withRouter } from 'react-router-dom';
import "./signup_form.css"

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      handle: '',
      password: '',
      password2: '',
      errors: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push('/channels');
    }

    this.setState({errors: nextProps.errors})
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      handle: this.state.handle,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.signup(user, this.props.history).then(
      (action) => {
        if (Object.values(this.props.errors).length === 0) {
          let userLogin = {
            email: user.email,
            password: user.password
          };
          this.props.login(userLogin);
        }
      }
    )
  }

  renderErrors() {
    return(
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    // let errors = this.props.errors.map((error)=>{
    //   return (
    //     <li>error</li>
    //   )
    // })
    return (
      <div className="signup-bg-image">
        <div className="signup-container">
          <form className=".signup-form-wrapper" onSubmit={this.handleSubmit}>
            <div className="signup-form">
              <h2>Sign Up to the Slaw Community</h2>
                <div className="signup-inputs-wrapper">
                  <label className="signup-label">EMAIL</label>
                  <input className="signup-input-field"  
                    type="email"
                    required={true}
                    value={this.state.email}
                    onChange={this.update('email')}
                    // placeholder="Email"
                  />
                <br/>
                  <label className="signup-label">HANDLE</label>
                  <input className="signup-input-field" 
                    type="text"
                    required={true}
                    value={this.state.handle}
                    onChange={this.update('handle')}
                    // placeholder="Handle"
                  />
                <br/>
                  <label className="signup-label">PASSWORD</label>
                  <input className="signup-input-field"  
                    type="password"
                    minlength="8"
                    required={true}
                    value={this.state.password}
                    onChange={this.update('password')}
                    // placeholder="Password"
                  />
                <br/>
                  <label className="signup-label">CONFIRM PASSWORD</label>
                  <input className="signup-input-field"  
                    type="password"
                    minlength="8"
                    required={true}
                    value={this.state.password2}
                    onChange={this.update('password2')}
                    // placeholder="Confirm Password"
                  />
                <br/>
                <input className="signup-button" type="submit" value="Submit" />
                </div>
              {this.renderErrors()}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(SignupForm);