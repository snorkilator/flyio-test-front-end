// This file contains the content of the home page, including contact information, a "send me a message" form, and a picture of me

import Form from "./Form.tsx"

function Home() {
    return (
      <>
        <h1>Dr. Dan's Tech Support & Tutoring</h1>
        <div className="info">
        <p>
          Phone: 819 593 9063<br />
          Email: daniel+tech@rudenberg (dot) ca<br />
          Rate: $35/hour <br />
          Free 30 minute phone or video call consult. I don't charge for house
          calls for people within 30 minutes of Wakefield. If you live farther
          away, you can still reach out to me and we can work something out.
        </p>
        <b>Some of the services I can help you with:</b>
        <ul>
          <li>RAM and Harddrive replacement</li>
          <li>Password manager setup</li>
          <li>Router and modem setup</li>
          <li>Operating system installation (Windows, Ubuntu, MacOS)</li>
          <li>Computer and phone backup solutions</li>
          <li>Photo organization and duplicate removal</li>
          <li>File type conversions</li>
          <li>Printer troubleshooting</li>
        </ul>
        </div>
        <img alt="picture of Daniel" src="face.webp"></img>
        <Form />
      </>
    );
  }

  export default Home