import React, { useState } from 'react';
import axios from 'axios'; 
import PersonCard from './PersonCard'
import { CardDeck, Container } from 'react-bootstrap';
import shaharyar from './ourPhotos/shaharyar.jpg';
import brian from './ourPhotos/brian.jpg';
import daniel from './ourPhotos/daniel.jpg';
import savetheanimals from './ourPhotos/savetheanimals.jpg';
import will from './ourPhotos/will.jpg';
import sahithi from './ourPhotos/sahithi.jpg';

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
    if (stats[i].name === shortened) {
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
      aboutInfo: "William Crawford is a junior CS major at UT Austin. He is new" +
      " to web dev, but likes to do a little bit of everything. He is yet another" + 
      " startup hopeful and wants to learn something new everyday. In his free " +
      "time, he likes to swim and play building or strategy based video games.",
      role: "Frontend Developer and Designer",
      photo: will
    },
    {
      name: "Sahithi Golkonda",
      stats: getStats(stats, "sa"),
      aboutInfo: "Sahithi Golkonda is junior UT Austin, where she is double majoring" +
      " in CS and Math. She’s interested in web dev and AI, and is also the Academic" +
      " Officer for the Women in Computer Science organization at UT. In her free " +
      "time, she spends time outdoors running, hiking, and rowing.",
      role: "API Manager and Data Lead",
      photo: sahithi
    },
    {
      name: "Total",
      stats: getStats(stats, "total"),
      aboutInfo: "All",
      role: "All commits, issues, and unittests",
      photo: savetheanimals
    }
  ];

  return ( 
    <body className='body'> 
      <Container>
        <h1>General Description:</h1>
        <p>{ description }</p>
        <h1>Data:</h1>
        <p>{ compilation }</p>
      </Container>      
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
        <div className="text-center">
          <h2>View our code base here: </h2>
          <a href="https://gitlab.com/cs373-group16/critterycovery">Gitlab</a><br/>
          <h2>View our Postman API Documentation here: </h2>
          <a href="https://documenter.getpostman.com/view/14742162/Tz5jf14x">API Documentation</a><br/>
        </div>
        <div className="text-center">
          <h2>Tools used:</h2>
          React/Typescript: For building the website's frontend using a component structure <br/>
          Python/Flask: For building the website's backend and making api requests<br/>
          AWS EC2 and Route53: For hosting the website on the cloud<br/>
          Postman: For creating the API documentation for our own API (linked above)
        </div>

      <div className="text-center">
        <h2>APIs used:</h2>
        <a href="https://api.protectedplanet.net/">https://api.protectedplanet.net/</a> Information about national and state parks<br/>
        <a href="https://api.speciesplus.net/">https://api.speciesplus.net/</a> Information about specific species<br/>
        <a href="https://restcountries.eu">https://restcountries.eu/</a> Information about countries<br/>
      </div>
    </body>
  ); 
}; 
  
export default About;
