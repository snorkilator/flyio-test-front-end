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
var setForm: React.Dispatch<React.SetStateAction<form>>;
var form: form;
function Form() {
  let [currentPage, setCurrentPage] = useState(0);

  [form, setForm] = useState((): form => {
    let retrievedForm = localStorage.getItem("form");
    if (!retrievedForm) {
      return {
        Subject: "subject",
        Email: "email",
        Message: "message",
      };
    }
    console.log(retrievedForm);
    let parsedForm: form = JSON.parse(retrievedForm);
    return parsedForm;
  });
  console.log(form);

  useEffect(() => {
    console.log("saving form");
    let interval = setInterval(
      () => {
        // console.log("page number: " + p);
        let formStr = JSON.stringify(form);
        localStorage.setItem("form", formStr);
        console.log("setting storage: " + formStr);
      },
      1000,
      form,
      currentPage
    );
    return () => clearInterval(interval);
  }, []);

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
      setForm((prevForm) => {
        return { ...prevForm, Subject: value };
      });
    }
    if (currentPage === 1) {
      setForm((prevForm) => {
        return { ...prevForm, Email: value };
      });
    }
    if (currentPage === 2) {
      setForm((prevForm) => {
        return { ...prevForm, Message: value };
      });
    }
  }

  let pages = [
    { component: Subject, name: "Subject" },
    { component: Email, name: "Email" },
    { component: Message, name: "Message" },
    { component: Submit, name: "Submit" },
  ];
  function goToFormPage(pageNum: number) {
    if (pageNum < pages.length) {
      setCurrentPage(pageNum);
    }
  }
  let formPageLinks = pages.map((page, i)=>{
    return <li onClick={()=>{goToFormPage(i)}} className={i == currentPage ? "highlighted":"notHighlighted"}><a>{page.name}</a></li>
  })
  return (
    <div id="send-me-a-message">
      <h2>Send me a message</h2>
      <form>
        {pages[currentPage].component({
          form: form,
          handleFormChange: handleFormChange,
        })}
      </form>
      <ul>{formPageLinks}</ul>
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
    e.preventDefault();
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.form),
    };
    try {
      let response = await fetch("", options);
      console.log("response:" + response.status);
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
