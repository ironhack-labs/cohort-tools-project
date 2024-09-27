// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// // Import the string from the .env with URL of the API/server - http://localhost:5005
// const API_URL = import.meta.env.VITE_API_URL;

// const DEFAULT_STUDENT_FORM_VALUES = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   phone: "",
//   linkedinUrl: "",
//   languages: [],
//   program: "",
//   background: "",
//   image: "",
//   cohort: "",
// };

// function StudentEditPage() {
//   const [student, setStudent] = useState({ ...DEFAULT_STUDENT_FORM_VALUES });
//   const [cohorts, setCohorts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

//   const { studentId } = useParams();

//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const requestBody = { ...student };

//     setLoading(true);

//     axios
//       .put(`${API_URL}/api/students/${student._id}`, requestBody)
//       .then(() => {
//         navigate(`/students/details/${student._id}`);
//       })
//       .catch((error) => console.log(error));
//   };

//   const handleDelete = () => {
//     axios
//       .delete(`${API_URL}/api/students/${student._id}`)
//       .then(() => {
//         navigate(`/cohorts/details/${student.cohort._id}`);
//       })
//       .catch((error) => console.log(error));
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked, options, multiple } = e.target;

//     let inputValue = type === "checkbox" ? checked : value;

//     if (multiple && options) {
//       inputValue = [];
//       for (var i = 0, l = options.length; i < l; i++) {
//         if (options[i].selected) {
//           inputValue.push(options[i].value);
//         }
//       }
//     }

//     setStudent((prevStudent) => ({
//       ...prevStudent,
//       [name]: inputValue,
//     }));
//   };

//   useEffect(() => {
//     const getStudent = () => {
//       axios
//         .get(`${API_URL}/api/students/${studentId}`)
//         .then((response) => {
//           const studentData = response.data;
//           setStudent(studentData);
//         })
//         .catch((error) => console.log(error));
//     };

//     const getCohorts = () => {
//       axios
//         .get(`${API_URL}/api/cohorts`)
//         .then((response) => {
//           const cohortList = response.data;
//           setCohorts(cohortList);
//         })
//         .catch((error) => console.log(error));
//     };

//     getStudent();
//     getCohorts();
//     setLoading(false);
//   }, [studentId]);

//   return (
//     <div className="AddStudent">
//       <h3>Edit Student</h3>

//       {showDeleteConfirmation && (
//         <div
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             width: "300px",
//             height: "200px",
//             backgroundColor: "white",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <p>Are you sure you want to delete this student?</p>
//           <button onClick={handleDelete}>Yes</button>
//           <button onClick={() => setShowDeleteConfirmation(false)}>No</button>
//         </div>
//       )}

//       <form onSubmit={handleSubmit}>
//         <label>First Name:</label>
//         <input
//           type="text"
//           name="firstName"
//           value={student.firstName}
//           onChange={handleChange}
//         />

//         <label>Last Name:</label>
//         <input
//           type="text"
//           name="lastName"
//           value={student.lastName}
//           onChange={handleChange}
//         />

//         <label>Email:</label>
//         <input
//           type="email"
//           name="email"
//           value={student.email}
//           onChange={handleChange}
//         />

//         <label>Phone:</label>
//         <input
//           type="tel"
//           name="phone"
//           value={student.phone}
//           onChange={handleChange}
//         />

//         <label>LinkedIn URL:</label>
//         <input
//           type="url"
//           name="linkedinUrl"
//           value={student.linkedinUrl}
//           onChange={handleChange}
//         />
//         <label>Languages:</label>
//         <select
//           name="languages"
//           value={student.languages}
//           onChange={handleChange}
//           multiple
//         >
//           <option value="English">English</option>
//           <option value="Spanish">Spanish</option>
//           <option value="French">French</option>
//           <option value="German">German</option>
//           <option value="Portuguese">Portuguese</option>
//           <option value="Dutch">Dutch</option>
//           <option value="Other">Other</option>
//         </select>

//         <label>Program:</label>
//         <select name="program" value={student.program} onChange={handleChange}>
//           <option value="">-- Select a program --</option>
//           <option value="Web Dev">Web Dev</option>
//           <option value="UX/UI">UX/UI</option>
//           <option value="Data Analytics">Data Analytics</option>
//           <option value="Cybersecurity">Cybersecurity</option>
//         </select>

