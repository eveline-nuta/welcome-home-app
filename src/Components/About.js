import React, { Component } from 'react';

class About extends Component {
  render() {

    if(this.props.data){
      var profilepic= "images/"+this.props.data.image;
      var bio = this.props.data.bio;
      var city = this.props.data.address.city;
      var aboutopendata= this.props.data.aboutopendata;
      var email = this.props.data.email;
      var resumeDownload = this.props.data.resumedownload;
      var aboutplatform = this.props.data.aboutplatform;
      var fullname = this.props.data.fullname;
      var workbio = this.props.data.workbio;
    }

    return (
      <div id="about">
      <div className="row">
         <div className="three columns">
            <img className="profile-pic"  src={profilepic} alt="Open Data Norway" />
         </div>
         <div className="nine columns main-col">
            <h2>About this Platform</h2>
            <p>{aboutplatform}</p>
            <p>{aboutopendata}</p>
            <h2>About Me</h2>
            <p>{bio}</p>
            <p>{workbio}</p>
            
            <div className="row">
               <div className="columns contact-details">
                  <h2>Contact Details</h2>
                  <p className="address">
						   <span>{fullname}</span><br />
                     <span>{city}</span><br />
                     <span>{email}</span>
					   </p>
               </div>
               <br/>
               <div className="columns download">
                  <p>
                     <a href={resumeDownload} className="button"><i className="fa fa-download"></i>Download Resume</a>
                  </p>
               </div>
            </div>
         </div>
      </div>
      <br/><br/><br/>
   </div>
    );
  }
}

export default About;
