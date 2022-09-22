var dinnerSlider, quranSlider, weeklyTasksSlider;
var points = 0;
var tasksPoints = 0;
var checkBoxTasks;
var eatingDays = 2;
var sawa3edTasks;
var tasksWeight = 0;
var quranDaysNumber = 5;
var numberOfWeeklyTasks = 3;

dinnerSlider = document.getElementById("dinnerSlider");
quranSlider = document.getElementById("quranSlider");
weeklyTasksSlider = document.getElementById("weeklyTasksSlider");
slidersList = [dinnerSlider, quranSlider, weeklyTasksSlider];

function updateSliderValue(slider) {
  var children, i, results, val, values;
  children = slider.getElementsByClassName("noUi-handle");
  values = slider.noUiSlider.get();
  i = 0;

  results = [];
  while (i < children.length) {
    if (children.length === 1) {
      val = parseInt(values);
    } else {
      val = parseInt(values[i]);
    }
    children[i].dataset.value = val;

    tasksPoints = 0;
    slidersList.forEach((sliderElement) => {
      console.log(dinnerSlider.id);
      tasksPoints += parseInt(sliderElement.noUiSlider.get());
      $(`.slider-input input[class="${dinnerSlider.id}"]`).val(val);
    });
    results.push(i++);
  }

  updatePoints();
  return results;
}

// The Single Slider Control

