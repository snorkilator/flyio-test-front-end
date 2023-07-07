// This file contains the contact form
// It shows one field at a time

// third is a send button
// each field page has a back button and a next button
// for required fields next button doesn't work till input is valid

import { useEffect, useState } from "react";

type form = { Subject: string; Email: string; Message: string };
type props = {
  form: form;
  handleFormChange: (currentPage: number, value: string) => void;
};
function Form() {
  let [currentPage, setCurrentPage] = useState(0);
  let [form, setForm] = useState({
    Subject: "subject",
    Email: "email",
    Message: "message",
  } as form);
  
  async function saveForm() {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    };
    try {
      let response = await fetch("/save", options);
      console.log("response:"+response.status)
    } catch (error) {
      console.log(error);
    }
  }

  // TODO: change the flag set to use useEffect instead
  // use cleanup function that executes on unmount
  // cleanup function should save the form one last time
  let [dataHasBeenEntered, setDataHasBeenEntered] = useState(false)
  function updateFormAndFlag(form: React.SetStateAction<form>){
    // the first time this function runs, the flag will be false
    // we only want to set the interval on the first run
    if (!dataHasBeenEntered){
      setInterval(saveForm, 5000)
    }
    setDataHasBeenEntered(true)
    setForm(form)
  }



  useEffect(()=>{
 let int =  setInterval(async function HandleSaveForm() {
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      };
      try {
        let response = await fetch("/save", options);
        console.log("response:"+response.status)
      } catch (error) {
        console.log(error);
      }
    }, 1000)
    return(()=>{clearInterval(int)}
  )}, [form])

  function handleClickBack() {
    setCurrentPage((currentPage) => {
      if (currentPage > 0) {
        return currentPage - 1;
      }
      return currentPage;
    });
  }
  function handleClickNext() {
    setCurrentPage((currentPage) => {
      if (currentPage < 3) {
        return currentPage + 1;
      }
      return currentPage;
    });
  }
  function handleFormChange(currentPage: number, value: string) {
    if (currentPage === 0) {
      updateFormAndFlag((prevForm) => {
        return { ...prevForm, Subject: value };
      });
    }
    if (currentPage === 1) {
      updateFormAndFlag((prevForm) => {
        return { ...prevForm, Email: value };
      });
    }
    if (currentPage === 2) {
      updateFormAndFlag((prevForm) => {
        return { ...prevForm, Message: value };
      });
    }
  }

  let pages = [Subject, Email, Message, Submit];

  return (
    <div id="send-me-a-message">
      <h2>Send me a message</h2>
      {dataHasBeenEntered ? "Form has been used":"Form has not been used"}
      <form>
        {pages[currentPage]({ form: form, handleFormChange: handleFormChange })}
      </form>
      <button onClick={handleClickBack}>Back</button>
      <button onClick={handleClickNext}>Next</button>
    </div>
  );
}

// 0
function Subject(props: props) {
  return (
    <>
      <label>Subject</label>
      <input
        type="text"
        name="subject"
        value={props.form.Subject}
        onChange={(e) => props.handleFormChange(0, e.target.value)}
      />
    </>
  );
}
// 1
function Email(props: props) {
  return (
    <>
      <label>Email</label>
      <input
        type="email"
        required
        name="email"
        value={props.form.Email}
        onChange={(e) => props.handleFormChange(1, e.target.value)}
      />
    </>
  );
}

// 2
function Message(props: props) {
  return (
    <>
      <label>Message</label>
      <textarea
        required
        name="message"
        rows={4}
        cols={50}
        value={props.form.Message}
        onChange={(e) => props.handleFormChange(2, e.target.value)}
      >
        Write your message here.
      </textarea>
    </>
  );
}

// 3
function Submit(props: props) {
  async function HandleSendForm(e: React.MouseEvent) {
    e.preventDefault()
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.form),
    };
    try {
      let response = await fetch("/form", options);
      console.log("response:"+response.status)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <label>Submit</label>
      <button onClick={(e) => HandleSendForm(e)}>Submit</button>
    </>
  );
}

export default Form;