//         <label>Background:</label>
//         <textarea
//           type="text"
//           name="background"
//           value={student.background}
//           onChange={handleChange}
//         />

//         <label>Image:</label>
//         <input
//           type="text"
//           name="image"
//           value={student.image}
//           onChange={handleChange}
//         />

//         <label>Cohort:</label>
//         <select
//           name="cohort"
//           value={student.cohort._id}
//           onChange={handleChange}
//         >
//           <option value="">-- Select a cohort --</option>
//           {cohorts.map((cohort) => (
//             <option key={cohort._id} value={cohort._id}>
//               {cohort.cohortName}
//             </option>
//           ))}
//         </select>

//         <button disabled={loading} type="submit">
//           Save
//         </button>

//         <button disabled={loading} type="button" onClick={()=> setShowDeleteConfirmation(true)}>Delete</button>
//       </form>
//     </div>
//   );
// }

// export default StudentEditPage;

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// Import the string from the .env with URL of the API/server - http://localhost:5005
const API_URL = import.meta.env.VITE_API_URL;

const DEFAULT_STUDENT_FORM_VALUES = {
	firstName: "",
	lastName: "",
	email: "",
	phone: "",
	linkedinUrl: "",
	languages: [],
	program: "",
	background: "",
	image: "",
	cohort: "",
};

