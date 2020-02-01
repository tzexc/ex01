import React, { Component } from "react";
import { Link ,withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Home extends Component {
    componentDidMount(){
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }
    render() {
        return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
            <div className="row">
            <div className="col-md-12">
                <h4>
                    Home Page
                </h4>
                <br />
                <div className="btn-group">
                <Link
                    to="/register"
                    style={{
                        width: "140px",
                        marginRight: "10px"
                    }}
                    className="btn btn-primary"
                >
                    Register
                </Link>

                <Link
                    to="/login"
                    style={{
                    width: "140px",
                    }}
                    className="btn btn-primary"
                >
                    Log In
                </Link>
                </div>
            </div>
            </div>
        </div>
        );
  }
}
Home.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(
    mapStateToProps,
)(withRouter(Home));
