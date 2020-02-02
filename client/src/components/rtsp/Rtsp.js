import React, { Component } from "react";
import PropTypes from "prop-types";
import socketIOClient from "socket.io-client";

import { connect } from "react-redux";
import { logout } from "../../actions/auth.action";
import { getAllRtspUrlByUser ,startSocketConnection } from "../../actions/rtsp.action";
import { base64ArrayBuffer } from '../../utils/rtsp.utils';

import './Rtsp.css';

class Rtsp extends Component {
    constructor() {
        super();
        this.state = {
            divSocket:null,
            endpoint: "http://localhost:4000",
        };
        this.imagesContent =[];
        this.handleLogout = this.handleLogout.bind(this);
        this.handleRtspClick = this.handleRtspClick.bind(this);
    }
    componentDidMount(){
        this.props.getAllRtspUrlByUser(this.props.auth.user.id)
        this.props.startSocketConnection(this.props.auth.user.id)
        console.log(this.props.rtsp_urls)
    }

    handleLogout = e => {
        e.preventDefault();
        this.props.logout();
    };
    
    handleRtspClick = (e,rtspItem,i) => {
        e.preventDefault();
        let divSocket = null;
        
        if (divSocket) {
            divSocket.disconnect();
        }

        divSocket = socketIOClient(this.state.endpoint + `/cam_${rtspItem._id}`);
        divSocket.on('data', (data) => {
            console.log(data)
            var bytes = new Uint8Array(data);
            this.imagesContent[rtspItem._id].children[0].src = 'data:image/jpeg;base64,' + base64ArrayBuffer(bytes);
        });
    };
    render() {
        const { user } = this.props.auth;
        console.log(this.props.rtsp_urls)
        return (

            <div className="container">
                {this.state.response}
                
                <div className="row">
                    <div className="col-md-12">
                        <h4> RTSP page , welcome { user.name} </h4>
                        <button onClick={this.handleLogout} className="btn btn-primary">
                            Logout
                        </button>
                        
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <hr></hr>
                        <h4> RTSP Grid</h4>

                        {this.props.rtsp_urls.map((item,i) =>(
           
                            <div key={item._id}>
                            <div className="square">
                                    <div className="content">
                                        <div className="table">
                                            <div className="table-cell">
                                                <p>{item.url}</p>
                                                <button onClick={(e)=>this.handleRtspClick(e,item,i)} className="btn btn-primary">
                                                play
                                                </button>
                                                <div ref={imagesContent => this.imagesContent[item._id] = imagesContent} className="imagesContent">
                                                    <img alt="" src=""/>
                                                </div>  
                                                {/* <div className="img">
                                                    {/* <img  id={`cam${i}`} src={`data:image/jpeg;base64,${this.state.imageSrc}`} /> */}
                                                </div>    */}
                                            </div>
                                        </div>
                                    </div>
                                </div>                      
                       ))}
                    </div>
                </div>
            </div>
            );
        }
}
Rtsp.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    rtsp_urls: PropTypes.arrayOf(PropTypes.any)
  };
  Rtsp.defaultProps = {
    rtsp_urls: []
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    rtsp_urls: state.rtsp.rtsp_urls,
    loading: state.rtsp.loading
  });
  export default connect(
    mapStateToProps,
    { logout ,getAllRtspUrlByUser ,startSocketConnection }
  )(Rtsp);