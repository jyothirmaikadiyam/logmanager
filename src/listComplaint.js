import React from 'react'
import { Link } from 'react-router-dom'
import {PureComponent} from 'react';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import { Modal } from 'react-responsive-modal';
import './header.css';
import 'react-responsive-modal/styles.css';
import {reactLocalStorage} from 'reactjs-localstorage';
import HistoryIcon from '@material-ui/icons/History';

class ListComplaint extends PureComponent{

    constructor(props) {
        super(props);
        this.state = {
                        listAd:[],
                        openModal : false,
                        description:'',
                        id:''
                    };                    
        this.onClickButton=this.onClickButton.bind(this);
        this.onCloseModal=this.onCloseModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
        this.handleAdd=this.handleAdd.bind(this);
    }
    onClickButton(event){
        this.setState({openModal : true})
    }

    onCloseModal(event){
        this.setState({openModal : false})
    }

    handleTextChange(event){
        this.setState({ description: event.target.value });
    }

    handleClose({currentTarget}){
        this.setState({openModal : true})
        this.setState({id:currentTarget.value})
    }
    handleDelete({currentTarget}){
        // event.preventDefault();
        Axios.post(`http://localhost:3001/logManager/deleteComplaint?ComplaintId=`+currentTarget.value).then((res)=>{
            if(res.status===200)
          {
            alert("successful!!");
            const { history } = this.props;
            window.location.reload(false);
            const check =reactLocalStorage.get('check');
            if(history && check) history.push('/listComplaint');
          }
          else{
            alert("Oops!! Try again...");
            const { history } = this.props;
            const check =reactLocalStorage.get('check');
            if(history && check) history.push('/listComplaint');
          }
        });
    }
    handleAdd(event){
        const { history } = this.props;

      //  window.location.reload(false);  
            const check =reactLocalStorage.get('check');          
            if(history && check) history.push('/addcomplaint');
            console.log(check);
    }
    handleSubmit(event) {
        event.preventDefault();
        const user = {};
        user.Resolution = this.state.description;
        Axios.post(`http://localhost:3001/logManager/closeComplaint?ComplaintId=`+this.state.id,user).then((res) => {
          console.log(res);
          this.setState({openModal : false})
          if(res.status===200)
          {
            alert("successful!!");
            const { history } = this.props;
            // this.setState(this.baseState)
            
            this.setState({ description: ''});
            this.setState({id:''});
            window.location.reload(false);  
            const check =reactLocalStorage.get('check');          
            if(history && check) history.push('/listComplaint');
          }
          else{
            alert("Oops!! Try again...");
            const { history } = this.props;
            // this.setState(this.baseState)
            this.setState({ description: ''});
            this.setState({id:''});
            this.setState({openModal : false})
            const check =reactLocalStorage.get('check');
            if(history && check) history.push('/listComplaint');
          }
        });
      }
    componentDidMount() {
        Axios.get("http://localhost:3001/logManager/listComplaint")
        .then(res => {
            const listAd = res.data;
            this.setState({ listAd:listAd });  
        })
    }

    render()
    {
        const listAd=this.state.listAd;
        return (
            <div className='ui main container'>
                <h3 className="complaintlist">Complaint List</h3>
                {/* <Link to='/addComplaint'> */}
                <div className="add">
                    <button className='ui button blue right' onClick={this.handleAdd}>+ Add Complaint</button>
                    <button className='ui button blue right' onClick={this.handleAdd}>History</button>
                </div>
                {/* </Link> */}
                <div className='ui celled list'>
                    <div className="activelist">
                        {listAd.map((listAd,index)=>{
                            return(
                                <div className="ui card centered" style={{ width: "95vw" }}>
                                    <div className="content">
                                        <div className="header_list">
                                            <div className="header_list_left">{listAd.CustomerName} - {listAd.LaptopModel}</div>
                                            <div className="header_list_right"> {listAd.CreatedDate}</div>
                                        </div>
                                        <div className="meta">{listAd.CustomerMob}</div>
                                        <div className="description">Complaint : {listAd.ComplaintDes}</div>
                                        <div style={{ float: 'right', paddingTop: '10px' }} >
                                        <button className="ui primary button" value={listAd.ComplaintId} onClick={this.handleClose}>Close Complaint</button>
                                        <Modal open={this.state.openModal} onClose={this.onCloseModal} style={{
                                                content: {
                                                    top: '50%',
                                                    right: '50%',
                                                    bottom: 'auto',
                                                    left: 'auto',
                                                    height: '40vh',
                                                    width: '50vw',
                                                    marginRight: '-50%',
                                                    transform: 'translate(-50%, -50%)',
                                                },
                                            }} >
                                            <div className="ui form">
                                                <div className="items">
                                                    <form className='ui form' value={listAd.ComplaintId} onSubmit={this.handleSubmit}>
                                                        <h2 class="header">Resolution</h2>
                                                        <textarea placeholder="RESOLUTION" 
                                                            onFocus={(e)=>e.target.placeholder=""} 
                                                            onBlur={(e)=>e.target.placeholder="RESOLUTION"}
                                                            value={this.state.description}
                                                            onChange={this.handleTextChange}
                                                            required></textarea>
        
                                                        <div className="ui centered" style={{ float: 'right' }}>
                                                            <br />
                                                            <button className="ui button primary " onSubmit={this.handleSubmit}>Submit</button>
                                                            <button className="ui button primary" onClick={this.onCloseModal}>Back</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </Modal>
                                        <button className="ui button" value={listAd.ComplaintId} onClick={this.handleDelete}>Delete Complaint</button>
                                    </div>
                                </div>
                            </div>
                            );
                            })}
                        </div>
                    </div>
                </div>
        )
    }
}

export default withRouter(ListComplaint);