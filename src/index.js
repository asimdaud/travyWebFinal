import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss";

import Index from "views/Index.jsx";
import Landing from "views/examples/Landing.jsx";
import Login from "views/examples/Login.jsx";
import Profile from "views/examples/Profile.jsx";
import Register from "views/examples/Register.jsx";
import Timeline from "views/examples/Timeline.jsx";
import EditProfile from "views/examples/EditProfile";
import PrivateRoute from "./privateRoute";
import Modals from "./components/Modal/Modals";
import FriendsPage from "views/examples/FirendsPage";
import Group from "views/examples/Group.jsx";
// import Maps from "views/examples/Maps.jsx";
// import Maps2 from "views/examples/Maps2";
import Loc from "views/examples/location";
import postLoc from "views/examples/postLoc";
import Chat from "views/examples/chat";
import FriendReq from "views/examples/FriendReq";

import Location2 from "views/examples/location2";
import Mapbox from "views/examples/Mapbox";
import ExploreAroundMe from "views/examples/ExploreAroundMe";
import PeopleYouMayKnow from "views/examples/PeopleYouMayKnow";

// import MapC from "views/examples/MapContainer";

// import { isUserSignedIn } from "./services/authServices";

// function PrivateRoute({ children, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         fakeAuth.isAuthenticated ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: location }
//             }}
//           />
//         )
//       }
//     />
//   );
// }
// const fakeAuth = {
//   isAuthenticated: false,
//   isUserSignedIn(cb) {
//     fakeAuth.isAuthenticated = true;
//     setTimeout(cb, 100); // fake async
//   },
//   signout(cb) {
//     fakeAuth.isAuthenticated = false;
//     setTimeout(cb, 100);
//   }
// };

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* <PrivateRoute
        path="/modal"
        exact
        render={props => <Modals {...props} />}
      /> */}

      {/* <Route path="/" exact render={props => <Timeline {...props} />} /> */}

      {/* <Route
        path="/landing-page"
        exact
        render={props => <Landing {...props} />}
      /> */}
      {/* <Route
        path="/location2"
        exact
        render={(props) => <Location2 {...props} />}
      /> */}
      {/* <Route path="/Mapbox" exact render={(props) => <Mapbox {...props} />} /> */}

      <PrivateRoute path="/heatmap" exact render={(props) => <Loc {...props} />} />
      <Route path="/index" exact render={(props) => <Index {...props} />} />
      <Route path="/login" exact render={(props) => <Login {...props} />} />

      <PrivateRoute
        path="/explore"
        exact
        render={(props) => <ExploreAroundMe {...props} />}
      />

      <PrivateRoute
        path="/profile"
        render={(props) => <Profile {...props} />}
        exact
      />
      <PrivateRoute
        path="/group"
        render={(props) => <Group {...props} />}
        exact
      />
      {/* <PrivateRoute
        path="/fr"
        render={(props) => <FriendReq {...props} />}
        exact
      /> */}
      <PrivateRoute
        path="/edit-profile"
        render={(props) => <EditProfile {...props} />}
        exact
      />
      {/* <PrivateRoute
        path="/Maps"
        render={props => <Maps {...props} />}
        exact
      /> */}
      {/* <PrivateRoute
        path="/Maps2"
        render={props => <Maps2 {...props} />}
        exact  
      />
       */}

      <Route
        path="/register"
        exact
        render={(props) => <Register {...props} />}
      />

      {/* <Route path="/postLoc" exact render={(props) => <postLoc {...props} />} /> */}
      {/* <Route
        path="/timeline"
        exact
        render={props => <Timeline {...props} />}
      /> */}
      <PrivateRoute
        path="/chat"
        exact
        render={(props) => <Chat {...props} />}
      />
      <PrivateRoute
        path="/peopleyoumayknow"
        exact
        render={(props) => <PeopleYouMayKnow {...props} />}
      />
      <PrivateRoute
        path="/friend"
        render={(props) => <FriendsPage {...props} />}
        exact
      />
      <PrivateRoute
        path="/home"
        render={(props) => <Timeline {...props} />}
        exact
      />
      {/* <Redirect to="" render={props => <Login {...props} />}
        exact /> */}
      <Redirect to="/profile" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
