//Cyclic url https://busy-puce-elephant-ring.cyclic.app



const express = require('express');
const path = require('path');

const studentdata = require("./test2_moduleA");
const { init } = require('./test2_moduleA');




const app = express();
const exphbs = require('express-handlebars');
const { mainModule } = require('process');
const Port = process.env.PORT || 8080;

// Handlebars
//----------------------------
app.engine('.hbs', exphbs.engine({ extname: '.hbs' , defaultLayout: "main"}));
app.set('view engine', '.hbs');

//------------------------------


function onHTTPStart() {

console.log(`Express http server listening on ${Port}`);

}

app.get("/", function(req,res) {

    res.render("home");
//res.send("<h2><b>Declaration:</b></h2><br><p>I acknowlege the college's academic integrity policy - and my own integrity reminain in effect whether my work is done remotely or on site. Any test or assignment is an act of trust between me and my instructor and espacially with my classmates... even when no one is watching. I declare I will not break that trust.</p><br><p>Name: <mark>Harnoor Kaur</mark> </p><p>Student Number:<mark>156624215</mark></p><br><a href ='/BSD'>Click to visit the BSD students</a><br><a href ='/highGPA'>Click to see who has the highest GPA</a>");

});

app.get("/BSD", function(req,res) {

    studentdata.getBSD().then((somedata) => {
        
        res.render('students', {
            data: somedata,
            layout: "main.hbs" // do not use the default Layout (main.hbs)
          }
        );
       // res.json(data);
    })
});

app.get("/allStudents", function(req,res) {

    studentdata.allStudents().then((somedata) => {
        
        res.render('students', {
            data: somedata,
            layout: "main.hbs" // do not use the default Layout (main.hbs)
          }
        )
       // res.json(data);
    }).catch(function(msg) {

        console.log(msg);
    });
});

app.get("/highGPA", function(req,res) {
    studentdata.highGPA().then((somedata) => {
      
        res.render('student', {
            data: somedata,
            layout: "main.hbs" // do not use the default Layout (main.hbs)
  })
})
});


app.use((req,res) => {

    res.status(404).send("Error 404: page not found.");
})

init()
.then(function() {
    app.listen(Port, onHTTPStart);
})
.catch(function(msg) {

    console.log(msg);
});