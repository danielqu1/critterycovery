import React from 'react';

// need all four to build a table
import type {ColumnDefinitionType} from "../components/Table/ColumnDefinitionType";
import Table from "../components/Table/Table";

// what the data looks like
interface Cat {
  name: string;
  age: number;
  gender: string;
  color: string;
  activityLevel?: string; // optional, same as string | undefined
  favoriteFood?: string;  // optional, same as string | undefined
}

// actual data (here, this is DUMMY DATA)
const data: Cat[] = [
  {
    name: 'Mittens',
    color: 'black',
    age: 2,
    gender: 'female',
    activityLevel: 'hight',
    favoriteFood: 'milk'
  },
  {
    name: 'Mons',
    color: 'grey',
    age: 2,
    gender: 'male',
    favoriteFood: 'old socks',
    activityLevel: 'medium'
  },
  {
    name: 'Luna',
    color: 'black',
    age: 2,
    gender: 'female',
    activityLevel: 'medium',
    favoriteFood: 'fish'
  },
  {
    name: 'Bella',
    color: 'grey',
    age: 1,
    gender: 'female',
    activityLevel: 'high',
    favoriteFood: 'mice'
  },
  {
    name: 'Oliver',
    color: 'orange',
    age: 1,
    gender: 'male',
    activityLevel: 'low',
    favoriteFood: 'fish'
  }
]

// what keys to show on table, and what should be at the top of each column
const columns: ColumnDefinitionType<Cat, keyof Cat>[] = [
  {
    key: 'name',
    header: 'Name',
    width: 150
  },
  {
    key: 'age',
    header: 'Age in years',
  },
  {
    key: 'color',
    header: 'Color'
  }
]


const Habitats = () => { 
  return ( 
    <div 
      style={{ 
        display: 'flex', 
        justifyContent: 'Right', 
        alignItems: 'Right', 
        height: '100vh'
      }} 
    > 
      <h1>Imagine not livining in a concrete jungle!</h1>
	  
	  <div>
		<h2>Habitats and Ecosystems</h2>
		<Table data={data} columns={columns} />
	  </div>
    </div> 
  ); 
}; 
  
export default Habitats;