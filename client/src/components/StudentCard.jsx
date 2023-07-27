import { Link } from "react-router-dom";
import placeholderImage from "../assets/placeholder.png";

function StudentCard({
  _id: studentId,
  firstName,
  lastName,
  email,
  phone,
  linkedinUrl,
  languages,
  program,
  background,
  image,
  projects,
  // cohort,
}) {
  return (
    <div className="StudentCard card">
      <img 
        src={image}
        alt={firstName}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = placeholderImage;
        }}
      />
      <Link to={`/students/details/${studentId}`}>
        <p>
          {firstName} {lastName}
        </p>
      </Link>
      <p>{email}</p>
      <p>{phone}</p>
      <p>{languages}</p>
      <p>{background}</p>
      <p>{linkedinUrl}</p>
      <p>{program}</p>

      {projects &&
        projects.map((project) => (
          <Link key={project._id} to={`/projects/details/`}>
            <div>
              <img src={project.image} />
              <p>{project.name}</p>
              <p>{project.description}</p>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default StudentCard;