function StudentEditPage() {
	const [student, setStudent] = useState({ ...DEFAULT_STUDENT_FORM_VALUES });
	const [cohorts, setCohorts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

	const { studentId } = useParams();

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		const requestBody = { ...student };

		setLoading(true);

		axios
			.put(`${API_URL}/api/students/${student._id}`, requestBody)
			.then(() => {
				navigate(`/students/details/${student._id}`);
			})
			.catch((error) => console.log(error));
	};

	const handleDelete = () => {
		axios
			.delete(`${API_URL}/api/students/${student._id}`)
			.then(() => {
				navigate(`/cohorts/details/${student.cohort._id}`);
			})
			.catch((error) => console.log(error));
	};

	const handleChange = (e) => {
		const { name, value, type, checked, options, multiple } = e.target;

		let inputValue = type === "checkbox" ? checked : value;

		if (multiple && options) {
			inputValue = [];
			for (var i = 0, l = options.length; i < l; i++) {
				if (options[i].selected) {
					inputValue.push(options[i].value);
				}
			}
		}

		setStudent((prevStudent) => ({
			...prevStudent,
			[name]: inputValue,
		}));
	};

	useEffect(() => {
		const getStudent = () => {
			axios
				.get(`${API_URL}/api/students/${studentId}`)
				.then((response) => {
					const studentData = response.data;
					setStudent(studentData);
				})
				.catch((error) => console.log(error));
		};

		const getCohorts = () => {
			axios
				.get(`${API_URL}/api/cohorts`)
				.then((response) => {
					const cohortList = response.data;
					setCohorts(cohortList);
				})
				.catch((error) => console.log(error));
		};

		getStudent();
		getCohorts();
		setLoading(false);
	}, [studentId]);

	return (
		<div className="relative flex flex-col w-full h-full max-w-3xl p-8 pb-16 mx-auto mt-10 mb-10 bg-white rounded-lg shadow-md">
			<h3 className="mb-6 text-2xl font-semibold text-gray-700">
				Edit Student
			</h3>

			{showDeleteConfirmation && (
				<div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full">
					<div className="absolute w-full h-full bg-black opacity-50"></div>

					<div className="relative z-10 p-6 bg-white rounded-lg shadow-xl w-96">
						<p className="mb-6 text-lg font-semibold text-gray-700">
							Are you sure you want to delete this student?
						</p>

						<div className="flex justify-end space-x-4">
							<button
								onClick={handleDelete}
								className="px-4 py-2 font-semibold text-white transition duration-150 ease-in-out bg-red-600 rounded-md hover:bg-red-700"
							>
								Yes
							</button>
							<button
								onClick={() => setShowDeleteConfirmation(false)}
								className="px-4 py-2 font-semibold text-black transition duration-150 ease-in-out bg-gray-400 rounded-md hover:bg-gray-500"
							>
								No
							</button>
						</div>
					</div>
				</div>
			)}

			<form
				onSubmit={handleSubmit}
				className="grid grid-cols-1 gap-4 px-4 mt-6"
			>
				<label className="ml-1 -mb-2 font-bold text-left text-gray-600 text-l">
					First Name:
				</label>
				<input
					type="text"
					name="firstName"
					value={student.firstName}
					onChange={handleChange}
					className="w-full p-2 mb-6 border rounded"
					required
				/>

				<label className="ml-1 -mb-2 font-bold text-left text-gray-600 text-l">
					Last Name:
				</label>
				<input
					type="text"
					name="lastName"
					value={student.lastName}
					onChange={handleChange}
					required
					className="w-full p-2 mb-6 border rounded"
				/>

				<label className="ml-1 -mb-2 font-bold text-left text-gray-600 text-l">
					Email:
				</label>
				<input
					type="email"
					name="email"
					value={student.email}
					required
					onChange={handleChange}
					className="w-full p-2 mb-6 border rounded"
				/>

				<label className="ml-1 -mb-2 font-bold text-left text-gray-600 text-l">
					Phone:
				</label>
				<input
					type="tel"
					name="phone"
					value={student.phone}
					required
					onChange={handleChange}
					className="w-full p-2 mb-6 border rounded"
				/>

				<label className="ml-1 -mb-2 font-bold text-left text-gray-600 text-l">
					LinkedIn URL:
				</label>
				<input
					type="url"
					name="linkedinUrl"
					value={student.linkedinUrl}
					onChange={handleChange}
					className="w-full p-2 mb-6 border rounded"
				/>

				<label className="ml-1 -mb-2 font-bold text-left text-gray-600 text-l">
					Languages:
				</label>
				<select
					name="languages"
					value={student.languages}
					onChange={handleChange}
					multiple
					className="w-full p-2 mb-6 border rounded bg-gray-50"
				>
					<option value="English">English</option>
					<option value="Spanish">Spanish</option>
					<option value="French">French</option>
					<option value="German">German</option>
					<option value="Portuguese">Portuguese</option>
					<option value="Dutch">Dutch</option>
					<option value="Other">Other</option>
				</select>

				<label className="ml-1 -mb-2 font-bold text-left text-gray-600 text-l">
					Program:
				</label>
				<select
					name="program"
					value={student.program}
					onChange={handleChange}
					className="w-full p-2 mb-6 border rounded bg-gray-50"
				>
					<option value="">-- Select a program --</option>
					<option value="Web Dev">Web Dev</option>
					<option value="UX/UI">UX/UI</option>
					<option value="Data Analytics">Data Analytics</option>
					<option value="Cybersecurity">Cybersecurity</option>
				</select>

				<label className="ml-1 -mb-2 font-bold text-left text-gray-600 text-l">
					Background:
				</label>
				<textarea
					type="text"
					name="background"
					value={student.background}
					onChange={handleChange}
					className="w-full p-2 mb-6 border rounded"
				/>

				<label className="ml-1 -mb-2 font-bold text-left text-gray-600 text-l">
					Image:
				</label>
				<input
					type="text"
					name="image"
					value={student.image}
					onChange={handleChange}
					className="w-full p-2 mb-6 border rounded"
				/>

				<label className="ml-1 -mb-2 font-bold text-left text-gray-600 text-l">
					Cohort:
				</label>
				<select
					name="cohort"
					value={student.cohort._id}
					onChange={handleChange}
					className="w-full p-2 mb-6 border rounded bg-gray-50"
				>
					<option value="">-- Select a cohort --</option>
					{cohorts.map((cohort) => (
						<option key={cohort._id} value={cohort._id}>
							{cohort.cohortName}
						</option>
					))}
				</select>

				<button
					disabled={loading}
					type="submit"
					className="px-4 py-2 mt-4 font-bold text-white transition duration-150 ease-in-out bg-blue-500 rounded hover:bg-blue-600"
				>
					Save
				</button>
				<button
					disabled={loading}
					type="button"
					onClick={() => setShowDeleteConfirmation(true)}
					className="px-4 py-2 mt-4 font-bold text-white transition duration-150 ease-in-out bg-red-500 rounded hover:bg-red-600"
				>
					Delete
				</button>
			</form>
		</div>
	);
}

export default StudentEditPage;
