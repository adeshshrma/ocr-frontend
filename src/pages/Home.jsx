import { Button } from "@material-ui/core";
import React from "react";
import { instance } from "../instance";
import Cookies from "js-cookie";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";

const Home = () => {
  const [image, setImage] = React.useState(null);
  const [data, setData] = React.useState({ base64Image: null, text: null });
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", image);
    setLoading(true);
    const res = await instance({
      method: "POST",
      url: "/upload",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + Cookies.get("user"),
      },
    }).catch((err) => {
      if (err.response.data.success === false) {
        alert(err.response.data.message);
      }
      setLoading(false);
    });
    if (res.data.success === false) {
      alert(res.data.message);
    }
    if (res.data.success === true) {
      setData({ base64Image: res.data.base64String, text: res.data.text });
    }
    setLoading(false);
  };

  return (
    <div className="home-container" style={{ position: "relative" }}>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          position: "absolute",
          top: "2rem",
          right: "2rem",
        }}
      >
        <Button
          color="primary"
          variant="contained"
          onClick={() => dispatch(authActions.logout())}
        >
          Logout
        </Button>

        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            window.location.href = "/all_records";
          }}
        >
          View All Records
        </Button>
      </div>
      <h1>Select an image</h1>
      <Loader loading={loading} />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        accept="image/*"
      />
      <Button
        color="primary"
        variant="contained"
        disabled={image === null}
        onClick={() => {
          if (image.type.startsWith("image/") === false) {
            alert("Please select an image");
          } else {
            uploadImage();
          }
        }}
      >
        Submit
      </Button>
      {data.base64Image && data.text && (
        <div className="image-container">
          <h1>Text</h1>
          <p style={{ padding: "2rem" }}>{data.text}</p>
          <h1>Image</h1>
          <img src={`data:image/png;base64,${data.base64Image}`} alt="image" />
        </div>
      )}
    </div>
  );
};

export const Loader = ({ loading }) => {
  return (
    loading && (
      <div className="loader-overlay">
        <div className="loader"></div>
      </div>
    )
  );
};

export default Home;
