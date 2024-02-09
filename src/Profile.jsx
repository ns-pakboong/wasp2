import { useNavigate } from "react-router-dom";
import { auth, storage } from "./firebase";
import { signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { push, ref as ref2, set, onValue } from "firebase/database";
import { database } from "./firebase";
import "./Profile.css";
import styled from "styled-components";

const Profile = () => {
  const navigate = useNavigate();
  const currentUser = auth.currentUser;
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [userId, setUserId] = useState(null);
  const ImageListRef = ref(storage, "images/" + userId + "/");
  const [data, setData] = useState(null);
  const logoutUser = async (e) => {
    e.preventDefault();
    await signOut(auth);
    navigate("/");
  };

  const [circles, setCircles] = useState([]);

  const getClickCoords = (event) => {
    // from: https://stackoverflow.com/a/29296049/14198287
    var e = event.target;
    var dim = e.getBoundingClientRect();
    var x = event.clientX - dim.left;
    var y = event.clientY - dim.top;
    return [x, y];
  };

  const addCircle = (event) => {
    // get click coordinates
    let [x, y] = getClickCoords(event);

    const pointName = window.prompt("Enter name for the clicked point:");
    //console.log("OK")

    // If the user enters a name, create the circle with the name
    if (pointName) {
      const dbRef = ref2(database, "place_point/" + pointName);
      set(dbRef, {
        x: x,
        y: y,
        name: pointName,
        status: false,
      });

      let newCircle = (
        <circle
          key={pointName}
          id={pointName}
          cx={x}
          cy={y}
          r="20"
          stroke="black"
          strokeWidth="1"
          fill="red"
        />
      );

      let allCircles = [...circles, newCircle];

      setCircles(allCircles);
    }
  };

  const uploadImage = () => {
    console.log("Uploading");
    console.log(userId);
    console.log(imageList);
    if (imageUpload == null || userId == null) return;

    const imageRef = ref(storage, "images/" + userId + "/" + "dashboard2.png");
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList([url]);
      });
    });
  };

  useEffect(() => {
    if (currentUser) {
      setUserId(currentUser.uid);
      // Fetch image list when the component mounts or when currentUser changes
      listAll(ImageListRef)
        .then((response) => {
          const promises = response.items.map((itemRef) =>
            getDownloadURL(itemRef)
          );
          Promise.all(promises)
            .then((urls) => {
              setImageList(urls);
              // Now that imageListRef has been fetched, update the styled-component
              ContainerWithBackgroundImage.defaultProps = {
                backgroundImageUrl: urls[0], // Assuming you want to use the first image URL
              };
            })
            .catch((error) => {
              console.error("Error getting download URLs:", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching image list:", error);
        });

      //Fetch data from Firebase
      const fetchData = async () => {
        try {
          const dataRef = ref2(database, "place_point"); // Reference to the root of your database
          onValue(dataRef, (snapshot) => {
            const fetchedData = snapshot.val();
            // Update component state with fetched data
            setData(fetchedData);
          });
        } catch (error) {
          console.error("Error fetching data:", error.message);
        }
      };

      fetchData(); // Call fetchData function
    }
  }, [currentUser, ImageListRef]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-4 text-center">
          <p>
            Welcome{" "}
            <em className="text-decoration-underline">{currentUser.email}</em>.
            You are logged in!
          </p>
          <div className="d-grid gap-2">
            <button
              type="submit"
              className="btn btn-primary pt-3 pb-3 logout-button"
              onClick={(e) => logoutUser(e)}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {currentUser && (
        <>
          <p>Email: {currentUser.email}</p>
        </>
      )}

      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadImage}>Upload Image</button>

      <h1>Plant Chart</h1>

      <ContainerWithBackgroundImage>
        <ClickableSVG onClick={addCircle}>
          {/* This loads your circles in the circles hook here */}
          {data &&
            Object.entries(data).map(([key, value]) => (
              <CircleWithLabel key={key} >
              <circle
                key={key}
                id={key}
                cx={value.x}
                cy={value.y}
                r="20"
                stroke="black"
                strokeWidth="1"
                fill={value.status ? "green" : "red"}
              />

<text
              x={value.x}
              y={value.y}
              textAnchor="middle"
              dy="-30" // Adjust vertical position as needed
              fill="blue"
              fontWeight="bold"
              fontSize="20px"
              
            >
              {value.name}
            </text>
          </CircleWithLabel>
            ))}
          {circles}
        </ClickableSVG>
      </ContainerWithBackgroundImage>
    </div>
  );
};
export default Profile;

const ContainerWithBackgroundImage = styled.div`
  width: 100%;
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("${(props) => props.backgroundImageUrl}");
  background-repeat: no-repeat;
  background-size: cover;
`;

const ClickableSVG = styled.svg`
  width: 100%;
  height: 800px;
  background-image: url("${(props) => props.backgroundImageUrl}");
  background-size: 100% 100%; /* Stretch the background image to cover the container */
  background-repeat: no-repeat; /* Prevent the background image from repeating */
  background-position: center; /* Center the background image */
  & * {
    pointer-events: none;
  }
`;

const CircleWithLabel = styled.g`
  cursor: pointer;
`;
