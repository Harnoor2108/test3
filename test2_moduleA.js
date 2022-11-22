const file = require('fs');
 let students = [];
 let BSD = [];

module.exports.init = function() {


    return new Promise((resolve,reject) =>{
        file.readFile('./student.json', (err="unable to read file",data) => {
            if(err){
            reject(err);
            }
            students = JSON.parse(data);
            resolve();
        });


    });
}

module.exports.getBSD = function() {

    return new Promise((resolve , reject) => {
      var j = 0;
        for(var i=0;i<students.length;i++)
        {
          if(students[i].program == "BSD")
          {
            BSD[j] = students[i];
            j++;
          }
        }
        resolve(BSD);
        
    });

}

module.exports.allStudents = function() {

  return new Promise((resolve , reject) => {
   
    if(students.length == 0)
    {
      reject("no results returned");
    }
    else
      resolve(students);

      
  });

}


module.exports.highGPA = function() {


    return new Promise((resolve, reject) => {
        let highest = students[0].gpa;
        let index;
        for(var i = 0; i < students.length ; i++)
        {

            if(students[i].gpa > highest)
            {
                highest = students[i].gpa;
                index = i;
            }
           
        }
          resolve(students[index]);
       
         });
}
/*
module.exports.initialize = function(){
  return new Promise((resolve, reject) => {
    file.readFile('./data/employees.json', (err, data) => {
      if (err) {
        reject(err);
      }
      employees = JSON.parse(data);
      resolve();
    });
    file.readFile('./data/departments.json', (err, data) => {
      if (err) {
        reject(err);
      }
      departments = JSON.parse(data);
      resolve();
    });
  });
};
*/