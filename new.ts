var empId: number = 1;
var empName: string = "Steve";        

// Tuple type variable 
var employee: [number, string] = [1, "Steve"];

var employee: [number, string] = [1, "Steve"];
var person: [number, string, boolean] = [1, "Steve", true];

var user: [number | string, boolean, number, string];// declare tuple variable
user = ["sujan", true, 20, "Admin"];// initialize tuple variable

console.log(user);

function getTime(): number {
    return new Date().getTime();
  }
  getTime(Date);
  function multiply(a: number, b: number) {
    console.log( a * b);
     
  }
  multiply(1,2);