import React from 'react';
import {InputText} from 'primereact/inputtext';
import 'primeflex/primeflex.css';

function App() {
  return (
    <div className="App">
      
      <div className="p-field">
        <label htmlFor="fieldId">Label</label>
        <InputText id="fieldId" type="text"/>
      </div>

    </div>
  );
}

export default App;
