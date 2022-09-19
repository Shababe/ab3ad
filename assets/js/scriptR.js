
// $(document).ready(function() {
    
//     $('.tab a').on('click', function(e) {
//         e.preventDefault();
//         var _this = $(this);
//         var block = _this.attr('href');
//         if (block == "#leaderboard") {
//             $(block).fadeIn();
//             $('#group').hide();
//             $('#other').hide();

//             $(document).find('.active').removeClass("active");
//             $(this).parent().addClass("active");
//         }else if (block == "#group") {
//             $(block).fadeIn();
//             $('#leaderboard').hide();
//             $('#other').hide();
//             $(document).find('.active').removeClass("active");
//             $(this).parent().addClass("active");
//         }else if (block == "#other") {
//             $(block).fadeIn();
//             $('#leaderboard').hide();
//             $('#group').hide();
//             $(document).find('.active').removeClass("active");
//             $(this).parent().addClass("active");
//         }
//     });

//     $('.tab.active a').click(); // Default open


    

    



//     //----------------------------------------------------------


//     fetch("https://sheets.googleapis.com/v4/spreadsheets/1P_X8RoBtd-YBBw0pD-CJcbfOMgqxoxmd_VM4bYG0ObI/values/الورقة4!a2?key=AIzaSyAnBt9xAdMMEq6uOjdBP9p0L13jGbbRuDw")
//     .then((resp) => resp.json())
//   .then(function(data) {
//     var json = data["values"][0][0];

//     var obj = JSON.parse(json);

//     var inividual = obj[0];
//     var groups = obj[1];

//     var titles = groups[0],
//         shomokhTotal = groups[1],
//         somodToatal = groups[2]
//         m3alyTotal = groups[3]


//     var m3aly = inividual[0],
//         somod = inividual[1],
//         shomokh = inividual[2];

//     var chart = new Chartist.Line(
//         ".ct-chart", {
//             // if labels.length is changed:
//             //     then "Choose the equivalent labelOffset values in axisX attr"
//             labels: [
//                 titles[0],
//                 titles[1],
//                 titles[2],
//                 titles[3]
//             ],
//             series: [
//                 [

//                 shomokhTotal[1],
//                 shomokhTotal[2],
//                 shomokhTotal[3],
//                 shomokhTotal[4]            
//                 ], // الشموخ 
//                 [
//                 somodToatal[1],
//                 somodToatal[2],
//                 somodToatal[3],
//                 somodToatal[4]
                
//                 ], // الصمود
//                 [
//                 m3alyTotal[1],
//                 m3alyTotal[2],
//                 m3alyTotal[3],
//                 m3alyTotal[4]
                
//                 ] // المعالي
//             ]
//         }, {
//             // stretch: true,
            
//             low: 0,
//             high: titles[4],
//             height: "400px",
//             distributeSeries: true,
//             // showLine: false,
//             axisX: {
//                 // The offset of the labels to the chart area
//                 // offset: 50,
//                 // If labels should be shown or not
//                 showLabel: true,
//                 labelOffset: {
//                     // x: 172, // if labels.length == 3
//                     // y: 172

//                     x: 130, // if labels.length == 4
//                     y: 126

//                     // x: 108, // if labels.length == 5
//                     // y: 102

//                 }
//             },
//             chartPadding: {
//                 // top: 15,
//                 // right: 15,
//                 // bottom: 5,
//                 // left: 10
//             },
//             axisY: {
//                 // Lets offset the chart a bit from the labels
//                 // The label interpolation function enables you to modify the values
//                 // used for the labels on each axis. Here we are converting the
//                 // values into million pound.
//                 labelInterpolationFnc: function(value) {
//                     return value;
//                 },
//                 scaleMinSpace: 50,
//                 onlyInteger: true
//             }
//         }, [
//             // Options override for media < 480px

//             [
//                 "screen and (max-width: 768px)",
//                 {
//                     axisX: {
//                         // The offset of the labels to the chart area
//                         // offset: 50,
//                         // If labels should be shown or not
//                         showLabel: true,
//                         labelOffset: {
//                             // x: 130, // if labels.length == 3
//                             // y: 125

//                             x: 98, // if labels.length == 4
//                             y: 94

//                             // x: 80, // if labels.length == 5
//                             // y: 77

//                         }
//                     }
//                 }
//             ],
//             [
//                 "screen and (max-width: 425px)",
//                 {
//                     axisX: {
//                         // The offset of the labels to the chart area
//                         // offset: 50,
//                         // If labels should be shown or not
//                         showLabel: true,
//                         labelOffset: {
//                             // x: 70, // if labels.length == 3
//                             // y: 63

//                             x: 52, // if labels.length == 4
//                             y: 47

//                             // x: 40, // if labels.length == 5
//                             // y: 38
//                         }
//                     }
//                 }
//             ],
//             [
//                 "screen and (max-width: 375px)",
//                 {
//                     axisX: {
//                         // The offset of the labels to the chart area
//                         // offset: 50,
//                         // If labels should be shown or not
//                         showLabel: true,
//                         labelOffset: {
//                             // x: 56, // if labels.length == 3
//                             // y: 52

//                             x: 43, // if labels.length == 4
//                             y: 39

//                             // x: 35, // if labels.length == 5
//                             // y: 32
//                         }
//                     }
//                 }
//             ],
//             [
//                 "screen and (max-width: 320px)", {
//                     axisX: {
//                         // The offset of the labels to the chart area
//                         // offset: 50,
//                         // If labels should be shown or not
//                         showLabel: true,
//                         labelOffset: {
//                             // x: 46, // if labels.length == 3
//                             // y: 37

//                             x: 35, // if labels.length == 4
//                             y: 29

