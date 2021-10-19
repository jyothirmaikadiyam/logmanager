import React,{PureComponent} from 'react';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import './addcomplaint.css';
import'./header.css';
import {reactLocalStorage} from 'reactjs-localstorage';

class AddComplaint extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            customername:'',
            phone:'',
            laptop:'',
            description:''
            };
        this.baseState = this.state;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleLaptopChange=this.handleLaptopChange.bind(this);
        this.handleClick=this.handleClick.bind(this);
      }
      handleChange(event) {
        const target=event.target;
        const value=target.type;
        if(value==='text')
        {
          this.setState({ customername: event.target.value });
        }
        else if(value==='tel')
        {
          this.setState({ phone: event.target.value });
        }
      }
      handleClick(event)
      {
            const { history } = this.props;
            this.setState(this.baseState)
            this.setState({ description: ''});
            const check =reactLocalStorage.get('check');
            if(history && check) history.push('/listComplaint');
      }
      handleLaptopChange(event) {
          this.setState({ laptop: event.target.value });
      }
      handleTextChange(event){
        this.setState({ description: event.target.value });
      }
    handleSubmit(event) {
        event.preventDefault();
        const user = {};
        user.CustomerMob = this.state.phone;
        user.CustomerName = this.state.customername;
        user.LaptopModel = this.state.laptop;
        user.ComplaintDes= this.state.description;
        Axios.post("http://localhost:3001/logManager/addComplaint", user).then((res) => {
            console.log(res);

          if(res.status===200)
          {
            alert("successful!!");
            const { history } = this.props;
            this.setState(this.baseState)
            this.setState({ description: ''});
            const check =reactLocalStorage.get('check');
            if(history && check) history.push('/listComplaint');
            console.log(check);
          }
          else{
            alert("Oops!! Try again...");
            const { history } = this.props;
            this.setState(this.baseState)
            this.setState({ description: ''});
            const check =reactLocalStorage.get('check');

            if(history && check) history.push('/addcomplaint');
          }
        });
      }
    render(){
        return(
            /*<div className="addcomplaint">
                <form className="ui form" style={{padding:'10px'}} onSubmit={this.handleSubmit}>
                <div class="field">
                    <label>CUSTOMER NAME</label>
                    <input type="text"
                            placeholder="CUSTOMER NAME"
                            value={this.state.customername}
                            onFocus={(e)=>e.target.placeholder=""} 
                            onBlur={(e)=>e.target.placeholder="CUSTOMER NAME"}
                            onChange={this.handleChange}
                            required
                    />
                    </div>
                    <div class="field">
                    <label>MOBILE NUMBER</label>
                    <input type="tel"
                            placeholder="MOBILE NUMBER"
                            value={this.state.phone}
                            onFocus={(e)=>e.target.placeholder=""} 
                            onBlur={(e)=>e.target.placeholder="MOBILE NUMBER"}
                            onChange={this.handleChange}
                            pattern="[0-9]{10}"
                            required
                    />
                    </div>
                    <div class="field">
                        
                    <label>LAPTOP MODEL</label>
                    <input type="text"
                            placeholder="LAPTOP MODEL"
                            value={this.state.laptop}
                            onFocus={(e)=>e.target.placeholder=""} 
                            onBlur={(e)=>e.target.placeholder="LAPTOP MODEL"}
                            onChange={this.handleLaptopChange}
                            required
                    />
                    </div>
                    <div class="field">
                        <label>DESCRIPTION</label>
                        <textarea placeholder="DESCRIPTION" 
                            onFocus={(e)=>e.target.placeholder=""} 
                            onBlur={(e)=>e.target.placeholder="DESCRIPTION"}
                            value={this.state.description}
                            onChange={this.handleTextChange}
                            required></textarea>
                            </div>
                            <div class="field">
                    <button class="ui button" type="submit" onSubmit>Submit</button>
                    </div>
                </form>
            </div>*/
            <div className='ui main container'>
            <h3  className="complaintlist" >Add Complaint</h3>
            <form className='ui form' onSubmit={this.handleSubmit}>

                <div className='field'>
                    <label>Name</label>
                    <input type="text"
                            placeholder="NAME"
                            value={this.state.customername}
                            onFocus={(e)=>e.target.placeholder=""} 
                            onBlur={(e)=>e.target.placeholder="NAME"}
                            onChange={this.handleChange}
                            required
                    />
                </div>

                <div className='field'>
                    <label>Mobile Number</label>
                    <input type="tel"
                            placeholder="MOBILE NUMBER"
                            value={this.state.phone}
                            onFocus={(e)=>e.target.placeholder=""} 
                            onBlur={(e)=>e.target.placeholder="MOBILE NUMBER"}
                            onChange={this.handleChange}
                            pattern="[0-9]{10}"
                            required
                    />
                </div>

                <div className='field'>
                    <label>Laptop Model</label>
                    <input type="text"
                            placeholder="LAPTOP MODEL"
                            value={this.state.laptop}
                            onFocus={(e)=>e.target.placeholder=""} 
                            onBlur={(e)=>e.target.placeholder="LAPTOP MODEL"}
                            onChange={this.handleLaptopChange}
                            required
                    />
                </div>


                <div className="field">
                    <label>Complaint Description</label>
                    <textarea placeholder="COMPLAINT DESCRIPTION" 
                            onFocus={(e)=>e.target.placeholder=""} 
                            onBlur={(e)=>e.target.placeholder="COMPLAINT DESCRIPTION"}
                            value={this.state.description}
                            onChange={this.handleTextChange}
                            required></textarea>
                </div>

                <button className='ui button blue'>Add</button>
                <button className='ui button blue centered' onClick={this.handleClick}>Back</button>
            </form>
        </div>
        );
    }
}
export default withRouter(AddComplaint);