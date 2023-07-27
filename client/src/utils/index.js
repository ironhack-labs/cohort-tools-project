export function getFormattedDate(dateString) {
  if (!dateString) dateString = new Date().toISOString();
  return dateString.split('T')[0];
}

export function convertSlugToName(slug) {
  return slug
    .replaceAll("-", " ")
    .toUpperCase()
    .slice(0, slug.length - 2);
}

export function createCohortSlug({ format, program, campus, startDate }) {
  const cohortFormat = getFormatAcronym(format);
  const cohortProgram = getProgramAcronym(program);

  const cohortCampus = campus.length === 0 ? "campus" : campus.toLowerCase();
  const cohortStartDate = startDate.length === 0 ? "startDate" : startDate;

  return `${cohortFormat}-${cohortProgram}-${cohortCampus}-${cohortStartDate}`;
}

function getProgramAcronym(program) {
  switch (program) {
    case "Web Dev":
      return "wd";
    case "UX/UI":
      return "ux";
    case "Data Analytics":
      return "da";
    case "Cybersecurity":
      return "cy";
    default:
      return "program";
  }
}

function getFormatAcronym(format) {
  switch (format) {
    case "Full Time":
      return "ft";
    case "Part Time":
      return "pt";
    default:
      return "format";
  }
}
