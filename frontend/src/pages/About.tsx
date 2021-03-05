import React, { useState } from 'react';
import axios from 'axios'; 

function About() { 

  const [stats, addStats] = useState({});

  axios.get("/api/gitlabstats").then((response) => {
    addStats(response);
  });

  return ( 
    <div 
      style={{ 
        display: 'flex', 
        justifyContent: 'Right', 
        alignItems: 'Right', 
        height: '100vh'
      }} 
    > 
      <h1>GITLAB STATS HERE</h1> 
    </div> 
  ); 
}; 
  
export default About;