//                             // x: 30, // if labels.length == 5
//                             // y: 22.5
//                         }
//                     }
//                 }
//             ]
//         ]
//     );

//     // Let's put a sequence number aside so we can use it in the event callbacks
//     var seq = 0,
//         delays = 80,
//         durations = 500;

//     // Once the chart is fully created we reset the sequence
//     chart.on('created', function() {
//         seq = 0;
//     });

//     // On each drawn element by Chartist we use the Chartist.Svg API to trigger SMIL animations
//     chart.on('draw', function(data) {
//         seq++;

//         if (data.type === 'line') {
//             // If the drawn element is a line we do a simple opacity fade in. This could also be achieved using CSS3 animations.
//             data.element.animate({
//                 opacity: {
//                     // The delay when we like to start the animation
//                     begin: seq * delays + 1000,
//                     // Duration of the animation
//                     dur: durations,
//                     // The value where the animation should start
//                     from: 0,
//                     // The value where it should end
//                     to: 1
//                 }
//             });
//         } else if (data.type === 'label' && data.axis === 'x') {
//             data.element.animate({
//                 y: {
//                     begin: seq * delays,
//                     dur: durations,
//                     from: data.y + 100,
//                     to: data.y,
//                     // We can specify an easing function from Chartist.Svg.Easing
//                     easing: 'easeOutQuart'
//                 }
//             });
//         } else if (data.type === 'label' && data.axis === 'y') {
//             data.element.animate({
//                 x: {
//                     begin: seq * delays,
//                     dur: durations,
//                     from: data.x - 100,
//                     to: data.x,
//                     easing: 'easeOutQuart'
//                 }
//             });
//         } else if (data.type === 'point') {
//             data.element.animate({
//                 x1: {
//                     begin: seq * delays,
//                     dur: durations,
//                     from: data.x - 10,
//                     to: data.x,
//                     easing: 'easeOutQuart'
//                 },
//                 x2: {
//                     begin: seq * delays,
//                     dur: durations,
//                     from: data.x - 10,
//                     to: data.x,
//                     easing: 'easeOutQuart'
//                 },
//                 opacity: {
//                     begin: seq * delays,
//                     dur: durations,
//                     from: 0,
//                     to: 1,
//                     easing: 'easeOutQuart'
//                 }
//             });
//         } else if (data.type === 'grid') {
//             // Using data.axis we get x or y which we can use to construct our animation definition objects
//             var pos1Animation = {
//                 begin: seq * delays,
//                 dur: durations,
//                 from: data[data.axis.units.pos + '1'] - 30,
//                 to: data[data.axis.units.pos + '1'],
//                 easing: 'easeOutQuart'
//             };

//             var pos2Animation = {
//                 begin: seq * delays,
//                 dur: durations,
//                 from: data[data.axis.units.pos + '2'] - 100,
//                 to: data[data.axis.units.pos + '2'],
//                 easing: 'easeOutQuart'
//             };

//             var animations = {};
//             animations[data.axis.units.pos + '1'] = pos1Animation;
//             animations[data.axis.units.pos + '2'] = pos2Animation;
//             animations['opacity'] = {
//                 begin: seq * delays,
//                 dur: durations,
//                 from: 0,
//                 to: 1,
//                 easing: 'easeOutQuart'
//             };

//             data.element.animate(animations);
//         }
//     });

//     chart.on('created', function() {
//         if (window.__exampleAnimateTimeout) {
//             clearTimeout(window.__exampleAnimateTimeout);
//         }
//         if (window.__exampleAnimateTimeout == null) {
//             window.__exampleAnimateTimeout =
//                 chart.update.bind(chart);

//         }
//     });

//     var AllNames = m3aly.concat(somod, shomokh);
//     // console.log(AllNames)

//     AllNames.sort(sortByFCOther);

//     function sortByFCLeader(a, b) {
//         if (a[0] === b[0]) {
//             return 0;
//         } else {
//             return (a[0] > b[0]) ? -1 : 1;
//         }
//     }

//     AllNames[0][2] += " 🥇";
//     AllNames[1][2] += " 🥈";
//     AllNames[2][2] += " 🥉";

//         for (var i = 0; i < AllNames.length; i++) {
//             // creates option tag
//             jQuery('<li><mark>' + AllNames[i][2] + '</mark><small>' + AllNames[i][1] + '</small></li>').appendTo($("#indiv")); //appends to select if parent div has id dropdown
//         }

//         AllNames.push([20,25, "أحمد البرادي"])
//         AllNames.sort(sortByFCLeader);
        

//         AllNames[0][2] += " 🥇";
//         AllNames[1][2] += " 🥈";
//         AllNames[2][2] += " 🥉";
        
//         function sortByFCOther(a, b) {
//             if (a[1] === b[1]) {
//                 return 0;
//             } else {
//                 return (a[1] > b[1]) ? -1 : 1;
//             }
//         }
        

//         for (var i = 0; i < AllNames.length; i++) {
//             // creates option tag
//             if(AllNames[i][2] === "أحمد البرادي"){
//                 jQuery('<li><a href="https://docs.google.com/forms/d/e/1FAIpQLSd9tmmF2YonzorfZVZPfRUjYU9rKIKNKNeYJoKViye72dKseg/viewform?usp=sf_link"><mark>' + AllNames[i][2] + '</mark><small>' + AllNames[i][0] + '</small></a></li>').appendTo($("#indivother")); //appends to select if parent div has id dropdown

//             }else{
//                 jQuery('<li><mark>' + AllNames[i][2] + '</mark><small>' + AllNames[i][0] + '</small></li>').appendTo($("#indivother")); //appends to select if parent div has id dropdown
//             }
//         }

//     })
// });



