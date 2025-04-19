'use client';
import { useState, useRef, useEffect } from "react";
import "./page.css";
import Input from "./Input";

export default function Home() {
  const firstInputRef = useRef(null);
  const secondInputRef = useRef(null);
  const thirdInputRef = useRef(null);
  const forthInputRef = useRef(null);
  const fifthInputRef = useRef(null);

  const [inputContent, setInputContent] = useState({
    first: "",
    second: "",
    third: "",
    forth: "",
    fifth: "",
  });

  const [isDisabled, setIsDisabled] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [defenition, setDefenition] = useState("");


  // Changing input content
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputContent((prevInputContent) => ({
      ...prevInputContent,
      [name]: value,
    }));
  };


  const handleSubmitCheckInput = async (e) => {
    e.preventDefault();
    let inputValues = Object.values(inputContent)
    let joindInputsValues = Object.values(inputContent).join("");
    console.log(joindInputsValues);
    console.log(inputValues)
  
    const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${joindInputsValues}`;
  
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const listWords = await response.json();
      const wordDefenition = listWords[0].meanings[0].definitions[0].definition;
      console.log(listWords);
      console.log(listWords[0].meanings[0].definitions[0].definition);
      setInputContent(listWords); 
      setDefenition(wordDefenition)
      setFetchError(null); 
    } catch (error) {
      console.error("Error fetching word:", error);
      setFetchError(error.message); 
    }
  };


  let optionalWords = [];
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const randomeStringIndex = Math.floor(Math.random(0, 5)*5);
  console.log(randomeStringIndex)
  // console.log(inputValues)
    function spellCheck(input){
  if (!response.ok) {
    inputValues[i] = inputValues[i].replace(inputContent[i], randomLetter);
    }
    //for every word checked (after clicking the button) - if an error arises we subsititute every letter with a random letter by turn
    // and check if the new word is valid. if it is, we will add it to the "optionalWords" array. once we finish checking all the letters, we will return the array.
    // this array will be used to display the alternatives for the user. 
      return regex.test(input);   
    }



// let joindInputsValues = Object.values(inputContent).join("")
//   console.log(joindInputsValues);


//   const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${joindInputsValues}`;

//   useEffect(() => {
//     const fetchWord = async() =>{
//       try {
//         const response = await fetch(API_URL);
//         if(!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const listWords = await response.json();
//         console.log(listWords);
//         setInputContent(listWords);
//         setFetchError(null);
//       } catch(error) {
//         console.error("Error fetching word:", error);
//         setFetchError(error);
//       }
//     }
//     fetchWord();
//   }, [])



  return (
    <div className="page_main">
      <div className="page_textsContainer">
        <h1 className="page_hedline">Word Checking game</h1>
        <p className="page_instructions">Enter a 5 letter word and click "Enter" to check if it exists</p>
      </div>
      <div className="page_buttonContainer">
        <button className="page_button" onClick={handleSubmitCheckInput}>
          CHECK WORD
        </button>
      </div>
      <div className="page_inputsContainer">
        <form className="page_form" onSubmit={handleSubmitCheckInput}>
          <Input
            style={fetchError? {borderColor:"red"} : {borderColor:"green"}}
            value={inputContent}
            onChange={handleInputChange}
            refs={{
              first: firstInputRef,
              second: secondInputRef,
              third: thirdInputRef,
              forth: forthInputRef,
              fifth: fifthInputRef,
            }}
          />
        </form>
      </div>
      <div className="page_informationContainer">
        {inputContent ? <p className="page_information">Start</p> : <p className="page_information">Let's Go!</p>}
        {fetchError && <p className="page_errorMessage">{`Oops: ${fetchError}. Maybe you ment:`}</p>}
        <div className="page_alternativeWords">

        </div>
       
       
        <div className="page_word_defenition">
          <h3 className="page_defenitionHedline">Get Defenition</h3>
          <p>{fetchError || `The above word possible deffinition might be:${defenition}`}</p>
        </div>
      </div>
    </div>
  );
}
