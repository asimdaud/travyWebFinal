/*global google*/

import React from "react";
// react plugin used to create google maps
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  TrafficLayer,
  Circle,
  InfoWindow,
} from "react-google-maps";

// import Geosuggest from "react-geosuggest";

// reactstrap components
import { Card, Container, Row, Modal, Button, Jumbotron } from "reactstrap";
import Post from "../../components/post";
import SimpleFooter from "components/Footers/SimpleFooter.jsx";
// import { HeatmapLayer } from '@react-google-maps/api';
import UserNavbar from "components/Navbars/UserNavbar.jsx";
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";

import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";
import { firebase } from "../../services/firebase";
import Timeline from "../examples/Timeline";
import { Redirect, Link } from "react-router-dom";
import Autocomplete from "react-google-autocomplete";
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyBaUWUZCAN9s7X7CvNVOEm6t4lQ7ZKE-3A");
Geocode.enableDebug();

const userId = JSON.parse(localStorage.getItem("uid"));
// const that = this.setTimeout(() => that.setState({ overlay: false }), 1500)

class location extends React.Component {
  firestoreUsersRef = firebase.firestore().collection("users");
  firestorePostRef = firebase.firestore().collection("posts");
  // firestoreFollowingRef = firebase.firestore().collection("following").doc(this.state.user).collection("userFollowing");

