import React from 'react';
import { withRouter } from 'react-router-dom';
import "./login_form.css";
class LoginForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: '',
        errors: {}
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.renderErrors = this.renderErrors.bind(this);
      this.demoLogin = this.demoLogin.bind(this);
    }
    // Once the user has been authenticated, redirect to the Tweets page
    componentWillReceiveProps(nextProps) {
      if (nextProps.currentUser === true) {
        this.props.history.push('/');
      }
      // Set or clear errors
      this.setState({errors: nextProps.errors})
    }
    // Handle field updates (called in the render method)
    update(field) {
      return e => this.setState({
        [field]: e.currentTarget.value
      });
    }
    // Handle form submission
    handleSubmit(e) {
      e.preventDefault();
      let user = {
        email: this.state.email,
        password: this.state.password
      };
      this.props.login(user); 
    }
    // Render the session errors if there are any
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
    demoLogin(e) {
      e.preventDefault()
      const demo = { email: "demo_user@aa.io", password: "password" }
      const speed = 100;
      if (this.state.email !== demo.email) {
        const inputEmail = setInterval(() => {
          if (this.state.email !== demo.email) {
            const temp = demo.email.slice(0, this.state.email.length + 1);
            this.setState({ email: temp })
          } else {
            clearInterval(inputEmail);
            animatePW();
          }
        }, speed)
      }

      const animatePW = () => {
        if (this.state.password !== demo.password) {
          const inputPassword = setInterval(() => {
            if (this.state.password !== demo.password) {
              const temp = demo.password.slice(0, this.state.password.length + 1);
              this.setState({ password: temp });
            } else {
              clearInterval(inputPassword);
              this.props.demoLogin(demo).then(
                () => {
                  this.props.history.push("/channels")
                })
            }
          }, speed);
        }
      }

    }

    render() {

      const demoButton = <button className="login-button" onClick={this.demoLogin}>DEMO</button>

      return (
        <div className="login-container">
          <form className="login-wrapper" onSubmit={this.handleSubmit}>
            <h1>Welcome Back!</h1>
            <h2 className="login-sub-header">We're excited to see you again!</h2>
            <div className="login-inputs-wrapper">
                <label className="login-label">EMAIL</label>
                <input className="login-input-field"
                  type="text"
                  value={this.state.email}
                  onChange={this.update('email')}
                />
              <br/>
                <label className="login-label">PASSWORD</label>
                <input className="login-input-field" 
                  type="password"
                  value={this.state.password}
                  onChange={this.update('password')}
                />
              <br/>
              <input className="login-button"
                  type="submit" 
                  value="Submit" />
              {this.renderErrors()}

            {demoButton}
            </div>
          </form>
        </div>
      );
    }
}
export default withRouter(LoginForm);