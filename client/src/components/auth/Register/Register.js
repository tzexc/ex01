import React, { Component } from "react";
import { Link ,withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { register,cleanErrors } from "../../../actions/auth.action";
import './Register.css'

class Register extends Component {
  constructor() {
    super();
    this.state = {
        user: {
            name: '',
            email: '',
            password: ''
        },
        submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  componentDidMount(){
    this.props.cleanErrors();
    if (this.props.auth.isAuthenticated) {
        this.props.history.push("/dashboard");
    }
 }
  handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }
    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.name && user.email && user.password) {
            this.props.register(user,this.props.history);
        }
    }

    render() {
        const { user, submitted  } = this.state;
        const  { errors }  = this.props;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                            <Link to="/" className="btn-flat waves-effect"> Back to home</Link>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                        <h4>
                            <b>Register</b>
                        </h4>
                        <p className="grey-text">
                            Already have an account? <Link to="/login">Log in</Link>
                        </p>
                        <div className="error">
                        {errors.message &&
                                <div className="error">{errors.message}</div>
                         }   
                        </div>
                        </div>
                        <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !user.name ? ' has-error' : '')}>
                            <label>Name: </label>
                            <input type="text" className="form-control" name="name" value={user.name} onChange={this.handleChange} />
                            {submitted && !user.name &&
                                <div className="error">Name is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                            <label>Email: </label>
                            <input type="text" className="form-control" name="email" value={user.email} onChange={this.handleChange} />
                            {submitted && !user.email &&
                                <div className="error">email is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                            <label>Password: </label>
                            <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                            {submitted && !user.password &&
                                <div className="error">password is required</div>
                            }
                        </div>
                        <div className="" style={{ paddingLeft: "11.250px" }}>
                        <button className="btn btn-primary">Register</button>
                        </div>
                        </form>
                    </div>
                    </div>
            </div>
            );
        }
}

Register.propTypes = {
    register: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { register,cleanErrors }
)(withRouter(Register));
