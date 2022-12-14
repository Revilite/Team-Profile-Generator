const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require("inquirer")
const fs = require("fs");
const gen = require("./src/page-template.js");
const Employee = require('./lib/Employee');

// TODO: CODE GOES HERE
const team = [];


const init = ()=> {
inquirer
.prompt([
    {
        type: "input",
        message: "What is your name?",
        name: "name",
    },
    {
        type: "input",
        message: "What is your employee ID?",
        name:"id"
    },
    {
        type: "input",
        message: "What is your email address?",
        name:"email"
    },
    {
        type: "input",
        message: "What is your office number?",
        name: "number"
    },
])
.then((response) =>{
  const manager = new Manager(response.name, response.id, response.email, response.number);
  team.push(manager)
    loop();
})
}

const loop = () => {
    inquirer
    .prompt([
        {
            type: "list",
            message: "Which type of member would you like to add to your team?",
            choices: ["Engineer", "Intern", "I am finished adding my team"],
            name: "team",
        }
    ])
    .then((response) => {
        if(response.team == "Engineer"){
            engineer();
        }
        else if(response.team == "Intern"){
            intern();
        }
        else{
            fs.writeFileSync("./dist/team.html", gen(team));
            console.log("team.html has been created");
        }
    })

    
}



const engineer = () => {
    inquirer
    .prompt([
        {
            type: "input",
            message: "What is your engineers name?",
            name: "name",
        },
        {
            type: "input",
            message: "What is your engineers ID?",
            name: "id",
        },
        {
            type: "input",
            message: "What is your engineers email address?",
            name: "email"
        },
        {
            type: "input",
            message: "What is your engineers Github username?",
            name: "github",
        },
    ])
    .then((response) =>{
        const engineer = new Engineer(response.name, response.id, response.email, response.github)
        team.push(engineer);
        loop()
    })
}

const intern = () =>{
    inquirer
    .prompt([
        {
            type: "input",
            message: "What is your interns name?",
            name: "name",
        },
        {
            type: "input",
            message: "What is your interns ID?",
            name: "id",
        },
        {
            type: "input",
            message: "What is your interns email address?",
            name: "email"
        },
        {
            type: "input",
            message: "What school does your intern go to?",
            name: "school",
        },

    ])
    .then((response) =>{
        const intern = new Intern(response.name, response.id, response.email, response.school)
        team.push(intern);
        loop();
    })
}







init();

