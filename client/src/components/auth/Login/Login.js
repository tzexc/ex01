import React, { Component } from "react";
import { Link ,withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login ,cleanErrors } from "../../../actions/auth.action";
import './Login.css'

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            submitted :false,
            errors:{ message:"" }
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
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password} = this.state;
        const user = {
            email,
            password
        }

        if (user.password && user.email) {
            this.props.login(user,this.props.history);
        }
    }

    render() {
        const { email, password ,submitted } = this.state;
        const  { errors }  = this.props;

        return (
            <div className="container">
                <div style={{ marginTop: "4rem" }} className="row">
                <div className="col-sm-6">
                        <Link to="/" className="btn-flat waves-effect">
                        Back to home
                        </Link>
                        <div className="col-sm-6" style={{ paddingLeft: "11.250px" }}>
                        <h4>
                            <b>Login</b>
                        </h4>
                        <p className="grey-text">
                            <Link to="/register">Register</Link>
                        </p>
    
                    </div>
                    <form name="form" onSubmit={this.handleSubmit}>
                            <div className="form-group"> 
                                <label>Email: </label>
                                <input type="email" className="form-control" name="email" value={email} onChange={this.handleChange} />
                                {submitted && !email &&
                                    <div className="help-block error">email is required</div>
                                }
                            </div>
                            <div className="form-group">
                                <label>Password: </label>
                                <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                                {submitted && !password &&
                                    <div className="help-block error">password is required</div>
                                }
                            </div>
                            <div className="help-block error">
                                {errors.message &&
                                        <div className="error">{errors.message}</div>
                                }   
                             </div>
                            <div className="form-group">
                                 <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                </div>
                </div>
            </div>
       );
  }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { login,cleanErrors }
)(withRouter(Login));
