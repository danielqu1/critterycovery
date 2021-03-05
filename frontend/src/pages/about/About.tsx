import React, { useState } from 'react';
import axios from 'axios'; 
import PersonCard from './PersonCard'
import { Card } from 'react-bootstrap';

interface PersonStats {
  name: string;
  commits: number;
  issues: number;
  unittests: number;
}

interface GitlabData {
  stats: PersonStats[]
}

function getStats(stats: PersonStats[], shortened: string): PersonStats {
  for (let i = 0; i < stats.length; i++) {
    if (stats[i].name == shortened) {
      return stats[i];
    }
  }
  return {name: shortened, commits: 0, issues: 0, unittests: 0};
}

function About() { 

  const [stats, setStats] = useState(new Array<PersonStats>());

  axios.get<GitlabData>("/api/gitlabstats").then((response) => {
    setStats(response.data.stats);
    // if (stats.length > 0)
    //   console.log(stats[0].name);
  });

  type Person = {
    name: String;
    stats: PersonStats;
    aboutInfo: String;
  }

  let people: Person[] = [
    {
      name: "Shaharyar Lakhani",
      stats: getStats(stats, "sh"),
      aboutInfo: "Male"
    },
    {
      name: "Brian Wang",
      stats: getStats(stats, "br"),
      aboutInfo: "Male"
    },
    {
      name: "Daniel Qu",
      stats: getStats(stats, "da"),
      aboutInfo: "Male"
    },
    {
      name: "William Crawford",
      stats: getStats(stats, "wi"),
      aboutInfo: "Male"
    },
    {
      name: "Sahithi Golkonda",
      stats: getStats(stats, "sa"),
      aboutInfo: "Female"
    },
    {
      name: "total",
      stats: getStats(stats, "total"),
      aboutInfo: "All"
    }
  ];

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
      <PersonCard person={people[5]}></PersonCard>
    </div> 
  ); 
}; 
  
export default About;
