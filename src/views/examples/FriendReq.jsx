import React from "react";
import moment from "moment";
// reactstrap components
import { Button, Card, Container, Row, Col, Modal } from "reactstrap";
import SimpleFooter from "components/Footers/SimpleFooter.jsx";
import { isUserSignedIn } from "../../services/authServices";
import * as firebase from "firebase";
import { Redirect, Link } from "react-router-dom";

import UserNavbar from "components/Navbars/UserNavbar";

class FriendReq extends React.Component {
  // componentDidMount() {
  //   document.documentElement.scrollTop = 0;
  //   document.scrollingElement.scrollTop = 0;
  //   this.refs.main.scrollTop = 0;
  // }

  firestoreUsersRef = firebase.firestore().collection("users");

  constructor(props) {
    super(props);

    this.state = {
      currentUserUid: JSON.parse(localStorage.getItem("uid")),
      friendReqData: [],
      friendReq: [],
      };
  }

  componentDidMount() {
    this.getFriendReq();
    // document.documentElement.scrollTop = 0;
    // document.scrollingElement.scrollTop = 0;
    // this.refs.main.scrollTop = 0;
  }

  getFriendReq = async () => {
    let users = [];
    await this.firestoreUsersRef
      .doc(this.state.currentUserUid)
      .collection("received")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((docSnap) => {
          users.push(docSnap.id);
        });
      });
    this.setState({ friendReq: users});
    // console.log("FRIENDS LIST: " + this.state.followedUsers);
    this.viewFriendReq();
  };

  viewFriendReq = () => {
    let friendReqArr = [];
    let avatar =
      "https://image.shutterstock.com/image-vector/vector-man-profile-icon-avatar-260nw-1473553328.jpg";
    let name;
    let fullName;
    this.state.friendReq.forEach((userId) => {
      //  avatar =  this.getUserPic(userId);
      this.firestoreUsersRef
        .doc(userId)
        .get()
        .then((doc) => {
          name = doc.data().username;
          fullName = doc.data().name;

          let friendReqData = {
            userId: userId,
            name: name,
            avatar:
              "https://firebasestorage.googleapis.com/v0/b/travycomsats.appspot.com/o/profilePics%2F(" +
              userId +
              ")ProfilePic?alt=media&token=69135050-dec6-461d-bc02-487766e1c81d",
            fullName: fullName,
          };

          friendReqArr.push(friendReqData);
          this.setState({ friendReqData: friendReqArr });
          // console.log(this.state.friendReqData);
        })
        .catch((err) => {
          alert(err);
        });
    });
  };

  handleAccept = (uId) => {
    this.firestoreUsersRef
      .doc(this.state.currentUserUid)
      .collection("followedBy")
      .doc(uId)
      .set({
        userId: uId,
      }) &&
      this.firestoreUsersRef
        .doc(uId)
        .collection("following")
        .doc(this.state.currentUserUid)
        .set({
          userId: uId,
        }) &&
      this.firestoreUsersRef
        .doc(this.state.currentUserUid)
        .collection("received")
        .doc(uId)
        .delete() &&
      this.firestoreUsersRef
        .doc(uId)
        .collection("sent")
        .doc(this.state.currentUserUid)
        .delete();

    console.log("accepted");
    // .then(() => {
    //     this.setState({ following: true });
    //   });
  };

  handleReject = (uId) => {
    this.firestoreUsersRef
      .doc(this.state.currentUserUid)
      .collection("received")
      .doc(uId)
      .delete();
    console.log("rejected");
    // .then(() => {
    //     this.setState({ following: true });
    //   });
  };

  checkCondition = () => {
    if (this.state.friendReq.length < 1) {
      return (
        // <Card className="card-profile shadow">
        // <div className="px-4 border-top">
        <h1
          // className="description"
          className="text-white ml-auto description font-italic justify-content-center"
        >
          No new friend requests :(
        </h1>

        // </div>
        // </Card>
      );
    } else {
      return (
        // <Card className="card-profile shadow">
        <div>
          <Row>
            <Col lg="4">
              <h2
                // className="description"
                className="text-white ml-auto description"
              >
                Friend Requests:{" "}
              </h2>
            </Col>
          </Row>{" "}
          <ul>
            {
              // this.state.followedUsers.map((followedUsers) => {
              this.state.friendReqData.map((user, postindex) => (
                <li key={postindex} item={this.state.friendReq}>
                  <Row
                    className="justify-content-center"
                    style={{ 
                    borderRadius:"15px" }}
                  >
                    <Col className="justify-content-center">
                      {" "}
                      <img
                        alt="Image placeholder"
                        className="media-comment-avatar avatar rounded-circle"
                        style={{
                          display: "block",
                          objectFit: "cover",
                          padding: "2px",
                          margin: "5px",
                        }}
                        src={user.avatar}
                      />
                    </Col>
                    <Col className="justify-content-center">
                      {/* <div className="card-profile-stats d-flex justify-content-center"> */}

                      <a href="/friend" class="description link">
                        {user.name}
                      </a>
                      <p className="mb-0 text-black font-weight-bold small">
                        {user.fullName}
                        {/* {user.userId} */}

                        {/* {this.storingUserId} */}
                        {/* <span className="badge badge-success"></span> */}
                      </p>

                      {/* </div> */}
                    </Col>
                    <Col  className="justify-content-center">
                      <Button
                        // className="mr-4"
                        color="info"
                        size="sm"
                        onClick={() => this.handleAccept(user.userId)}
                      >
                        {" "}
                        Accept{" "}
                      </Button>{" "}
                      <Button
                        // className="mr-4"
                        color="danger"
                        size="sm"
                        onClick={() => this.handleReject(user.userId)}
                      >
                        Reject
                      </Button>
                    </Col>
                  </Row>
                </li>
              ))
            }
          </ul>
        </div>
        // </Card>
      );
    }
  };

  render() {
    // if (this.state.loading){
    //   return <div>My sweet spinner</div>;
    // }
    return (
      <>
        <Container
        // style={{ zoom: "90%" }}
        >
          <section
          // style={{ padding: "16px" }}
          >
            {this.checkCondition()}
          </section>
        </Container>
      </>
    );
  }
}

export default FriendReq;
