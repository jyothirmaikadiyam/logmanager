import React,{PureComponent} from 'react';
import { withRouter } from 'react-router-dom';
import {reactLocalStorage} from 'reactjs-localstorage';

import './login.css';
class Login extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
            };
        this.baseState = this.state;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        reactLocalStorage.set('check',false);
      }
      handleChange(event) {
        const target=event.target;
        const value=target.type;
        if(value==='text')
        {
          this.setState({ username: event.target.value });
        }
        else if(value==='password')
        {
          this.setState({ password: event.target.value });
        }
      }
    handleSubmit(event) {
        event.preventDefault();
        
        if(this.state.username==='admin' && this.state.password==='admin' ) 
        {
            alert("Login Successful !!!");
            const { history } = this.props;
            reactLocalStorage.set('check',true);
            const check =reactLocalStorage.get('check');
            if(history && check) history.push('/listComplaint');
            console.log(check);
        }
        else
        {
            alert("Login failed !!!");
            const { history } = this.props;
            if(history) history.push('/');
        }
      }
//       componentDidMount() {
//     //    this.props.history.index=0;
//     const {history} = this.props;
//  //use the state via location.state
//  //and replace the state via
//  history.cl()
//     }
    render(){
        return(
            <div className="login">
                <div className="loginHead">
                    <span className="loginHeadName">LOG MANAGER</span>
                </div>
            <div className='ui main container'>
                <h3 className="login_heading">LOGIN</h3>
                    <form className='ui form' onSubmit={this.handleSubmit}>
                        <div className="field">
                            <label>USERNAME</label>
                            <input  type="text"
                                    placeholder="USERNAME"
                                    value={this.state.username}
                                    onFocus={(e)=>e.target.placeholder=""} 
                                    onBlur={(e)=>e.target.placeholder=" USERNAME"}
                                    onChange={this.handleChange}
                                    required
                            />
                        </div>
                        <div className="field">
                            <label>PASSWORD</label>
                            <input  type="password" 
                                    placeholder="PASSWORD" 
                                    value={this.state.password}
                                    onFocus={(e)=>e.target.placeholder=""} 
                                    onBlur={(e)=>e.target.placeholder=" PASSWORD"}
                                    onChange={this.handleChange}
                                    required
                            />
                        </div>
                        <button class="ui button blue" type="submit" onSubmit>Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}
export default withRouter(Login);