  MapWrapper = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap
        defaultZoom={10}
        // panTo={{
        //   lat: this.state.markerPosition.lat,
        //     lng: this.state.markerPosition.lng,
        // }}
        // defaultCenter={{ lat: 33.738045, lng: 73.084488 }}
        defaultCenter={{
          lat: this.state.mapPosition.lat,
          lng: this.state.mapPosition.lng,
        }}
        getClickableIcons={true}
        defaultOptions={{
          styles: [
            {
              featureType: "all",
              elementType: "all",
              stylers: [
                { invert_lightness: true },
                { saturation: "-9" },
                { lightness: "0" },
                { visibility: "simplified" },
              ],
            },
            {
              featureType: "landscape.man_made",
              elementType: "all",
              stylers: [{ weight: "1.00" }],
            },
            {
              featureType: "road.highway",
              elementType: "all",
              stylers: [{ weight: "0.49" }],
            },
            {
              featureType: "road.highway",
              elementType: "labels",
              stylers: [
                { visibility: "on" },
                { weight: "0.01" },
                { lightness: "-7" },
                { saturation: "-35" },
              ],
            },
            {
              featureType: "road.highway",
              elementType: "labels.text",
              stylers: [{ visibility: "on" }],
            },
            {
              featureType: "road.highway",
              elementType: "labels.text.stroke",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "road.highway",
              elementType: "labels.icon",
              stylers: [{ visibility: "on" }],
            },
          ],

          scrollwheel: false,
          streetViewControl: false,
          disableDoubleClickZoom: false,
          // ,mapTypeId: google.maps.MapTypeId.TERRAIN
          // ,mapTypeId: google.maps.MapTypeId.ROADMAP
          // mapTypeId: google.maps.MapTypeId.HYBRID,

          // new stuff -->
          panControl: true,
          mapTypeControl: true,
          panControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER,
          },
          zoomControl: true,
          zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.RIGHT_CENTER,
          },
          scaleControl: false,
          streetViewControl: false,
          streetViewControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER,
          },
        }}
      >
        {/* For Auto complete Search Box */}
        {/* <Autocomplete
          controlPosition={google.maps.ControlPosition.TOP}
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `100%`,
            height: `32px`,
            marginTop: `27px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
          }}
          onPlaceSelected={this.onPlaceSelected}
          types={["(regions)"]}
        /> */}

        {/* <SearchBox
          // ref={props.onSearchBoxMounted}
          // bounds={props.bounds}
          controlPosition={google.maps.ControlPosition.TOP}
          // // onPlacesChanged={props.onPlacesChanged}
          // onPlaceSelected={props.onPlaceSelected}
          // onPlacesChanged={props.onPlaceSelected}
          // // onPlaceSelected={this.onPlaceSelected}
          // types={["(regions)"]}
          onPlaceSelected={this.onPlaceSelected}
          types={["(regions)"]}

        >
          <input
            type="text"
            placeholder="Enter a location"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              marginTop: `27px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
            }}
          />
        </SearchBox> */}

        {/*Marker*/}
        {/* <Marker

          options={{
            icon: {
              url: require("assets/img/icons/map/navigation.png"),
              scaledSize: { width: 40, height: 40 },
            },
          }}
          google={this.props.google}
          // name={"Dolores park"}
          draggable={true}
          onDragEnd={this.onMarkerDragEnd}
          position={{
            lat: this.state.markerPosition.lat,
            lng: this.state.markerPosition.lng,
          }}
        />
        <Marker /> */}

        {/* InfoWindow on top of marker */}
        {/* <InfoWindow
          onClose={this.onInfoWindowClose}
          position={{
            lat: this.state.markerPosition.lat + 0.0018,
            lng: this.state.markerPosition.lng,
          }}
        >
          <div>
            <span style={{ padding: 0, margin: 0 }}>
              {this.state.address}
            </span>
          </div>
        </InfoWindow> */}

        {this.state.showMyLoc ? (
          <InfoWindow
            onClick={() => {
              this.hideMyLoc();
            }}
            onClose={this.onInfoWindowClose}
            position={{
              lat: props.getUserLat + 0.0018,
              lng: props.getUserLong,
            }}
          >
            <div>
              <img
                height="50"
                width="50"
                style={{
                  // width: "200px",
                  // height: "200px",
                  display: "block",
                  objectFit: "cover",
                }}
                alt="..."
                className="avatar"
                // src={this.state.userAvatar}
                src={
                  "https://firebasestorage.googleapis.com/v0/b/travycomsats.appspot.com/o/profilePics%2F(" +
                  this.state.user +
                  ")ProfilePic?alt=media&token=69135050-dec6-461d-bc02-487766e1c81d"
                }
              />
              <pre>{props.getUserLocation}</pre>
            </div>
          </InfoWindow>
        ) : null}

        {props.heatMapData.map((mark, index) => (
          <Marker
            onClick={() => {
              this.setState({ defaultModal: true });
              this.setState({ modalItem: this.state.posts[index] });
            }}
            position={mark}
            options={{
              icon: {
                url: require("assets/img/icons/map/marker.png"),
                scaledSize: { width: 40, height: 40 },
              },
            }}
            title="Clickable marker"
            animation="drop"
            // animation={new google.maps.Animation}
          ></Marker>
        ))}

        {this.state.getSuggPlaces
          ? this.state.userSuggestedPlaces.map((mark, index) => (
              <Marker
                position={{
                  lat: mark.marker.latitude,
                  lng: mark.marker.longitude,
                }}
                options={{
                  icon: {
                    url: require("assets/img/icons/map/map2.png"),
                    scaledSize: { width: 70, height: 70 },
                  },
                }}
                title={mark.name}
                animation="drop"
                // animation={new google.maps.Animation}
              ></Marker>
            ))
          : ""}

        {this.state.getPlacesNearMe
          ? this.state.placesNearMe.map((mark, index) => (
              <Marker
                position={{
                  lat: mark.marker.latitude,
                  lng: mark.marker.longitude,
                }}
                options={{
                  icon: {
                    url: require("assets/img/icons/map/gm5.png"),
                    scaledSize: { width: 30, height: 30 },
                  },
                }}
                title={mark.name}
                animation="drop"
                // animation={new google.maps.Animation}
              ></Marker>
            ))
          : ""}

        <HeatmapLayer
          options={
            { radius: 70 }
            //   ,{ opacity: 1 },
            // { maxIntensity: 200 },
            // { //   gradient: [
            //     "rgba(0, 255, 255, 0)",
            //     "rgba(0, 255, 255, 1)",
            //     "rgba(0, 191, 255, 1)",
            //     "rgba(0, 127, 255, 1)",
            //     "rgba(0, 63, 255, 1)",
            //     "rgba(0, 0, 255, 1)",
            //     "rgba(0, 0, 223, 1)",
            //     "rgba(0, 0, 191, 1)",
            //     "rgba(0, 0, 159, 1)",
            //     "rgba(0, 0, 127, 1)",
            //     "rgba(0, 0, 127, 1)",
            //     "rgba(63, 0, 91, 1)",
            //     "rgba(127, 0, 63, 1)",
            //     "rgba(191, 0, 31, 1)",
            //     "rgba(255, 0, 0, 1)"
            //   ]
            // }
          }
          data={props.heatMapData}
        />

