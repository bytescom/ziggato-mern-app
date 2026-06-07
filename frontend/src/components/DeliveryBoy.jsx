import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AUTH_ROUTES } from "../constants/endpoints";
import axiosInstance from "../lib/axios";
import { setUserData } from "../redux/slices/userSlice";

const DeliveryBoy = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      let response = await axiosInstance.post(AUTH_ROUTES.LOGOUT);
      dispatch(setUserData(null));
      toast.success(response.data.message || "Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to log out. Please check your connection."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-orange-500 to-white text-black px-4">
      <div className="text-center max-w-md">
        {/* Icon / Emoji */}
        <div className="text-6xl mb-4">🚧</div>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-2">Coming Soon</h1>

        {/* Subtitle */}
        <p className="text-lg text-black mb-6">
          We're working hard to bring the Delivery Boy feature to you. Stay
          tuned!
        </p>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-white text-black font-semibold px-6 py-2.5 rounded-lg shadow-md hover:bg-orange-100 transition duration-300 cursor-pointer"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default DeliveryBoy;
