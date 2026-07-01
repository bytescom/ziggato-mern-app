import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAddress, setLocation } from "../redux/slices/mapSlice";
import {
  setCity,
  setCurrentAddress,
  setState,
} from "../redux/slices/userSlice";

function useGetCity() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;
  // console.log("apiKey: ", apiKey);

  useEffect(() => {
    if (!navigator.geolocation) {
      dispatch(setCity("Noida"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        dispatch(setLocation({ lat: latitude, lon: longitude }));

        try {
          const result = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`
          );

          dispatch(
            setCity(
              result?.data?.results[0]?.city ||
                result?.data?.results[0]?.county ||
                "Noida"
            )
          );

          dispatch(setState(result?.data?.results[0]?.state || "Uttar Pradesh"));

          dispatch(
            setCurrentAddress(
              result?.data?.results[0]?.address_line2 ||
                result?.data?.results[0]?.address_line1 ||
                "Sector 18, Noida"
            )
          );

          dispatch(
            setAddress(
              result?.data?.results[0]?.address_line2 || "Sector 18, Noida"
            )
          );
        } catch (err) {
          console.error("Reverse geocoding failed, using Noida:", err);
          dispatch(setCity("Noida"));
        }
      },
      (error) => {
        console.error("Geolocation failed, using Noida:", error);
        dispatch(setCity("Noida"));
      }
    );
  }, [apiKey, dispatch, userData]);
}

export default useGetCity;