$(document).ready(function () {
  $(".tab a").on("click", function (e) {
    e.preventDefault();
    var _this = $(this);
    var block = _this.attr("href");
    if (block == "#leaderboard") {
      $(block).fadeIn();
      $("#group").hide();
      $("#other").hide();

      $(document).find(".active").removeClass("active");
      $(this).parent().addClass("active");
    } else if (block == "#group") {
      $(block).fadeIn();
      $("#leaderboard").hide();
      $("#other").hide();
      $(document).find(".active").removeClass("active");
      $(this).parent().addClass("active");
    } else if (block == "#other") {
      $(block).fadeIn();
      $("#leaderboard").hide();
      $("#group").hide();
      $(document).find(".active").removeClass("active");
      $(this).parent().addClass("active");
    }
  });

  $(".tab.active a").click(); // Default open

  var countdownNumberEl = document.getElementById("countdown-number");
  var countdown = 120;

  countdownNumberEl.textContent = countdown;

  setInterval(function () {
    countdown = --countdown;

    countdownNumberEl.textContent = countdown;
    if (countdown == 0) {
      location.reload();
    }
  }, 1000);

  fetch(
    "https://sheets.googleapis.com/v4/spreadsheets/1P_X8RoBtd-YBBw0pD-CJcbfOMgqxoxmd_VM4bYG0ObI/values/api!j2?key=AIzaSyAnBt9xAdMMEq6uOjdBP9p0L13jGbbRuDw"
  )
    .then((resp) => resp.json())
    .then(function (data) {
      var json = data["values"][0][0];

      var obj = JSON.parse(json);

      console.log(obj);
      checkBoxTasks = obj.checkBoxes;
      sawa3edTasks = obj.tasks;

      if (obj.form == "مغلق") {
        $("#form").css("display", "none");
        $("#closed-form").css("display", "flex");
      } else {
        $("#closed-form").css("display", "none");
        $("#form").css("display", "flex");
      }

      if (obj.results == "مغلق") {
        $("#results").remove();
      } else {
        $("#results").css("display", "flex");
      }

      var groupsMembers = obj.groups;
      var AllNames = [];

      $("#gselect").append(
        '<option value="" disabled selected>اختر أسرتك ..</option>'
      );

      $("#week").append(
        '<option value="' +
          obj.week +
          '" disabled selected>' +
          obj.week +
          "</option>"
      );

      document.getElementById("selectedWeek").value = obj.week;

      for (var i = 0; i < groupsMembers.length; i++) {
        $("#gselect").append(
          '<option value="' +
            groupsMembers[i][0].name +
            '">' +
            groupsMembers[i][0].name +
            "</option>"
        );

        $("#groupsLegend").append(
          "<p>" + groupsMembers[i][0].name + "</p></span><span class='stepR'>"
        );
        for (let j = 1; j < groupsMembers[i].length; j++) {
          AllNames.push(groupsMembers[i][j]);
        }
      }

      $("#gselect").change(function () {
        $(".w-full").animate(
          {
            opacity: "show",
            top: "150",
          },
          1000
        );

        $("#gnames select").empty();
        $("#gnames select").append(
          '<option value="" disabled selected>' + "اختر اسمك .." + "</option>"
        );

        for (var i = 0; i < groupsMembers.length; i++) {
          if (
            groupsMembers[i][0].name == $(this).find("option:selected").val()
          ) {
            for (var j = 1; j < groupsMembers[i].length; j++) {
              jQuery("<option/>", {
                value: groupsMembers[i][j].name,
                html: groupsMembers[i][j].name,
              }).appendTo("#gnames select"); //appends to select if parent div has id dropdown
            }
          }

          // console.log(AllNames)
        }
      });

      AllNames.sort(sortPoints);

      AllNames[0].name += " 🥇";
      AllNames[1].name += " 🥈";
      AllNames[2].name += " 🥉";

      for (var i = 0; i < AllNames.length; i++) {
        // creates option tag
        jQuery(
          "<li><mark>" +
            AllNames[i].name +
            "</mark><small>" +
            AllNames[i].point +
            "</small></li>"
        ).appendTo($("#indivother")); //appends to select if parent div has id dropdown
      }

      AllNames.sort(sortWeeklyPoints);

      for (var i = 0; i < AllNames.length; i++) {
        // creates option tag
        jQuery(
          "<li><mark>" +
            AllNames[i].name +
            "</mark><small>" +
            AllNames[i].weekPoint +
            "</small></li>"
        ).appendTo($("#indiv")); //appends to select if parent div has id dropdown
      }

      function sortPoints(a, b) {
        if (a.point === b.point) {
          return 0;
        } else {
          return a.point > b.point ? -1 : 1;
        }
      }

      function sortWeeklyPoints(a, b) {
        if (a.weekPoint === b.weekPoint) {
          return 0;
        } else {
          return a.weekPoint > b.weekPoint ? -1 : 1;
        }
      }

      //checkbox tasks
      if (checkBoxTasks.length != 0) {
        for (var i = 0; i < checkBoxTasks.length; i++) {
          tasksWeight += checkBoxTasks[i].weight;

          console.log($("#check" + (i + 1).toString()));
          $("#check" + (i + 1)).css("display", "block");
          $("#check" + (i + 1).toString()).html(checkBoxTasks[i].task);
        }
      } else {
        document.getElementById("checkBox-wrapp").style.display = "none";
      }

      noUiSlider.create(dinnerSlider, {
        animationDuration: 300,
        start: [0],
        step: 1,
        range: {
          min: 0,
          max: eatingDays,
        },
      });

      noUiSlider.create(quranSlider, {
        animationDuration: 300,
        start: [0],
        step: 1,
        range: {
          min: 0,
          max: quranDaysNumber,
        },
      });

      noUiSlider.create(weeklyTasksSlider, {
        animationDuration: 300,
        start: [0],
        step: 1,
        range: {
          min: 0,
          max: numberOfWeeklyTasks,
        },
      });

      //   dinnerSlider.noUiSlider.on("update", function () {
      //     return updateSliderValue(dinnerSlider);
      //   });

      //   quranSlider.noUiSlider.on("update", function () {
      //     return updateSliderValue(quranSlider);
      //   });

      //   weeklyTasksSlider.noUiSlider.on("update", function () {
      //     return updateSliderValue(weeklyTasksSlider);
      //   });

      slidersList.forEach((slider) => {
        slider.noUiSlider.on("update", function () {
          return updateSliderValue(slider);
        });
      });

      if (sawa3edTasks.length != 0) {
        for (var i = 0; i < sawa3edTasks.length; i++) {
          $("#badercheck" + (i + 1)).css("display", "block");
          $("#badercheck" + (i + 1).toString()).html(sawa3edTasks[i].task);
        }
      } else {
        document.getElementById("checkBox-sawa3ed").style.display = "none";
      }

      // }

      var ask = obj.ask;
      if (ask != "") {
        $("#ask span").html(ask);
      } else {
        $("#ask").remove();
      }
      var note1 = obj.note1;
      var note2 = obj.note2;

      if (note1 != "") {
        $("#note").append("<p style='color:red;' >" + note1 + "</p>");
        if (note2 != "") $("#note").append("<hr/>");
      }

      if (note2 != "") {
        $("#note").append("<p style='color:red;'>" + note2 + "</p>");
      }

      var groupsResults = obj.groupsResults;
      var titles = obj.groupsResults[0];

      function getSeries(a, b) {
        var series = [];
        for (let i = 1; i < groupsResults.length; i++) {
          var groupSeries = [];
          for (let j = 0; j < groupsResults[i].length; j++) {
            groupSeries.push(groupsResults[i][j]);
          }
          series.push(groupSeries);
        }
        return series;
      }

      var chart = new Chartist.Line(
        ".ct-chart",
        {
          // if labels.length is changed:
          //     then "Choose the equivalent labelOffset values in axisX attr"
          labels: [titles[0], titles[1], titles[2], titles[3]],
          series: getSeries(),
        },
        {
          // stretch: true,

          low: 0,
          high: titles[4],
          height: "400px",
          distributeSeries: true,
          // showLine: false,
          axisX: {
            // The offset of the labels to the chart area
            // offset: 50,
            // If labels should be shown or not
            showLabel: true,
            labelOffset: {
              // x: 172, // if labels.length == 3
              // y: 172

              x: 130, // if labels.length == 4
              y: 126,

              // x: 108, // if labels.length == 5
              // y: 102
            },
          },
          chartPadding: {
            // top: 15,
            // right: 15,
            // bottom: 5,
            // left: 10
          },
          axisY: {
            // Lets offset the chart a bit from the labels
            // The label interpolation function enables you to modify the values
            // used for the labels on each axis. Here we are converting the
            // values into million pound.
            labelInterpolationFnc: function (value) {
              return value;
            },
            scaleMinSpace: 50,
            onlyInteger: true,
          },
        },
        [
          // Options override for media < 480px

          [
            "screen and (max-width: 768px)",
            {
              axisX: {
                // The offset of the labels to the chart area
                // offset: 50,
                // If labels should be shown or not
                showLabel: true,
                labelOffset: {
                  // x: 130, // if labels.length == 3
                  // y: 125

                  x: 98, // if labels.length == 4
                  y: 94,

                  // x: 80, // if labels.length == 5
                  // y: 77
                },
              },
            },
          ],
          [
            "screen and (max-width: 425px)",
            {
              axisX: {
                // The offset of the labels to the chart area
                // offset: 50,
                // If labels should be shown or not
                showLabel: true,
                labelOffset: {
                  // x: 70, // if labels.length == 3
                  // y: 63

                  x: 52, // if labels.length == 4
                  y: 47,

                  // x: 40, // if labels.length == 5
                  // y: 38
                },
              },
            },
          ],
          [
            "screen and (max-width: 375px)",
            {
              axisX: {
                // The offset of the labels to the chart area
                // offset: 50,
                // If labels should be shown or not
                showLabel: true,
                labelOffset: {
                  // x: 56, // if labels.length == 3
                  // y: 52

                  x: 43, // if labels.length == 4
                  y: 39,

                  // x: 35, // if labels.length == 5
                  // y: 32
                },
              },
            },
          ],
          [
            "screen and (max-width: 320px)",
            {
              axisX: {
                // The offset of the labels to the chart area
                // offset: 50,
                // If labels should be shown or not
                showLabel: true,
                labelOffset: {
                  // x: 46, // if labels.length == 3
                  // y: 37

                  x: 35, // if labels.length == 4
                  y: 29,

                  // x: 30, // if labels.length == 5
                  // y: 22.5
                },
              },
            },
          ],
        ]
      );

      // Let's put a sequence number aside so we can use it in the event callbacks
      var seq = 0,
        delays = 80,
        durations = 500;

      // Once the chart is fully created we reset the sequence
      chart.on("created", function () {
        seq = 0;
      });

      // On each drawn element by Chartist we use the Chartist.Svg API to trigger SMIL animations
      chart.on("draw", function (data) {
        seq++;

        if (data.type === "line") {
          // If the drawn element is a line we do a simple opacity fade in. This could also be achieved using CSS3 animations.
          data.element.animate({
            opacity: {
              // The delay when we like to start the animation
              begin: seq * delays + 1000,
              // Duration of the animation
              dur: durations,
              // The value where the animation should start
              from: 0,
              // The value where it should end
              to: 1,
            },
          });
        } else if (data.type === "label" && data.axis === "x") {
          data.element.animate({
            y: {
              begin: seq * delays,
              dur: durations,
              from: data.y + 100,
              to: data.y,
              // We can specify an easing function from Chartist.Svg.Easing
              easing: "easeOutQuart",
            },
          });
        } else if (data.type === "label" && data.axis === "y") {
          data.element.animate({
            x: {
              begin: seq * delays,
              dur: durations,
              from: data.x - 100,
              to: data.x,
              easing: "easeOutQuart",
            },
          });
        } else if (data.type === "point") {
          data.element.animate({
            x1: {
              begin: seq * delays,
              dur: durations,
              from: data.x - 10,
              to: data.x,
              easing: "easeOutQuart",
            },
            x2: {
              begin: seq * delays,
              dur: durations,
              from: data.x - 10,
              to: data.x,
              easing: "easeOutQuart",
            },
            opacity: {
              begin: seq * delays,
              dur: durations,
              from: 0,
              to: 1,
              easing: "easeOutQuart",
            },
          });
        } else if (data.type === "grid") {
          // Using data.axis we get x or y which we can use to construct our animation definition objects
          var pos1Animation = {
            begin: seq * delays,
            dur: durations,
            from: data[data.axis.units.pos + "1"] - 30,
            to: data[data.axis.units.pos + "1"],
            easing: "easeOutQuart",
          };

          var pos2Animation = {
            begin: seq * delays,
            dur: durations,
            from: data[data.axis.units.pos + "2"] - 100,
            to: data[data.axis.units.pos + "2"],
            easing: "easeOutQuart",
          };

          var animations = {};
          animations[data.axis.units.pos + "1"] = pos1Animation;
          animations[data.axis.units.pos + "2"] = pos2Animation;
          animations["opacity"] = {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "easeOutQuart",
          };

          data.element.animate(animations);
        }
      });

      chart.on("created", function () {
        if (window.__exampleAnimateTimeout) {
          clearTimeout(window.__exampleAnimateTimeout);
        }
        if (window.__exampleAnimateTimeout == null) {
          window.__exampleAnimateTimeout = chart.update.bind(chart);
        }
      });
    });
});

