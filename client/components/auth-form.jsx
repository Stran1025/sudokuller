import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'demouser1',
      password: 'demouser1',
      firstname: '',
      lastname: '',
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal(event) {
    event.preventDefault();
    this.setState({ error: false });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { action } = this.props;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/auth/${action}`, req)
      .then(res => res.json())
      .then(result => {
        const { error } = result;
        if (error) {
          this.setState({ error });
          return;
        }
        if (action === 'sign-up') {
          window.location.hash = 'sign-in';
        } else if (result.user && result.token) {
          this.props.onSignIn(result);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  renderPage() {
    const { action } = this.props;
    const { handleChange, handleSubmit } = this;
    const alternateActionHref = action === 'sign-up'
      ? '#sign-in'
      : '#sign-up';
    const alternatActionText = action === 'sign-up'
      ? 'Sign in instead'
      : 'Register now';
    const submitButtonText = action === 'sign-up'
      ? 'Register'
      : 'Log In';
    const modalVisibility = this.state.error ? 'd-flex' : 'd-none';
    if (action === 'sign-up') {
      return (
        <form className="w-100" onSubmit={handleSubmit}>
          <div className={'username-modal justify-content-center ' + modalVisibility}>
            <div className='card align-self-center p-3'>
              <p>{this.state.error}</p>
              <button className='btn btn-primary' onClick={this.closeModal}>Return</button>
            </div>
          </div>
          <div className='row'>
            <div className="col-6">
              <label className='form-label'> First Name
                <input
                  required
                  id="firstname"
                  type="text"
                  name="firstname"
                  onChange={handleChange}
                  className="form-control bg-light" />
              </label>
            </div>
            <div className="col-6">
              <label className='form-label'> Last Name
                <input
                  required
                  id="lastname"
                  type="text"
                  name="lastname"
                  onChange={handleChange}
                  className="form-control bg-light" />
              </label>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              required
              autoFocus
              id="username"
              type="text"
              name="username"
              onChange={handleChange}
              className="form-control bg-light" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              required
              id="password"
              type="password"
              name="password"
              onChange={handleChange}
              className="form-control bg-light" />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <small>
              <a className="text-muted" href={alternateActionHref}>
                {alternatActionText}
              </a>
            </small>
            <button type="submit" className="btn btn-primary">
              {submitButtonText}
            </button>
          </div>
        </form>
      );
    } else {
      return (
        <form className="w-100" onSubmit={handleSubmit}>
          <div className={'username-modal ' + modalVisibility}>
            <div className='card align-self-center'>
              {this.state.error}
              <button className='btn btn-primary' onClick={this.closeModal}>Return</button>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              required
              value={this.state.username}
              autoFocus
              id="username"
              type="text"
              name="username"
              onChange={handleChange}
              className="form-control bg-light" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              required
              value={this.state.password}
              id="password"
              type="password"
              name="password"
              onChange={handleChange}
              className="form-control bg-light" />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <small>
              <a className="text-muted" href={alternateActionHref}>
                {alternatActionText}
              </a>
            </small>
            <button type="submit" className="btn btn-primary">
              {submitButtonText}
            </button>
          </div>
        </form>
      );
    }
  }

  render() {
    return (
      <>
        {this.renderPage()}
      </>
    );
  }
}