<HeatmapLayer
          options={
            { radius: 99 }
              ,{ opacity: 0.5 },
            { maxIntensity: 200 },
            {   gradient: [
                "rgba(0, 255, 255, 0)",
                "rgba(0, 255, 255, 1)",
                "rgba(0, 191, 255, 1)",
                "rgba(0, 127, 255, 1)",
                "rgba(0, 63, 255, 1)",
                "rgba(0, 0, 255, 1)",
                "rgba(0, 0, 223, 1)",
                "rgba(0, 0, 191, 1)",
                "rgba(0, 0, 159, 1)",
                "rgba(0, 0, 127, 1)",
                "rgba(0, 0, 127, 1)",
                "rgba(63, 0, 91, 1)",
                "rgba(127, 0, 63, 1)",
                "rgba(191, 0, 31, 1)",
                "rgba(255, 0, 0, 1)"
              ]
            }
          }
          data={this.state.getHeatMapDataForPlaces}

        />


        {/* <TrafficLayer   onLoad={onLoad}/> */}
      </GoogleMap>
    ))
  );

  state = {
    posts: [],
    followedUsers: [],
    user: JSON.parse(localStorage.getItem("uid")),
    userData: {},
    currentUserData: {},
    avatar: "",
    userSuggestedPlaces: [],
    getSuggPlaces: false,
    heatMapData: [],
    marks: [],
    selectedMarker: false,
    placesNearMe: [],
    getPlacesNearMe: false,
    postId: [],
    defaultModal: false,
    userLastSeen: "N/A",
    userLongitude: 0,
    userLatitude: 0,
    markerImage: "",
    modalItem: "",
    getHeatMapDataForPlaces:[],
    // address: "",
    // city: "",
    loading: true,
    // area: "",
    // state: "",
    showMyLoc: false,

    address: "",
    city: "",
    area: "",
    state: "",
    mapPosition: {
      lat: 33.738045,
      lng: 73.084488,
    },
    markerPosition: {
      lat: 33.738045,
      lng: 73.084488,
    },
    // mapPosition: {
    //  lat: this.props.center.lat,
    //  lng: this.props.center.lng
    // },
    //     markerPosition: {
    //      lat: this.props.center.lat,
    //      lng: this.props.center.lng
    //  }
  };

  // setMark = e => {
  //   this.setState({ marks: [...this.state.marks, e.latLng] });
  // };

  // deleteMark = () => {
  //   this.setState({
  //       marks: []
  //   });
  // };

  componentWillMount = () => {};

  /**
   * Get the current address from the default map position and set those values in the state
   */
  componentDidMount() {
    this.getFollowingPosts().then(() => {
     
      this.getHeatMapData();
      this.getUserLastSeen();
      this.getHeatMapDataForPlaces();

      // this.onClick();
    });

    // Geocode.fromLatLng(
    //   this.state.mapPosition.lat,
    //   this.state.mapPosition.lng
    // ).then(
    //   (response) => {
    //     const address = response.results[0].formatted_address,
    //       addressArray = response.results[0].address_components;

    //     this.setState({
    //       address: address ? address : "",
    //     });
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // );
    // console.log("5");
  }

  // /**
  //    * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
  //    *
  //    * @param nextProps
  //    * @param nextState
  //    * @return {boolean}
  //    */
  //   shouldComponentUpdate(nextProps, nextState) {
  //     if (
  //       this.state.markerPosition.lat !== this.props.center.lat ||
  //       this.state.address !== nextState.address
  //     ) {
  //       return true;
  //     } else if (this.props.center.lat === nextProps.center.lat) {
  //       return false;
  //     }
  //   };
  /**
   * This Event triggers when the marker window is closed
   *
   * @param event
   */
  onInfoWindowClose = (event) => {};
  /**
   * When the user types an address in the search box
   * @param place
   */
  // onPlaceSelected = (place) => {
  //   const address = place.formatted_address,
  //     addressArray = place.address_components,
  //     latValue = place.geometry.location.lat(),
  //     lngValue = place.geometry.location.lng();
  //   // Set these values in the state.
  //   this.setState({
  //     address: address ? address : "",
  //     markerPosition: {
  //       lat: latValue,
  //       lng: lngValue,
  //     },
  //     mapPosition: {
  //       lat: latValue,
  //       lng: lngValue,
  //     },
  //   });
  // };

  // Get all the users the current user3 is following
  // getFollowedUsers = async () => {
  //   let users = [];
  //   await this.firestoreUsersRef
  //     .doc(this.state.user3)
  //     .collection("following")
  //     .get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((docSnap) => {
  //         users.push(docSnap.id);
  //       });
  //       // this.setState({followedUsers: users});
  //     });
  //   this.setState({ followedUsers: users });
  //   // console.log(this.state.followedUsers);
  // };

  // Get all the users the current user3 is following
  getFollowedUsers = async () => {
    let users = [];
    await this.firestoreUsersRef
      .doc(this.state.user)
      .collection("following")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((docSnap) => {
          users.push(docSnap.id);
        });
        // this.setState({followedUsers: users});
      });
    this.setState({ followedUsers: users });
    // console.log(this.state.followedUsers);
  };

  getFollowingPosts = async () => {
    await this.getFollowedUsers().then(async () => {
      let users = this.state.followedUsers;
      let allPosts = [];
      for (const eachUser of users) {
        await this.getProfilePic(eachUser).then(async () => {
          // console.log("Avatar:" + this.state.avatar);
          await this.firestoreUsersRef
            .doc(eachUser)
            .get()
            .then(async (document) => {
              this.setState({ userData: document.data() });
              await this.firestorePostRef
                .doc(eachUser)
                .collection("userPosts")
                .orderBy("time", "desc")
                .get()
                .then((snapshot) => {
                  snapshot.forEach((doc) => {
                    let article = {
                      username: this.state.userData.username,
                      userId: eachUser,
                      title: "post",
                      avatar: this.state.avatar,
                      image: doc.data().image,
                      cta: "cta",
                      caption: doc.data().caption,
                      location: doc.data().location.coordinates,
                      locName: doc.data().location.locationName,
                      postId: doc.data().postId,
                      timeStamp: doc.data().time,

                      locLatLng: "Address",
                    };
                    allPosts.push(article);
                  });
                });
              this.setState({ posts: allPosts });
            });
        });
      }
    });
  };

  getProfilePic = async (user) => {
    const firebaseProfilePic = await firebase
      .storage()
      .ref()
      .child("profilePics/(" + user + ")ProfilePic");
    firebaseProfilePic
      .getDownloadURL()
      .then((url) => {
        this.setState({ avatar: url });
        // console.log(this.state.avatar);

        return url;
      })
      .catch((error) => {
        // Handle any errors
        switch (error.code) {
          case "storage/object-not-found":
            // File doesn't exist
            this.setState({
              avatar:
                "https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder.gif",
            });
            return "https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder.gif";
          // break;
        }
        // alert(error);
        console.log(error);
      });
  };

  getUserLastSeen = () => {
    this.setState({
      loading: true,
    });
    firebase
      .storage()
      .ref()
      .child("profilePics/(" + this.state.user + ")ProfilePic")
      .getDownloadURL()
      .then((url) => {
        this.setState({ userAvatar: url });
        // console.log(this.state.userAvatar);

        return url;
      })
      .catch((error) => {
        // Handle any errors
        switch (error.code) {
          case "storage/object-not-found":
            // File doesn't exist
            this.setState({
              userAvatar:
                "https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder.gif",
            });
            return "https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder.gif";
        }
        // alert(error);
        console.log(error);
      });

    this.firestoreUsersRef
      .doc(this.state.user)
      .get()
      .then((document) => {
        this.setState({ currentUserData: document.data() });
        // console.log(document.data());
        // console.log(document);
        // console.log(this.state.currentUserData);
        if (this.state.currentUserData.location) {
          let lSeen = "";
          let latitude = 0;
          let longitude = 0;

          // lSeen = document.data().location.lastSeen;
          // latitude = document.data().location.latitude;
          // longitude = document.data().location.longitude;

          lSeen = this.state.currentUserData.location.lastSeen;
          latitude = this.state.currentUserData.location.latitude;
          longitude = this.state.currentUserData.location.longitude;

          this.setState({
            userLastSeen: lSeen,
            userLatitude: latitude,
            userLongitude: longitude,
          });

          this.setState({
            loading: false,
          });
        }
      });
    // console.log(lastSeen);
  };

  markerImage = () => {
    // let mImage= this.state.
    // this.setState({ markerImage: mImage});

    this.getProfilePic(this.state.user);
    // console.log("2");
  };

  showMyLoc = () => {
    this.setState({ showMyLoc: true });
  };

  hideMyLoc = () => {
    this.setState({ showMyLoc: false });
  };

  getHeatMapData = () => {
    let data = [];
    let postTag = [];
    let posts = this.state.posts;
    posts.forEach((post) => {
      let point = new google.maps.LatLng(post.location.lat, post.location.lng);
      data.push(point);
      postTag.push(post.postId);
    });
    this.setState({ heatMapData: data, postId: postTag });
    // console.log(this.state.heatMapData);
    // console.log(this.state.postId);
  };

  getHeatMapDataForPlaces = () => {

    const markers = [];


    firebase
      .firestore()
      .collection("placesRecommendations")
      .doc(this.state.user)
      .collection("recommendedPlaces")
      .doc(this.state.user)
      .onSnapshot((doc) => {
        const res = doc.data();
        res.places.map((element, index) => {
          const marketObj = {};
          // marketObj.id = element.id;
          // marketObj.place_id = element.place_id;
          // marketObj.name = element.name;
           marketObj.marker = {
              latitude: element.geometry.location.lat,
              longitude: element.geometry.location.lng,
            };

          markers.push(marketObj);
        });
        let data = [];
        let posts = markers;
        posts.forEach((post) => {
          let point = new google.maps.LatLng(post.marker.latitude, post.marker.longitude);
          data.push(point);
        });
        this.setState({ getHeatMapDataForPlaces: data });
        // console.log(this.state.getHeatMapDataForPlaces)
    
      });
    
  };

  getSuggestedPlaces = () => {
    const markers = [];
    //NEARBY PLACES
    // firebase
    //   .firestore()
    //   .collection("placesRecommendations")
    //   .doc(this.state.user3)
    //   .collection("recommendedPlaces")
    //   .doc(this.state.user3)

    firebase
      .firestore()
      .collection("userSuggestedPlaces")
      .doc(this.state.user)
      .onSnapshot((doc) => {
        const res = doc.data();
        res.places.map((element, index) => {
          const marketObj = {};
          marketObj.id = element.id;
          // marketObj.icon = element.icon;
          marketObj.place_id = element.place_id;
          // marketObj.opening_hours = element.opening_hours;
          // marketObj.photoURL=element.photos[0].getUrl();
          marketObj.name = element.name;
          // marketObj.photos = element.photos;
          // marketObj.rating = element.rating;
          // marketObj.vicinity = element.vicinity;
          // marketObj.type = element.type;
          marketObj.marker = {
            latitude: element.marker.latitude,
            longitude: element.marker.longitude,
          };

          markers.push(marketObj);

          // if (marketObj.photos  ) {
          //   console.log(
          //     "ref ref ref ref: " + marketObj.photos[0].photo_reference
          //   );
          // }else console.log("no photototot")
        });

        this.setState({ userSuggestedPlaces: markers, getSuggPlaces: true });
      });
  };

  getPlacesNearMe = () => {
    const markers = [];


    firebase
      .firestore()
      .collection("placesRecommendations")
      .doc(this.state.user)
      .collection("recommendedPlaces")
      .doc(this.state.user)
      .onSnapshot((doc) => {
        const res = doc.data();
        res.places.map((element, index) => {
          const marketObj = {};
          marketObj.id = element.id;
          // marketObj.icon = element.icon;
          marketObj.place_id = element.place_id;
          // marketObj.opening_hours = element.opening_hours;
          // marketObj.photoURL=element.photos[0].getUrl();
          marketObj.name = element.name;
          // marketObj.photos = element.photos;
          // marketObj.rating = element.rating;
          // marketObj.vicinity = element.vicinity;
          // marketObj.type = element.type;
           marketObj.marker = {
              latitude: element.geometry.location.lat,
              longitude: element.geometry.location.lng,
            };

          markers.push(marketObj);

          // if (marketObj.photos  ) {
          //   console.log(
          //     "ref ref ref ref: " + marketObj.photos[0].photo_reference
          //   );
          // }else console.log("no photototot")
        });

        this.setState({ placesNearMe: markers, getPlacesNearMe: true });

        // console.log(this.state.userSuggestedPlaces);
      });
  };

  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };

  render() {
    const { loading, marks } = this.state;

    return (
      <>
        <UserNavbar />
        <main className="profile-page" ref="main">
          <section className="section-profile-cover section-shaped my-0">
            {/* Circles background */}
            <div className="shape shape-style-1 shape-default alpha-4">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          <section className="section mt--300">
            <Container className="mt--200 pb-5" fluid>
              <Card
                fluid
                body
                inverse
                style={{
                  backgroundColor: "#333",
                  borderColor: "#333",
                  zoom: "70%",
                }}
              >
                <Container fluid>
                  <h1 className="display-3 text-white">Reactive Maps</h1>
                  <p className="lead text-white">
                    View your friend's posts on the map.
                  </p>
                  {this.state.showMyLoc ? (
                      <Button
                      //  outline
                       color="info"
                       onClick={() => {
  this.setState({showMyLoc:false})                     }}
                     >
                      Show my location!
                     </Button>
                  ) : (
                    <Button
                      outline
                      color="info"
                      onClick={() => {
                        this.showMyLoc();
                      }}
                    >
                      Show my location!
                    </Button>
                  )}{" "}
                  {this.state.getSuggPlaces ? (
                     <Button
                    //  outline
                     color="danger"
                     onClick={() => {
this.setState({getSuggPlaces:false})                     }}
                   >
                     Show me suggested places!
                   </Button>
                  ) : (
                    <Button
                      outline
                      color="danger"
                      onClick={() => {
                        this.getSuggestedPlaces();
                      }}
                    >
                      Show me suggested places!
                    </Button>
                  )}{" "}
                  {this.state.getPlacesNearMe ? (
                     <Button
                    //  outline
                     color="success"
                     onClick={() => {
                      this.setState({getPlacesNearMe:false})                    
                     }}
                   >
                     Show places near me!
                   </Button>
                  ) : (
                    <Button
                      outline
                      color="success"
                      onClick={() => {
                        this.getPlacesNearMe();
                      }}
                    >
                      Show places near me!
                    </Button>
                  )}
                </Container>
              </Card>
              <Row style={{ zoom: "65%" }}>
                <div
                  className="col"
                  style={{ display: loading ? "none" : "block" }}
                >
                  <Card className="shadow border-0 shadow">
                    <this.MapWrapper
                      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBaUWUZCAN9s7X7CvNVOEm6t4lQ7ZKE-3A&libraries=visualization,places"
                      loadingElement={<div style={{ height: `100%` }} />}
                      heatMapData={this.state.heatMapData}
                      markerImage={this.state.markerImage}
                      getUserLocation={this.state.userLastSeen}
                      getUserLat={this.state.userLatitude}
                      getUserLong={this.state.userLongitude}
                      onPlacesChanged={this.onPlacesChanged}
                      onPlaceSelected={this.onPlaceSelected}
                      posts={this.state.posts}
                      postId={this.state.postId}
                      containerElement={
                        <div
                          style={{ height: `1000px` }}
                          className="map-canvas"
                          id="map-canvas"
                        />
                      }
                      mapElement={
                        <div style={{ height: `100%`, borderRadius: "on" }} />
                      }
                    />
                  </Card>
                </div>
              </Row>
            </Container>
          </section>
        </main>

        <Modal
          fluid
          size="xs"
          isOpen={this.state.defaultModal}
          toggle={() => this.toggleModal("defaultModal")}
        >
          {this.state.modalItem && <Post item={this.state.modalItem} />}
        </Modal>
        <SimpleFooter />
      </>
    );
  }
}

export default location;
