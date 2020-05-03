const professor = {
  names: getParameterByName('names'),
  first_lname: getParameterByName('first_lname'),
  second_lname: getParameterByName('second_lname'),
  professor_id: getParameterByName('professor_id'),
};

const services = new ServicesProvider();
const visualizer = new CardClassVisualizer();

document.title = `MySched ${professor.names} ${professor.first_lname}`;

// Logout button click handler
$("#schedule-controls__logout").click(() => {
  window.location.replace("login.html");
});

$("#schedule-title")
  .fadeTo(500, 1)
  .html(
    `${professor.names} ${professor.first_lname} ${professor.second_lname}`
  );

services.readProfessorClasses(professor.professor_id, (classes) => {
  const parsedClasses = JSON.parse(classes);

  const numOfClasses = parsedClasses
    .map((collegeClass) => collegeClass.classes.length)
    .reduce((a, b) => a + b);

  if (numOfClasses > 0) {
    visualizer.render(JSON.parse(classes));

    $(".hidden").fadeTo(500, 1);

    // Print button click handler
    $("#schedule-controls__print").click(() => {
      window.print();
    });
  } else {
    // Show "No classes assigned" prompt if no classes are assigned to the professor
    // from the approved groups.
    $("#schedule-visualizer").empty();
    $("<p>Actualmente no tiene clases asignadas de grupos aprobados.</p>")
      .hide()
      .appendTo("#schedule-visualizer")
      .fadeIn("normal");
  }
});