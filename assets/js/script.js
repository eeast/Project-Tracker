var dateTimeEl = $("#dateTime");
var projectListEl = $("#projectList");
var projectFormEl = $("#projectForm");
var projectList = [];


loadProjects = function() {
    var fileLoad = localStorage.getItem("projectList");
    if (fileLoad !== null) {
        projectList = JSON.parse(fileLoad);
    } else {
        projectList = [];
    }
}


displayProjects = function() {
    localStorage.setItem("projectList", JSON.stringify(projectList));
    projectListEl.empty();
    projectList.forEach(function (value, i) {
        var tableRow = $("<tr>");
        tableRow.append($("<th>").attr("scope", "row").text(i + 1));
        tableRow.append($("<td>").text(value.projectName));
        tableRow.append($("<td>").text(value.projectType));
        tableRow.append($("<td>").text(dayjs(value.dueDate).format("ddd MMM D, YYYY")));
        var daysRemaining = dayjs(value.dueDate).diff(dayjs(), "days");
        tableRow.append($("<td>").text(daysRemaining));
        if (daysRemaining < 0) {
            tableRow.attr('style', 'background-color: #F47174; font-weight: 600;');
        } else if (daysRemaining < 7) {
            tableRow.attr('style', 'background-color: #FDFD96;');
        }
        
        projectListEl.append(tableRow);
    });
}


var addProject = function(event) {
    event.preventDefault();

    projectList.push({
        projectName: $("#projectName").val(),
        projectType: $("#projectType").val(),
        dueDate: $("#dueDate").val()
    });

    $("#projectName").val('');
    $("#projectType").val('Physical Self-Care');
    $("#dueDate").val('');

    displayProjects();
}


var recountProjects = function() {
    projectListEl.children().each(function(i, el) {
        console.log(el);
        $(el).children("th").text(i + 1);
    })
};



dateTimeEl.text(dayjs().format("dddd, MMMM D, YYYY h:mm:ss A"));
setInterval(function() {
    dateTimeEl.text(dayjs().format("dddd, MMMM D, YYYY h:mm:ss A"));
}, 1000);


$( function() {
    $( "#projectList" ).sortable({
        placeholder: "sortable-placeholder",
        out: function(event, ui) {
            recountProjects();
        }
    });
} );


$("#submit").on("click", addProject);

loadProjects();
displayProjects();