import React from 'react';
import './App.css';
import CodeMirror from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs'
import { dracula } from '@uiw/codemirror-theme-dracula'
import { useState } from 'react';
import axios from 'axios';


function App() {
  const [code, setCode] = useState('a=10');
  const [testCases, setTestCases] = useState([])

  const submitCode = () => {
    axios.post('http://localhost:5000/python', { code })
      .then(({ data }) => {
        console.log(data);
        setTestCases([data.passOrFail])
      });
    console.log(code);
  }
  return (
    <div className="App">
      <header className='App-header'>
        <div className='absolute top-20 bottom-40 left-10 right-10 text-left'>
          <div>Create a function to find the sum of two numbers</div>
          <div><div>{testCases=== "True"? "Pass" : "Fail"}</div></div>
          <CodeMirror
            theme={dracula}
            value={code}
            height="200px"
            extensions={langs.python()}
            onChange={(value, viewUpdate) => {
              setCode(value);
            }}
          />
          <div className='border-2 bg-green-500' onClick={submitCode}>Submit</div>
        </div>
      </header>

    </div>
  );
}

export default App;
