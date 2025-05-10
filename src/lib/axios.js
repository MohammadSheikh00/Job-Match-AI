import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://jobmatch-8lum.onrender.com",
});

// const handleForgotPassword = async () => {
//   playClick();
//   setLoading(true);
//   setMessage("");

//   try {
//     const { data } = await axiosInstance.post("/auth/forgotPassword", {
//       email,
//     });

//     setMessage("Password reset email sent!");
//     setIsForgotPassword(true);
//   } catch (error) {
        // console.log(error)
//     setMessage(error.response.data.message || "Something went wrong!");
//   } finally {
//     setLoading(false);
//   }
// };
