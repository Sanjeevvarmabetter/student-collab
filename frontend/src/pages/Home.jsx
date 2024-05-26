import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "./components/NavBar";
import CardSlider from "./CardSlider";
import Chat from './Chat';
const subjects = [
  "Data Structures",
  "Algorithms",
  "Computer Networks",
  "Database Systems",
  "Operating Systems",
  "Software Engineering",
  "Artificial Intelligence",
  "Machine Learning",
  "Cyber Security",

];

//updated covers

const subjectCovers = {
  "Data Structures": "/pics/ds.png",
  "Algorithms": "/pics/algo.jpg",
  "Computer Networks": "/pics/cn.jpg",
  "Database Systems": "/pics/dbms.jpg",
  "Operating Systems": "/pics/os.png",
  "Software Engineering": "/pics/se.jpg",
  "Artificial Intelligence": "/pics/ai.jpg",
  "Machine Learning": "/pics/ml.jpg",
  "Cyber Security": "/pics/cs.jpg",
};


const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:5000",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status
        ? toast(`Hello ${user}`, {
          position: "top-right",
        })
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  const Logout = () => {
    removeCookie("token");
    navigate("/signup");
  };
  return (
    <div className="bg-[#071e34] h-screen">
      <NavBar style={{ position: "Sticky" }} />
      <ToastContainer />
      <div className="btn flex my-5 mx-10 items-right justify-end">
        <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Create</button>
        <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">Join</button>
      </div>

      <div className="flex justify-center ">
        <div className="w-11/12">
          <CardSlider subjects={subjects} subjectCovers={subjectCovers} />
        </div>
      </div>

      <Chat/>
    </div>
  );
};

export default Home;