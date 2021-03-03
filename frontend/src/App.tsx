import React, { useState } from 'react';
import axios from 'axios';

function App() {

  const [name, setName] = useState("new");

  axios.get("/api/name").then((response) => {
    setName(response.data.name);
  });

  return (
    <div className="App">
      <p>
        { name }
      </p>
    </div>
  );
}

export default App;
