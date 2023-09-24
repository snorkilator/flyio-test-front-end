import firebase from "firebase";
import firebaseui from "firebaseui";
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (
      authResult: string,
      redirectUrl: string
    ) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      alert(
        "You're signed in with auth result: " +
          authResult +
          "and you will be redirected to:" +
          redirectUrl
      );
      return true;
    },
    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      let loaderHTMLDIV = document.getElementById("loader");

      if (loaderHTMLDIV != null) {
        loaderHTMLDIV.style.display = "none";
      }
    },
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: "popup",
  signInSuccessUrl: "<url-to-redirect-to-on-success>",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  tosUrl: "<your-tos-url>",
  // Privacy policy url.
  privacyPolicyUrl: "<your-privacy-policy-url>",
};
ui.start("#firebaseui-auth-container", uiConfig);

var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start("#firebaseui-auth-container", {
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
  ],
  // Other config options...
});

export default function FireBaseAuthUI() {
  return (
    <>
      <h1>Welcome to My Awesome App</h1>
      <div id="firebaseui-auth-container"></div>
      <div id="loader">Loading...</div>
    </>
  );
}
