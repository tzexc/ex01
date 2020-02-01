import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/auth.action";
import { addRtspUrl } from "../../actions/rtsp.action";

function rtspUrlValidate(url){
    var regexp = /(rtsp):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regexp.test(url);
}

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            url:"",
            submitted: false,
            uiErrors:{ url: false}
        };

        this.handleLogout = this.handleLogout.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleLogout = e => {
        e.preventDefault();
        this.props.logout();
    };
    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };
    handleSubmit = e => {
        e.preventDefault();
        this.setState({ uiErrors: {url:false} });

        if (!rtspUrlValidate(this.state.url)) {
           this.setState({ uiErrors: {url:true} });
           return false
        } 

        this.setState({ submitted: true });
        const { id } = this.props.auth.user
        const { url } = this.state

        console.log(id , url)
        this.props.addRtspUrl(id,url,this.props.history)
    };
    render() {
        const { user } = this.props.auth;
        const { url, submitted, uiErrors } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h4> Dashboard page , welcome { user.name} </h4>
                        <button onClick={this.handleLogout} className="btn btn-primary">
                            Logout
                        </button>
                    </div>
                </div>
                <div className="error">
                    {uiErrors.url &&
                        <div className="has-error" style={{color:"red"}}>url is required</div>
                    }
                </div>
                <div className="row">
                    <form name="form" onSubmit={this.handleSubmit}>
                            <div className={'form-group' + (submitted && url ? ' has-error' : '')}>
                                <label>Add RTSP url: </label>
                                <input type="url" className="form-control" name="url" value={url} onChange={this.handleChange} />
                                {submitted && !url &&
                                    <div className="error">url is required</div>
                                }
                            </div>
                            <button className="btn btn-primary">Add Url</button>
                    </form>
                </div>
            </div>
            );
        }
}
Dashboard.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logout,addRtspUrl }
)(Dashboard);