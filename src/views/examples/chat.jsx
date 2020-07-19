/*global google*/

import moment from "moment";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// reactstrap components
import {
  Card,
  Container,
  Row,
  Button,
  FormGroup,
  Form,
  ListGroup,
  ListGroupItem,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import ReactLoading from "react-loading";
import ReactShadowScroll from "react-shadow-scroll";

// import { HeatmapLayer } from '@react-google-maps/api';
import UserNavbar from "components/Navbars/UserNavbar.jsx";
// import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";
import SimpleFooter from "components/Footers/SimpleFooter.jsx";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";
import { firebase } from "../../services/firebase";
import Timeline from "../examples/Timeline";
import { DeleteOutline } from "@material-ui/icons";

import { Link } from "react-router-dom";

const userId = JSON.parse(localStorage.getItem("uid"));
const firestoreUsersRef = firebase.firestore().collection("users");
// const firestorePostRef = firebase.firestore().collection("posts");
// const firestoreFollowingRef = firebase.firestore()
//   .collection("following")
//   .doc(userId)
//   .collection("userFollowing");

class chat extends React.Component {
  firestoreUsersRef = firebase.firestore().collection("users");
  firestorePostRef = firebase.firestore().collection("posts");
  firestoreFollowingRef = firebase
    .firestore()
    .collection("following")
    .doc(userId)
    .collection("userFollowing");
  user = firebase.auth().currentUser;
  constructor(props) {
    super(props);
    this.state = {
      //        user: firebase.auth().currentUser,
      // userId: this.props.item.userId,
      progress: 0,
      userName: "username",
      name: "name",
      followedUsersData: [],
      peerName: "peer",
      peerUserName: "peer username",
      friendName: "friend name",
      friendUserName: "friend username",
      profilePic:
        "https://image.shutterstock.com/image-vector/vector-man-profile-icon-avatar-260nw-1473553328.jpg",
      peerPic:
        "https://image.shutterstock.com/image-vector/vector-man-profile-icon-avatar-260nw-1473553328.jpg",
      friendPic:
        "https://image.shutterstock.com/image-vector/vector-man-profile-icon-avatar-260nw-1473553328.jpg",
      followedUsers: [],
      isLoading: false,
      chatDeleted: false,
      inputValue: "",
    };
    this.currentUserId = JSON.parse(localStorage.getItem("uid"));
    this.currentUserAvatar = this.state.profiePic;
    this.listMessage = [];
    this.currentPeerUser = localStorage.getItem("Fuid");
    this.currentPeerUserId = JSON.parse(localStorage.getItem("Fuid"));
    // this.FListId = this.getFollowedUsers;
    // this.fListPic=;
    // this.fListName=;
    this.groupChatId = null;
    this.removeListener = null;
    this.currentPhotoFile = null;
  }

  getCurrentUsername() {
    this.firestoreUsersRef
      .doc(this.user.uid)
      .get()
      .then((document) => {
        this.setState({ currentUsername: document.data().username });
      });
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentDidMount() {
    // For first render, it's not go through componentWillReceiveProps

    this.getListHistory();
    this.getFollowedUsers();
  }

  getFollowedUsersData = () => {
    let followedUsersDataArr = [];
    let avatar =
      "https://images.unsplash.com/photo-1502630859934-b3b41d18206c?w=500&h=500&fit=crop";
    let name, username;
    this.state.followedUsers.forEach((userId) => {
      //  avatar =  this.getUserPic(userId);
      firestoreUsersRef
        .doc(userId)
        .get()
        .then((doc) => {
          name = doc.data().name;
          username = doc.data().username;

          let followedUsersData = {
            userId: userId,
            name: name,
            username: username,
            avatar:
              "https://firebasestorage.googleapis.com/v0/b/travycomsats.appspot.com/o/profilePics%2F(" +
              userId +
              ")ProfilePic?alt=media&token=69135050-dec6-461d-bc02-487766e1c81d",
          };

          followedUsersDataArr.push(followedUsersData);
          this.setState({ followedUsersData: followedUsersDataArr });
          // console.log(this.state.followedUsersData);
        })
        .catch((err) => {
          alert(err);
        });
    });
  };

  getUserPic = (friendId) => {
    const firebaseProfilePic = firebase
      .storage()
      .ref()
      .child("profilePics/(" + friendId + ")ProfilePic");
    let url = "";
    firebaseProfilePic
      .getDownloadURL()
      .then((url) => {
        // Inserting into an State and local storage incase new device:
        // this.setState({ peerPic: url });
        url = url;

        console.log("dsbdashbfhasfb" + url);
        return url;
      })
      .catch((error) => {
        // Handle any errors
        switch (error.code) {
          case "storage/object-not-found":
            // File doesn't exist
            url =
              "https://images.unsplash.com/photo-1502630859934-b3b41d18206c?w=500&h=500&fit=crop";
            // this.setState({
            //   peerPic:"https://images.unsplash.com/photo-1502630859934-b3b41d18206c?w=500&h=500&fit=crop",
            //   });
            return url;
            break;
          default:
        }
        //   alert(error);
      });
  };

  getProfilePic = (friendId) => {
    const firebaseProfilePic = firebase
      .storage()
      .ref()
      .child("profilePics/(" + this.currentPeerUserId + ")ProfilePic");
    let url = "";
    firebaseProfilePic
      .getDownloadURL()
      .then((url) => {
        // Inserting into an State and local storage incase new device:
        this.setState({ peerPic: url });
        // url = url;
      })
      .catch((error) => {
        // Handle any errors
        switch (error.code) {
          case "storage/object-not-found":
            // File doesn't exist
            // url =  "https://images.unsplash.com/photo-1502630859934-b3b41d18206c?w=500&h=500&fit=crop";
            this.setState({
              peerPic:
                "https://images.unsplash.com/photo-1502630859934-b3b41d18206c?w=500&h=500&fit=crop",
            });
            break;
          default:
        }
        //   alert(error);
      });
    // return url;
  };

  componentWillMount = () => {
    this.getFollowedUsers();

    this.getProfilePic();

    firestoreUsersRef.doc(this.currentUserId).onSnapshot((doc) => {
      const res = doc.data();
      if (res != null) {
        this.setState({
          username: res.username,
          name: res.name,
        });
      }
    });

    firestoreUsersRef.doc(this.currentPeerUserId).onSnapshot((doc) => {
      const res = doc.data();
      if (res != null) {
        this.setState({
          peerUserName: res.username,
          peerName: res.name,
        });
      }
    });

    // profile pic
    const firebaseProfilePic = firebase
      .storage()
      .ref()
      .child("profilePics/(" + this.currentUserId + ")ProfilePic");
    firebaseProfilePic
      .getDownloadURL()
      .then((url) => {
        // Inserting into an State and local storage incase new device:
        this.setState({ profilePic: url });
      })
      .catch((error) => {
        // Handle any errors
        switch (error.code) {
          case "storage/object-not-found":
            // File doesn't exist
            this.setState({
              profilePic:
                "https://images.unsplash.com/photo-1502630859934-b3b41d18206c?w=500&h=500&fit=crop",
            });
            break;
          default:
        }
        // alert(error);
      });
  };

  componentWillUnmount() {
    if (this.removeListener) {
      this.removeListener();
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currentPeerUser) {
      this.currentPeerUser = newProps.currentPeerUser;
      this.getListHistory();
    }
  }

  getListHistory = () => {
    if (this.removeListener) {
      this.removeListener();
    }
    this.listMessage.length = 0;
    this.setState({ isLoading: true });
    if (this.currentUserId <= this.currentPeerUserId) {
      this.groupChatId = `${this.currentUserId}-${this.currentPeerUserId}`;
    } else {
      this.groupChatId = `${this.currentPeerUserId}-${this.currentUserId}`;
    }

    // Get history and listen new data added
    this.removeListener = firebase
      .firestore()
      .collection("messages")
      .doc(this.groupChatId)
      .collection("msg")
      .onSnapshot(
        (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              this.listMessage.push(change.doc.data());
            }
          });
          this.setState({ isLoading: false });
        },
        (err) => {
          this.props.showToast(0, err.toString());
        }
      );
  };

  onSendMessage = (content, type) => {
    if (content.trim() === "") {
      return;
    }

    const timestamp = moment().valueOf().toString();

    const itemMessage = {
      idFrom: this.currentUserId,
      idTo: this.currentPeerUserId,
      timestamp: timestamp,
      content: content.trim(),
      type: type,
      // messageId:""
    };

    firebase
      .firestore()
      .collection("messages")
      .doc(this.groupChatId)
      .collection("msg")
      .doc(timestamp)
      .set(itemMessage)
      .then(() => {
        this.setState({ inputValue: "" });
      })
      .catch((err) => {
        this.props.showToast(0, err.toString());
      });
  };

  onChoosePhoto = (event) => {
    if (event.target.files && event.target.files[0]) {
      this.setState({ isLoading: true });
      this.currentPhotoFile = event.target.files[0];
      // Check this file is an image?
      const prefixFiletype = event.target.files[0].type.toString();
      if (prefixFiletype.indexOf("image/") === 0) {
        this.uploadPhoto();
      } else {
        this.setState({ isLoading: false });
        this.props.showToast(0, "This file is not an image");
      }
    } else {
      this.setState({ isLoading: false });
    }
  };

  uploadPhoto = () => {
    if (this.currentPhotoFile) {
      const timestamp = moment().valueOf().toString();

      const uploadTask = firebase
        .storage()
        .ref()
        .child("chatPics/" + timestamp)
        .put(this.currentPhotoFile);

      uploadTask.on(
        "state_changed",
        // null,
        (snapshot) => {
          const getProgress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setState({ progress: getProgress });
        },
        (err) => {
          this.setState({ isLoading: false });
          this.props.showToast(0, err.message);
        },

        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.setState({ isLoading: false });
            this.onSendMessage(downloadURL, 1);
          });
        }
      );
    } else {
      this.setState({ isLoading: false });
      this.props.showToast(0, "File is null");
    }
  };

  onKeyboardPress = (event) => {
    if (event.key === "Enter") {
      this.onSendMessage(this.state.inputValue, 0);
    }
  };

  scrollToBottom = () => {
    if (this.messagesEnd) {
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Get all the users the current user3 is following
  getFollowedUsers = async () => {
    let users = [];
    await this.firestoreFollowingRef.get().then((querySnapshot) => {
      querySnapshot.forEach((docSnap) => {
        users.push(docSnap.id);
      });
    });
    this.setState({ followedUsers: users });
    console.log("FRIENDS LIST: " + this.state.followedUsers);
    this.getFollowedUsersData();
  };

  renderListMessage = () => {
    if (this.listMessage.length > 0) {
      let viewListMessage = [];

      this.listMessage.forEach((item, index) => {
        if (item.idFrom === this.currentUserId) {
          // Item right (my message)
          if (item.type === 0) {
            viewListMessage.push(
              <div className="row justify-content-end text-right">
                <div className="col-auto">
                  {/* <ReactShadowScroll> */}
                  <div className="card bg-gradient-muted text-primary">
                    <div className="card-body p-2" key={item.timestamp}>
                      <p className="mb-1 font-weight-bold">
                        {item.content}
                        <br />
                      </p>
                      <div>
                        <small className="opacity-60">
                          {moment(Number(item.timestamp)).format("lll")}
                        </small>
                        <i className="ni ni-check-bold"></i>
                      </div>
                    </div>
                  </div>
                  {/* </ReactShadowScroll> */}
                </div>
              </div>
            );
          } else if (item.type === 1) {
            viewListMessage.push(
              <div className="row justify-content-end text-right">
                <div
                  className="col-auto"
                  style={{ height: "15%", width: "20%" }}
                >
                  {/* <ReactShadowScroll> */}
                  <div className="card bg-gradient-muted text-primary">
                    <div className="card-body p-2 ml-auto" key={item.timestamp}>
                      <p className="mb-1 font-weight-bold">
                        {/* <Card className="viewItemRight2 ml-auto"  key={item.timestamp}
              style={{  height: "15%", width : "20%" }}
              > */}
                        <img
                          className="img-fluid rounded"
                          src={item.content}
                          alt="Image placeholder"
                        />
                        {/* </Card>  */}
                        <br />
                      </p>
                      <div>
                        <small className="opacity-60">
                          {moment(Number(item.timestamp)).format("lll")}
                        </small>
                        <i className="ni ni-check-bold"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          // else {
          //   viewListMessage.push(
          //     <div className="viewItemRight3" key={item.timestamp}>
          //       <img
          //         className="imgItemRight"
          //         src={this.getGifImage(item.content)}
          //         alt="content message"
          //       />
          //     </div>
          //   );
          // }
        } else {
          // Item left (peer message)
          if (item.type === 0) {
            viewListMessage.push(
              <div className="row justify-content-start text-right">
                <div className="col-auto">
                  <div className="card bg-gradient-muted text-black">
                    {/* {this.isLastMessageLeft(index) ? (
                                    <img
                                        src={this.state.peerPic}
                                        alt="avatar"
                                        className="avatar shadow left"
                                    />
                                ) : (
                                    <div className="viewPaddingLeft"/>
                                )} */}
                    <div className="card-body p-2" key={item.timestamp}>
                      <p className="mb-1 font-weight-bold">
                        {item.content}
                        <br />
                      </p>
                      <div>
                        <small className="opacity-60">
                          {moment(Number(item.timestamp)).format("lll")}
                        </small>
                        <i className="ni ni-check-bold"></i>
                      </div>
                    </div>
                  </div>
                </div>
                {/* {this.isLastMessageLeft(index) ? (
                     <span className="textTimeLeft">
     {moment(Number(item.timestamp)).format('ll')}
   </span>
                 ) : null} */}
              </div>
            );
          } else if (item.type === 1) {
            viewListMessage.push(
              <div className="row justify-content-start text-right">
                <div
                  className="col-auto"
                  style={{ height: "15%", width: "20%" }}
                >
                  <div className="card bg-gradient-muted text-black">
                    {/* {this.isLastMessageLeft(index) ? (
                                <img
                                    src={this.state.peerPic}
                                    alt="avatar"
                                    className="avatar shadow left"
                                />
                            ) : (
                                <div className="viewPaddingLeft"/>
                            )} */}
                    <div className="card-body p-2" key={item.timestamp}>
                      <p className="mb-1 font-weight-bold">
                        <img
                          className="img-fluid rounded"
                          src={item.content}
                          alt="Image placeholder"
                        />
                        <br />
                      </p>
                      <div>
                        <small className="opacity-60">
                          {moment(Number(item.timestamp)).format("lll")}
                        </small>
                        <i className="ni ni-check-bold"></i>
                      </div>
                    </div>
                  </div>
                  <br />
                </div>
              </div>
            );
          }
          // else {
          //   viewListMessage.push(
          //     <div className="viewWrapItemLeft2" key={item.timestamp}>
          //       <div className="viewWrapItemLeft3">
          //         {this.isLastMessageLeft(index) ? (
          //           <img
          //             src={this.currentPeerUser.photoUrl}
          //             alt="avatar"
          //             className="peerAvatarLeft"
          //           />
          //         ) : (
          //           <div className="viewPaddingLeft" />
          //         )}
          //         <div className="viewItemLeft3" key={item.timestamp}>
          //           <img
          //             className="imgItemLeft"
          //             src={this.getGifImage(item.content)}
          //             alt="content message"
          //           />
          //         </div>
          //       </div>
          //       {this.isLastMessageLeft(index) ? (
          //         <span className="textTimeLeft">
          //           {moment(Number(item.timestamp)).format("ll")}
          //         </span>
          //       ) : null}
          //     </div>
          //   );
          // }
        }
      });
      return viewListMessage;
    } else {
      return (
        <div className="viewWrapSayHi">
          <img
            // className="imgWaveHand"
            className="avatar"
            src={this.state.peerPic}
            alt="wave hand"
          />
          <span className="textSayHi">Say hi to new friend</span>
          <img
            // className="imgWaveHand"
            className="avatar"
            src={this.state.profilePic}
          />
        </div>
      );
    }
  };

  getUserDetails = (uid, type) => {
    if (uid.trim() === "") {
      return;
    }

    firestoreUsersRef.doc(uid).onSnapshot((doc) => {
      const res = doc.data();
      if (res != null) {
        // if (item.type === 0) {
        if (type.trim() === "user") {
          this.setState({
            userName: res.username,
            name: res.name,
          });
        } else if (type.trim() === "peer") {
          this.setState({
            peerUserName: res.username,
            peerName: res.name,
          });
        } else if (type.trim() === "friend") {
          this.setState({
            friendUserName: res.username,
            friendName: res.name,
          });
        }
      }
    });
  };

  hashString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash += Math.pow(str.charCodeAt(i) * 31, str.length - i);
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  };

  isLastMessageLeft(index) {
    if (
      (index + 1 < this.listMessage.length &&
        this.listMessage[index + 1].idFrom === this.currentUserId) ||
      index === this.listMessage.length - 1
    ) {
      return true;
    } else {
      return false;
    }
  }

  isLastMessageRight(index) {
    if (
      (index + 1 < this.listMessage.length &&
        this.listMessage[index + 1].idFrom !== this.currentUserId) ||
      index === this.listMessage.length - 1
    ) {
      return true;
    } else {
      return false;
    }
  }


  
  onHover = (userId) => {
    localStorage.setItem("Fuid", JSON.stringify(userId));
  };

  clearChat = async () => {
    // await firebase
    // .firestore()
    // .collection("messages")
    // .doc(this.groupChatId)
    // .collection("msg")
    // .doc()
    // .delete()
    // .then(() => {
    //   alert("Chat Deleted!");
    //   this.setState({ chatDeleted: true });
    // })
    // .catch(err => {
    //   alert(err);
    // });
  };

  render() {
    return (
      <>
        <UserNavbar />
        <main className="profile-page mt--200" ref="main">
          {/* Loading */}
          {this.state.isLoading ? (
            <section className="viewLoading">
              <ReactLoading
                type={"spin"}
                color={"#203152"}
                height={"3%"}
                width={"3%"}
              />
            </section>
          ) : null}
          <section className="section-profile-cover section-shaped my-0">
            {/* Circles background */}
            <div className="shape shape-style-1 shape-dark alpha-4">
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

          <section>
            <div
              className="mb-5 mt--300"
              style={{
                zoom: "80%",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              <div className="row flex-row chat">
                <div className="col-lg-3">
                  <div
                    className="card bg-secondary"
                    style={{ overflow: "auto" }}
                  >
                    <form className="card-header mb-3 text-center bg-gradient-muted">
                      <span className="text-black font-weight-bold">
                        {/* {this.state.followedUsers.length} Friends online */}
                        Say Hi!
                      </span>
                    </form>
                    {this.state.followedUsersData.map((user) => (
                      <div className="list-group list-group-chat list-group-flush">
                        <a
                          href="javascript:;"
                          className="list-group-item bg-gradient-white"
                          onMouseOver={() => this.onHover(user.userId)}
                        >
                          <div className="media">
                            <Link to="/friend">
                              <img
                                alt="Image"
                                src={user.avatar}
                                className="avatar"
                              />
                            </Link>
                            <div className="media-body ml-2">
                              <div className="justify-content-between align-items-center">
                                <h6 className="mb-0 text-black font-weight-bold">
                                  {user.username}
                                  <span className="badge badge-success"></span>
                                </h6>
                                <div>
                                  <small className="text-muted">
                                    {user.name}
                                  </small>
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="card">
                    <div className="card-header d-inline-block">
                      <div className="row">
                        <div className="col-md-10">
                          <div className="media align-items-center">
                            <img
                              alt="Image"
                              src={this.state.peerPic}
                              className="avatar shadow img-responsive"
                              style={{
                                width: "44px",
                                height: "44px",
                                display: "block",
                                objectFit: "cover",
                              }}
                            />
                            <div className="media-body">
                              <h6 className="mb-0 d-block">
                                {this.state.peerName}
                              </h6>
                              <span className="text-muted text-small">
                                {" "}
                                {this.state.peerUserName}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-1 col-3"></div>

                        <div className="col-md-1 col-3">
                          <UncontrolledDropdown nav>
                            <DropdownToggle nav className="nav-link-icon">
                              <i className="ni ni-settings-gear-65" />
                              <span className="nav-link-inner--text d-lg-none">
                                Settings
                              </span>
                            </DropdownToggle>
                            <DropdownMenu
                              aria-labelledby="navbar-success_dropdown_1"
                              right
                            >
                              <DropdownItem
                                to="/friendspage"
                                tag={Link}
                                // onClick={this.logOut}
                              >
                                <p
                                  className="dropdown-item"
                                  href="javascript:;"
                                >
                                  <i className="ni ni-single-02"></i> Profile
                                </p>
                              </DropdownItem>
                              <DropdownItem onClick={this.clearChat}>
                                <p
                                  className="dropdown-item"
                                  href="javascript:;"
                                >
                                  <i className="ni ni-fat-remove"></i> Delete
                                  chat
                                </p>
                              </DropdownItem>
                              <DropdownItem>
                                <DeleteOutline onClick={this.clearChat} />
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </div>
                      </div>
                    </div>
                    <div
                      className="card-body"
                      style={{ overflow: "auto", height: "450px" }}
                    >
                      {this.renderListMessage()}

                      <div
                        style={{ float: "left", clear: "both" }}
                        ref={(el) => {
                          this.messagesEnd = el;
                        }}
                      />
                      {/* </div> */}

                      {/* 
          <div className="row justify-content-start">
            <div className="col-auto">
              <div className="card">
                <div className="card-body p-2">
                  <p className="mb-1">
                    It contains a lot of good lessons about effective practices
                  </p>
                  <div>
                    <small className="opacity-60"><i className="far fa-clock"></i> 3:14am</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row justify-content-end text-right">
            <div className="col-auto">
              <div className="card bg-gradient-primary text-white">
                <div className="card-body p-2">
                  <p className="mb-1">
                    Can it generate daily design links that include essays and data visualizations ?<br />
                  </p>
                  <div>
                    <small className="opacity-60">3:30am</small>
                    <i className="ni ni-check-bold"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-12 text-center">
              <span className="badge text-default">Wed, 3:27pm</span>
            </div>
          </div>
        
        
          <div className="row justify-content-start">
            <div className="col-auto">
              <div className="card ">
                <div className="card-body p-2">
                  <div className="spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                  </div>
                  <p className="d-inline-block mr-2 mb-2">
                    Typing...
                  </p>
                </div>
              </div>
            </div>
          </div> */}
                    </div>
                    <div className="card-footer d-block">
                      <div className="form-group">
                        <div className="input-group mb-4">
                          {/* <input className="form-control" placeholder="Your message" type="text"/> */}
                          {/* <img
                        className="avatar"
                        src={this.state.peerPic}
                        alt="icon open gallery"
                        onClick={() => this.refInput.click()}
                    /> */}

                          <input
                            className="form-control"
                            placeholder="Your message"
                            type="text"
                            value={this.state.inputValue}
                            onChange={(event) => {
                              this.setState({ inputValue: event.target.value });
                            }}
                            onKeyPress={this.onKeyboardPress}
                          />
                          {/* <Button
                            onClick={() => this.onSendMessage(this.state.inputValue, 0)}>
                                Send
                        </Button> */}

                          <div className="input-group-append">
                            <span className="input-group-text">
                              <i
                                className="ni ni-send"
                                onClick={() =>
                                  this.onSendMessage(this.state.inputValue, 0)
                                }
                              ></i>
                            </span>
                            <a
                              className="dropdown-item"
                              href="javascript:;"
                            ></a>
                          </div>

                          {/* <UncontrolledDropdown nav>
                    <DropdownToggle nav className="nav-link-icon">
                      <i className="ni ni-settings-gear-65" />
                      <span className="nav-link-inner--text d-lg-none">
                        Upload a photo
                      </span>
                    </DropdownToggle>
                    <DropdownMenu
                      aria-labelledby="navbar-success_dropdown_1"
                      right
                    >
                      <DropdownItem
                      >
                        <a className="dropdown-item" href="javascript:;">
                        <input
                        // ref={el => {
                        //     this.refInput = el
                        // }}
                        accept="image/*"
                        className="form-control"
                        type="file"
                        onChange={this.onChoosePhoto}
                    />              </a>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown> */}
                        </div>
                      </div>
                      <input
                        ref={(el) => {
                          this.refInput = el;
                        }}
                        accept="image/*"
                        className="small"
                        type="file"
                        onChange={this.onChoosePhoto}
                      />

                      <progress value={this.state.progress} max="100" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default chat;
