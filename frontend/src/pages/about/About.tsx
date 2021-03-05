import React, { useState } from 'react';
import axios from 'axios'; 
import PersonCard from './PersonCard'
import { Card } from 'react-bootstrap';

function About() { 

  interface Person {
    name: String;
    aboutInfo: String;
  }

  let people: Person[] = [
    {
      name: "Shaharyar Lakhani",
      aboutInfo: "Male"
    },
    {
      name: "Brian Wang",
      aboutInfo: "Male"
    },
    {
      name: "Daniel Qu",
      aboutInfo: "Male"
    },
    {
      name: "William Crawford",
      aboutInfo: "Male"
    },
    {
      name: "Sahithi Golkonda",
      aboutInfo: "Female"
    },
  ];

  const [stats, setStats] = useState(new Map<String, Array<number>>());

  axios.get("/api/gitlabstats").then((response) => {
    console.log(response);
    setStats(response.data);
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
      <PersonCard person={people[0]}></PersonCard>
      <PersonCard person={people[1]}></PersonCard>
      <PersonCard person={people[2]}></PersonCard>
      <PersonCard person={people[3]}></PersonCard>
      <PersonCard person={people[4]}></PersonCard>
    </div> 
  ); 
}; 
  
export default About;
