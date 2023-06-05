// This file contains the contact form
// It shows one field at a time

// have a page tracker that counts from 0 to 3
//

// third is a send button
// each field page has a back button and a next button
// for required fields next button doesn't work till input is valid

import {useState} from "react"

type form = {Subject: string, Email : string, Message : string}
type props = {form: form, handleFormChange: (currentPage: number, value: string)=>void}
function Form(){
let [currentPage, setCurrentPage] = useState(0)
let [form, setForm] = useState({Subject: "subject", Email: "email", Message: "message"} as form)

function handleClickBack(){
    setCurrentPage((currentPage)=>{
        if (currentPage > 0){return currentPage - 1}
        return currentPage
    })
}
function handleClickNext(){
    setCurrentPage((currentPage)=>{
        if (currentPage < 3){return currentPage + 1}
        return currentPage
    })
}
function handleFormChange(currentPage: number, value: string){
    if (currentPage === 0){setForm((prevForm)=>{return {...prevForm, Subject: value}})}
    if (currentPage === 1){setForm((prevForm)=>{return {...prevForm, Email: value}})}
    if (currentPage === 2){setForm((prevForm)=>{return {...prevForm, Message: value}})}
}

let pages = [Subject, Email, Message, Submit]

return(
    <div id="send-me-a-message">
    <h2>Send me a message</h2>
        <form>
            {pages[currentPage]({form: form, handleFormChange: handleFormChange})}
        </form>
        <button onClick={handleClickBack}>Back</button>
        <button onClick={handleClickNext}>Next</button>
  </ div>
  )
}

// 0
function Subject(props: props){
return     (
<>
    <label>Subject</label>
    <input type="text" name="subject" value={props.form.Subject} onChange={(e) => props.handleFormChange(0, e.target.value)}/>
</>)

}
// 1
function Email(props: props){
    return(
        <>
<label>Email</label>
    <input type="email" required name="email" value={props.form.Email} onChange={(e) => props.handleFormChange(1, e.target.value)}/>
        </>
    )
}

// 2
function Message(props: props){
    return(
        <>
            <label>Message</label>
            <textarea required name="message" rows={4} cols={50} value={props.form.Message} onChange={(e) => props.handleFormChange(2, e.target.value)}>
            Write your message here.
            </ textarea>
        </>
    )
}

// 3
function Submit(props: props){

    return(
        <>
            <label>Submit</label>
            <button>Submit</button>
        </>
    )
}

export default Form