// jQuery plugin to prevent double submission of forms
jQuery.fn.preventDoubleSubmission = function () {
  $(this).on("submit", function (e) {
    var $form = $(this);

    if ($form.data("submitted") === true) {
      // Previously submitted - don't submit again
      e.preventDefault();
    } else {
      // Mark it so that the next submit can be ignored
      $form.data("submitted", true);
    }
  });

  // Keep chainability
  return this;
};

var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("tab");
  // x[n].style.display = "block";
  x[n].classList.remove("hidden");
  setTimeout(function () {
    x[n].classList.remove("visuallyhidden");
  }, 2.5);

  //... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == 4) {
    document.getElementById("nextBtn").innerHTML = "سلّم ي مودييير";
  } else {
    document.getElementById("nextBtn").innerHTML = "اللي بعده";
  }

  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n);
}

function nextPrev(n) {
  // This function will figure out which tab to display

  var x = document.getElementsByClassName("tab");

  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  // x[currentTab].style.display = "none";
  x[currentTab].classList.add("visuallyhidden");
  x[currentTab].classList.add("hidden");

  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab >= 3) {
    // ... the form gets submitted:
    document.getElementById("mainForm").submit();
  }

  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  z = x[currentTab].getElementsByTagName("select"); // or in jQuery use: select = this;
  v = x[currentTab].getElementsByTagName("textarea"); // or in jQuery use: select = this;

  if (y.length != 0) {
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
      // If a field is empty...
      //  || y[i].value == ""
      if (!y[i].checkValidity()) {
        // add an "invalid" class to the field:
        y[i].className += " invalid";
        // y[i].animate({backgroundColor: '#EDEFF0' });
        // and set the current valid status to false
        y[i].reportValidity();

        valid = false;
      } else {
        y[i].classList.remove("invalid");
      }
    }
  }

  if (z.length != 0) {
    for (i = 0; i < z.length; i++) {
      if (z[i].value == "") {
        // value is set to a valid option, so submit form
        valid = false;
        // add an "invalid" class to the field:
        z[i].className += " invalid";
      } else {
        z[i].classList.remove("invalid");
      }
    }
  }

  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i,
    x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}

function updatePoints() {
  points = 0;
  for (let i = 0; i < checkBoxTasks.length; i++) {
    const checkBox = checkBoxTasks[i];
    if ($("#mgls" + (i + 1).toString()).is(":checked")) {
      points += checkBox.weight;
      document.getElementById("mgls" + (i + 1)).value = checkBox.task;
    } else {
      document.getElementById("mgls" + (i + 1)).value = "";
    }

    // }
  }

  for (let i = 0; i < sawa3edTasks.length; i++) {
    const checkBox = sawa3edTasks[i];
    if ($("#bader" + (i + 1).toString()).is(":checked")) {
      document.getElementById("bader" + (i + 1)).value = checkBox.task;
    } else {
      document.getElementById("bader" + (i + 1)).value = "";
    }

    // }
  }

  points = points + tasksPoints;
  $("#points").html(points);
  document.getElementById("totalPoints").value = points;

  $("#progressbar div").css(
    "width",
    (
      (points /
        (tasksWeight + eatingDays + numberOfWeeklyTasks + quranDaysNumber)) *
      100
    ).toString() + "%"
  );
}
