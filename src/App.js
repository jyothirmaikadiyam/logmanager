import './App.css';
import Login from './login.js'
import Header from './header.js';
import ListComplaint from './listComplaint.js';
import AddComplaint from './addcomplaint.js';
import History from './history.js';
import {reactLocalStorage} from 'reactjs-localstorage';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
            <Router>
                <Switch>
                     <Route exact path="/" component={UserLogin}/>
                     <Route exact path="/header" component={userMain}/>
                     <Route exact path="/listComplaint" component={listComplaint}/>
                     <Route exact path="/addcomplaint" component={userAddcomplaint}/>
                     <Route exact path="/history" component={userHistory}/>
                </Switch>
            </Router>
        );
}
function UserLogin(){
 
    
    return(
          <div className="App_main">
          <Login/>  
          </div>
    );  
    
}
function userMain(){
  return(
  <div className="App_main">
      <Header/>  
  </div>  
  );
}

function listComplaint(){
  if(reactLocalStorage.get("check")=='true'){
    return(
      <div className="userComp">
          <Header/>
          <ListComplaint/>
        
      </div>
    );}
    else{
      return(
          <div className="App_main">
          <Login/>  
          </div>
      );
    }
}
function userAddcomplaint(){
  if(reactLocalStorage.get("check")=='true'){
  return(
    <div className="userComp">
      <Header/>
      <AddComplaint/>
    </div>
  );
  }
  else{
    return(
        <div className="App_main">
        <Login/>  
        </div>
    );
  }
}
function userHistory(){
  if(reactLocalStorage.get("check")=='true'){
  return(
    <div className="userComp">
      <Header/>
      <History/>
    </div>
  );
  }
  else{
    return(
        <div className="App_main">
        <Login/>  
        </div>
    );
  }
}

export default App;
