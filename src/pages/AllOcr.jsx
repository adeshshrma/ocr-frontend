import React, { useEffect } from "react";
import { instance } from "../instance";
import Cookies from "js-cookie";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { Loader } from "./Home";

const AllOcr = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await instance({
        method: "GET",
        url: "/getAllOcrData",
        headers: {
          Authorization: "Bearer " + Cookies.get("user"),
        },
      }).catch((err) => {
        if (err.response.data.success === false) {
          alert(err.response.data.message);
        }
        setLoading(false);
      });
      if (res.data.length > 0) {
        setData(res.data);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <div className="home-container">
      <Loader loading={loading} />
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
            window.location.href = "/";
          }}
        >
          Home
        </Button>
      </div>
      <h1>All Records</h1>
      {data.length > 0 ? (
        data.map((item) => {
          return (
            <div className="image-container">
              <h1>Text</h1>
              <p style={{ padding: "2rem" }}>{item.text}</p>
              <h1>Image</h1>
              <img
                src={`data:image/png;base64,${item.base64String}`}
                alt="image"
              />
            </div>
          );
        })
      ) : (
        <h1>No Records Found</h1>
      )}
    </div>
  );
};

export default AllOcr;
