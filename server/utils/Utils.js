function createCohortSlug(cohortName, startDate) {
  let baseSlug = cohortName.toLowerCase().replace(/\s+/g, "-");

  let date = new Date(startDate);
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");

  return `${baseSlug}-${year}-${month}`;
}

module.exports = {
  createCohortSlug,
};
