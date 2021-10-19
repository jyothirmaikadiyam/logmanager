import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import './header.css';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HistoryIcon from '@material-ui/icons/History';
import {reactLocalStorage} from 'reactjs-localstorage';

class Header extends PureComponent{
    constructor(props) {
        super(props);
        this.handleLogout=this.handleLogout.bind(this);

        this.handleClick=this.handleClick.bind(this);
    }
    //   handleButton1(event){
    //         const { history } = this.props;
    //         if(history) history.push('/complaint')
    //   }
    //   handleButton2(event){
    //     const { history } = this.props;
    //     if(history) history.push('/addcomplaint')
    //   }
    // handleButton3(event){
    // const { history } = this.props;
    // if(history) history.push('/history')
    // }
    handleLogout(event)
    {
        const { history } = this.props;
        // this.props.history.index=0;
        reactLocalStorage.set('check',false);
        const check =reactLocalStorage.get('check');

        if(history ) history.replace('/');
        console.log(check);
        // window.location.reload();
    }
    handleClick(event)
    {
        const { history } = this.props;
        if(history ) history.replace('/history');

    }
    render()
    {
        return(
            <div classname="main">
                <div className="headers">
                    <span className="headerName">LOG MANAGER</span>
                    <div className="history" onClick={this.handleLogout} title="LOGOUT"><span className="logout">Logout</span><ExitToAppIcon/></div>
                </div>
                {/* <div className="headerButtons">
                    <input  className="hb" type="button" value="Manage Complaint" onClick={this.handleButton1}></input>
                    <input className="hb" type="button" value="Add Complaint" onClick={this.handleButton2}></input>
                    <input className="hb" type="button" value="History" onClick={this.handleButton3}></input>
                </div> */}
            </div>
        );
    }
}
export default withRouter(Header);