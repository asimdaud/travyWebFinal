// import React from "react";
// import { Route, Switch } from "react-router-dom";
// // reactstrap components
// import { Container, Row, Col } from "reactstrap";
// // core components
// import AuthFooter from "components/Footers/AuthFooter.jsx";
// import LandingNavbar from "components/Navbars/LandingNavbar.jsx";

// import routes from "routes.js";
// import { userSession, userToken } from "../services/authServices";
// import { firebase } from "../services/firebase";
// // import { firebase } from "./firebase";


// class Auth extends React.Component {
//   componentDidMount() {
//     // firebase.auth.onAuthStateChanged(authUser => {
//     //       authUser
//     //         ? localStorage.setItem('authUser', JSON.stringify(authUser))
//     //         : localStorage.removeItem('authUser')
//     //     });
//     // userToken();

//   //  firebase.auth().onAuthStateChanged(function(user) { 
//   //    if (user) 
//   //    { localStorage.setItem('authUser', JSON.stringify(user))

//   //   } 
//   //    else 
//   //    { console.log("No user is signed in") } }); 

// JSON.parse(localStorage.getItem('uid'));
//   // firestorePostRef =  firebase.firestore().collection("posts").doc(user3).collection("userPosts");
  


//     document.body.classList.add("bg-dark");
//   }
//   componentWillUnmount() {
//     document.body.classList.remove("bg-default");
//   }
//   getRoutes = routes => {
//     return routes.map((prop, key) => {
//       if (prop.layout === "/auth") {
//         return (
//           <Route
//             path={prop.layout + prop.path}
//             component={prop.component}
//             key={key}
//           />
//         );
//       } else {
//         return null;
//       }
//     });
//   };
//   render() {
//     return (
//       <>
//         <div className="main-content bg-dark"   style={{
//            // backgroundImage:
//            //   "url('http://mdbootstrap.com/img/Photos/Others/images/91.jpg')"
// //          background: 'linear-gradient(to left top, pink , crimson)'
// //background: 'linear-gradient(to right bottom,  rgba(242,246,248,1) 0%, rgba(216,225,231,1) 21%, rgba(181,198,208,1) 50%, rgba(210,226,236,1) 77%, rgba(224,239,249,1) 90%)'
// // background: 'linear-gradient(to top left, #ffffff 88%, #ff9999 75%)'
//           }}>
//           {/* <AuthNavbar /> */}
//           <LandingNavbar/>
//           <div className="header py-7 py-lg-8">
//             <Container>
                 
//             </Container>
          
//           </div>
//           {/* Page content */}
//           <Container className="mt--8 pb-5">
//             <Row className="justify-content-center">
//               <Switch>{this.getRoutes(routes)}</Switch>
//             </Row>
//           </Container>
//         </div>
//         <AuthFooter />
//       </>
//     );
//   }
// }
// export default Auth;