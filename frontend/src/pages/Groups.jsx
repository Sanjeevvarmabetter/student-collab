// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useCookies } from 'react-cookie';

// function Froup() {
//   const navigate = useNavigate();
//     const [cookies, removeCookie] = useCookies([]);
//     const [username, setUsername] = useState("");
//     useEffect(() => {
//         const verifyCookie = async () => {
//             if (!cookies.token) {
//                 navigate("/login");
//             }
//             const { data } = await axios.post(
//                 "http://localhost:5000",
//                 {},
//                 { withCredentials: true }
//             );
//             const { status, user } = data;
//             setUsername(user);
//         };
//         verifyCookie();
//     }, [cookies, navigate, removeCookie]);

//     // State to store user data
//     const [userData, setUserData] = useState(null);
//     // State to track loading state
//     const [loading, setLoading] = useState(true);
//     // State to track error
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         // Function to fetch user data
//         const fetchUserData = async () => {
//             try {
//                 setLoading(true);
//                 setError(null);
//                 // Make a GET request to fetch user data by username
//                 const response = await axios.get(`http://localhost:5000/api/user/${username}`);
//                 setUserData(response.data);
//                 setLoading(false);

//             } catch (error) {
//                 setError('Error fetching user data');
//                 setLoading(false);
//             }
//         };

//         fetchUserData();
//     }, [username]); // Run the effect whenever the username changes

//     // Render loading state
//     if (loading) {
//         return <div>Loading...</div>;
//     }
//     if (error) {
//         return <div>Error: {error}</div>;
//     }
//   return (
//     <div className="profile">
//       <section className=" bg-[#071e34] flex font-medium items-center justify-center h-screen">
//         <section className="w-72 mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
//           <div className="flex items-center justify-between">
//             <span className="text-gray-400 text-sm">Profile</span>
//             <span className="text-emerald-400">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
//               </svg>
//             </span>
//           </div>
//           <div className="mt-6 w-fit mx-auto">
//             <img src="https://images.unsplash.com/photo-1507019403270-cca502add9f8?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="rounded-full w-28 h-28 object-cover" alt="profile picture" srcSet="" />
//           </div>

//           <div className="mt-8 ">
//             <h2 className="text-white font-bold text-2xl tracking-wide">{userData.username}</h2>
//           </div>
//           <p className="text-emerald-400 font-semibold mt-2.5" >
//             Active
//           </p>

//           <div className="mt-3 text-white text-sm">
//             <span className="text-gray-400 font-semibold">Full Name:</span>
//             <span>{userData.fullname}</span>
//           </div>
//           <div className="mt-3 text-white text-sm">
//             <span className="text-gray-400 font-semibold">Gmail:</span>
//             <span>{userData.email}</span>
//           </div>
//           <div className="my-3 text-white text-sm">
//             <span className="text-gray-400 font-semibold">PhoneNumber:</span>
//             <span>{userData.phoneNumber}</span>
//           </div>
//         <a className="my-2 text-yellow-300" href="/">Home</a>
//         </section>

//       </section>
//     </div>
//   );
// }

// export default Profile;
