const student = {
  names: getParameterByName('names'),
  first_lname: getParameterByName('first_lname'),
  second_lname: getParameterByName('second_lname'),
  group_id: getParameterByName('group_id'),
};

const services = new ServicesProvider();
const visualizer = new CardClassVisualizer();

document.title = `MySched ${student.names} ${student.first_lname}`;

// Logout button click handler
$("#schedule-controls__logout").click(() => {
  window.location.replace("login.html");
});

services.readGroup(student.group_id, (group) => {
  const parsedGroup = JSON.parse(group);

  const groupLetter =
    parsedGroup.group_letter === null ? "" : parsedGroup.group_letter;

  $("#schedule-title")
    .fadeTo(500, 1)
    .html(`${parsedGroup.major} ${parsedGroup.semester} sem ${groupLetter}`);

  if (parsedGroup.approved === true) {
    $(".hidden").fadeTo(500, 1);

    // Print button click handler
    $("#schedule-controls__print").click(() => {
      window.print();
    });

    services.readGroupClasses(student.group_id, (classes) => {
      visualizer.render(JSON.parse(classes));
    });
  } else {
    // Show "Schedule not available" prompt if schedule is not approved
    $("#schedule-visualizer").empty();
    $(
      "<p>Su horario actualmente no se encuentra aprobado. Por favor regrese más tarde.</p>"
    )
      .hide()
      .appendTo("#schedule-visualizer")
      .fadeIn("normal");
  }
});