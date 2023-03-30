import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom"

export const Home = () =>{
    return(
        <div className = "">
          



<header classNameName="w3-display-container w3-content w3-wide" style={{maxWidth:1600,minWidth:500}} id="home">
  <img className="w3-image" src="images/home.jpg" alt="Hamburger Catering" style={{width:1600 ,height:800}}/>
    <h1 className="textanimation"><i class="fa fa-cloud"></i>Kitchen</h1>

</header>


<div className="w3-content" style={{maxWidth:"1100px"}}>

  <div className="w3-row w3-padding-64" id="about">
    <div className="w3-col m6 w3-padding-large w3-hide-small">
     <img src="https://www.w3schools.com/w3images/tablesetting2.jpg" className="w3-round w3-image w3-opacity-min" alt="Table Setting" style={{width:600 , height:750}}/>
    </div>

    <div className="w3-col m6 w3-padding-large">
      <h1 className="w3-center">About <i class="fa fa-cloud"></i>kitchen</h1><br/>
      <h5 className="w3-center">Serving since 2023</h5>
      <p className="w3-large">Fauzan Waseem, born in 1998, is a culinary visionary with a passion for creating delicious and unforgettable meals. From a young age, Fauzan has been fascinated by the art of cooking, and has spent countless hours experimenting with different ingredients and techniques to create his signature dishes.
        Driven by a deep-seated desire to share his love of food with the world, Fauzan founded his recipe website as a platform for home cooks to come together and share their experiences. With his unwavering dedication to quality, Fauzan has inspired a new generation of food enthusiasts .
        Whether you're a seasoned pro or a novice in the kitchen, Fauzan's recipes are guaranteed to impress <span className="w3-tag w3-light-grey">seasonal</span> ingredients.</p>
      <p className="w3-large w3-text-grey w3-hide-medium">Are you tired of eating the same old boring meals every day?  From quick and easy weeknight dinners to show-stopping desserts, our website has it all. Our recipes are shared by home cooks . Don't settle for bland and boring meals any longer – click Explore above on our website today and start cooking up something amazing!</p>
    </div>
  </div>
 
  <hr/>
  
  <div className="w3-row w3-padding-64" id="menu">
    <div className="w3-col l6 w3-padding-large">
      <h1 className="w3-center">Our Services (FREE!)</h1><br />
      <h4>Share</h4>
      <p className="w3-text-grey">Share your favorite recipes with a community of food lovers from around the world</p><br />
    
      <h4>Discover</h4>
      <p className="w3-text-grey">Discover unique and delicious home-made recipes that you won't find anywhere else</p><br />
    
      <h4>Easy Access</h4>
      <p className="w3-text-grey">Access our website from anywhere in the world and discover new flavors and techniques from diverse cultures</p><br/>
    
      <h4>Connect</h4>
      <p className="w3-text-grey">Connect with other food enthusiasts and share your cooking experiences, tips, and tricks</p><br />
    
      <h4>Enjoy</h4>
      <p className="w3-text-grey">Enjoy a wide variety of cuisines from around the globe</p>    
    </div>
    
    <div className="w3-col l6 w3-padding-large">
      <img src="https://www.w3schools.com/w3images/tablesetting.jpg" className="w3-round w3-image w3-opacity-min" alt="Menu" style={{width:"100%"}}/>
    </div>
  </div>

  <hr/>

  <div className="w3-container w3-padding-64" id="contact">
    <h1>Contact</h1><br/>
    <p>At our recipe website, we're passionate about sharing the joy of cooking and bringing people together through delicious food. With a wide variety of unique and authentic recipes from around the world, we're here to inspire and empower home cooks everywhere. Join our community today and discover the endless possibilities of the culinary world!. Do not hesitate to contact us.</p>
    <p className="w3-text-blue-grey w3-large"><b>At your Service, 42nd Living St, 43043 New York, NY</b></p>
   
  </div>
  

</div>

     
</div>

    )
}