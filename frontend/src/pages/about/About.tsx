import React, { useState } from 'react';
import axios from 'axios'; 
import PersonCard from './PersonCard'
import { Card, CardColumns, CardDeck, CardGroup } from 'react-bootstrap';
import shaharyar from './ourPhotos/shaharyar.jpg';
import brian from './ourPhotos/brian.jpg';
import daniel from './ourPhotos/daniel.jpg';
import savetheanimals from './ourPhotos/savetheanimals.jpg';

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

  const description: string = "This site is meant to educate people about different endangered species and address the problem" +
  " of reducing populations. Unless we do something about this issue, we won't be able to save these species until its too late." +
  " This would be a great shame because of the diversity that these animals bring to earth.";

  const compilation: string = "The compilation of our data allows us to focus on species that are critically endangered" +
  " and identify their country, ecosystem, and other characteristics so that we can help reduct this endangerment. The data" +
  " used here can come of real help to different organizations that aim to protect animals."; 

  const [stats, setStats] = useState(new Array<PersonStats>());

  axios.get<GitlabData>("/api/gitlabstats").then((response) => {
    setStats(response.data.stats);
    // if (stats.length > 0)
    //   console.log(stats[0].name);
  });

  type Person = {
    name: string;
    stats: PersonStats;
    aboutInfo: string;
    role: string;
    photo: string;
  }

  let people: Person[] = [
    {
      name: "Shaharyar Lakhani",
      stats: getStats(stats, "sh"),
      aboutInfo: "Shaharyar Lakhani is a Junior in the CS department" + 
      " here at UT Austin. He has learned a lot about web development through" + 
      " this project, and is excited to use his skills from this class so" +
      " far to potentially create a startup! His hobbies include playing basketball," +
      " going on hikes, singing, and cooking.",
      role: "Project Lead: Backend Manager",
      photo: shaharyar
    },
    {
      name: "Brian Wang",
      stats: getStats(stats, "br"),
      aboutInfo: "Brian Wang is a junior at UT Austin. He is thrilled to be in" +
      " SWE this semester, and he can't wait to see the website up and running!" +
      " His hobbies include reading and doing jigsaw puzzles.",
      role: "Lead Frontend Developer",
      photo: brian
    },
    {
      name: "Daniel Qu",
      stats: getStats(stats, "da"),
      aboutInfo: "Daniel Qu is a sophomore in the CS department at UT Austin. He is" +
      " fairly new to web development, but is very eager to learn. He recently adopted a" +
      " kitten named Kiki! In his free time he enjoys playing chess and Sudoku.",
      role: "Developer and Report Manager",
      photo: daniel
    },
    {
      name: "William Crawford",
      stats: getStats(stats, "wi"),
      aboutInfo: "Male",
      role: "Frontend Developer and Designer",
      photo: shaharyar
    },
    {
      name: "Sahithi Golkonda",
      stats: getStats(stats, "sa"),
      aboutInfo: "Female",
      role: "API Manager and Data Lead",
      photo: shaharyar
    },
    {
      name: "total",
      stats: getStats(stats, "total"),
      aboutInfo: "All",
      role: "Full Stack Development",
      photo: savetheanimals
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
      <div>
        <h1>General Description:</h1>
        <br />
        <p>{ description }</p>
        <h1>Data:</h1>
        <br />
        <p>{ compilation }</p>
          <CardDeck>
            <PersonCard person={people[0]}></PersonCard>
            <PersonCard person={people[1]}></PersonCard>
            <PersonCard person={people[2]}></PersonCard>
          </CardDeck>
          <CardDeck>
            <PersonCard person={people[3]}></PersonCard>
            <PersonCard person={people[4]}></PersonCard>
            <PersonCard person={people[5]}></PersonCard>
          </CardDeck>
      </div>
    </div> 
  ); 
}; 
  
export default About;
