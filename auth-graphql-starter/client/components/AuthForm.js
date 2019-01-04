import React, { Component } from 'react';

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }

  renderErrors() {
    return (
      <ul>
        {this.props.errors.map((e, i) => {
          return (
            <li style={{color: 'red'}} key={i}>
              {e}
            </li>
          )
        })}
      </ul>
    );
  }

  render() {
    return (
      <div className='row'>
        <form className='col s4' onSubmit={this.onSubmit.bind(this)}>
          <div className='input-field'>
            <input 
              id='email' 
              placeholder="Email"
              value={this.state.email} 
              onChange={e => this.setState({email: e.target.value})}
            />
          </div>
          <div className='input-field'>
            <input 
              placeholder="Password"
              type='password' 
              id='password' 
              onChange={e => 
                this.setState({password: e.target.value})}
              value={this.state.password} />
          </div>
          <div>
            {this.renderErrors()}
          </div>
          <button 
            type='Submit' 
            className='btn'
          >Submit</button>
        </form>
      </div>
    );
  }
}

export default AuthForm;
