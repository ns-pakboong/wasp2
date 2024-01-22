import { useNavigate } from "react-router-dom";
import { auth, storage } from "./firebase";
import { signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import "./Profile.css";



const Profile = () => {
  const navigate = useNavigate();
  const currentUser = auth.currentUser;
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [userId, setUserId] = useState(null);

  const ImageListRef = ref(storage, "images/" + userId + "/");

  const logoutUser = async (e) => {
    e.preventDefault();
    await signOut(auth);
    navigate("/");
  };

  const uploadImage = () => {
    console.log("Uploading");
    console.log(userId);
    console.log(imageList);
    if (imageUpload == null || userId == null) return;

    const imageRef = ref(storage, 'images/' + userId + '/' + imageUpload.name);
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
          const promises = response.items.map((itemRef) => getDownloadURL(itemRef));
          Promise.all(promises)
            .then((urls) => {
              setImageList(urls);
            })
            .catch((error) => {
              console.error("Error getting download URLs:", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching image list:", error);
        });
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
          <p>UID: {currentUser.uid}</p>
        </>
      )}

      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadImage}>Upload Image</button>
      <div className="container">
        <div className="image-list-container">
        {imageList.length > 0 && imageList.map((url, index) => (
        <img key={index} src={url} alt={`Image ${index + 1}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
