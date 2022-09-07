import express, { request, response } from "express";
import mongoose from "mongoose";
import customer from "./customers.js";

const app = express();
app.use(express.json());

var Connection_string =
  "mongodb://127.0.0.1:27017/Thamizh?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.4";

//   insert
// -------------
app.use("/createcustomer", async (request, response) => {
  var customerData = await customer.create({
    cid: 8,
    cname: "hemanth",
    email: "hemanth@gmail.com",
    dob: "20-19-1993",
    age: "23",
    salary: 70000,
    did: 8,
    designation: "tester",
    pincode: 294832,
    pancard: "cbipd9248948",
    mobilenumber: 9849229872,
    status: 0,
    authkey: "289sjdnsjdn729392",
  });
  response.status(200).json(customerData);
});

// insertmanycustomers
// -----------------------

app.use("/insertmanycustomers", async (request, response) => {
  var customerData = await customer.create([
    {
      cid: 9,
      cname: "harshan",
      email: "harshan@gmail.com",
      dob: "30-10-1992",
      age: "29",
      salary: 40000,
      did: 9,
      designation: "project Manager",
      pincode: 929892,
      pancard: "cbipd92489308",
      mobilenumber: 9948929382,
      status: 0,
      authkey: "289sj9ujdnsjdn729392",
    },
    {
      cid: 9,
      cname: "deepthi",
      email: "deepthi@gmail.com",
      dob: "19-01-1994",
      age: "27",
      salary: 60000,
      did: 10,
      designation: "client partner",
      pincode: 929392,
      pancard: "cbipd93i2489308",
      mobilenumber: 9998929382,
      status: 0,
      authkey: "289sj9ujdnsjdn72939392",
    },
  ]);
  response.status(200).json(customerData);
});

// selectall

app.use("/getdata", async (request, response) => {
  var customerData = await customer.find();
  response.status(200).json(customerData);
});

// selectone

app.use("/gettingsingleledata", async (request, response) => {
  //   console.log(request);
  let data = await customer.find({
    cname: request.body.name, // have to pass cname
  });
  response.status(200).json(data);
});

// updateOne

app.use("/updateone", async (request, response) => {
  let data = await customer.updateOne(
    { cid: request.params.cid },
    {
      $set: {
        cname: request.body.name,
      },
    }
  );
  response.sendStatus(200).json(data);
});

// updateMany or multi

app.use("/updateall", async (request, response) => {
  //console.log(request.body);
  let data = await customer.updateMany(
    {},
    {
      $set: {
        salary: request.body.salary,
      },
    }
  );

  response.status(200).json(data);
});

// deleteone

app.use("/deletecustomer", async (request, response) => {
  let deletecustomer = await customer.deleteOne({
    cname: request.body.name,
  });
  let existcustomer = await customer.find();
  console.log(existcustomer);

  response.status(200).json(deletecustomer);
});

// login check

app.use("/login", async (request, response) => {
  let data = await customer.findOne({
    $and: [
      { mobilenumber: request.body.mobilenumber },
      { cname: request.body.cname },
    ],
  });
  if (data) {
    response.status(200).json({ message: "Login success", status: 1 });
  } else {
    response.status(200).json({ message: "Login failes", status: 0 });
  }
});

app.use("/resetpswd", async (request, response) => {
  let data = await customer.updateOne(
    { email: request.params.email },
    { oldpassword: request.params.oldpassword},
    {
      $eq: [
        {
        //   oldpassword: request.body.oldpassword,
          password: request.body.password,
          confirmpassword: request.body.confirmpassword,
        },
      ],
      $set: [
        {
          newpassword: request.body.newpassword,
        },
      ],
    }
  );

  //   if(data.password === data.confirmpassword){
  //     newpassword:request.body.newpassword,

  //   }
  if (data) {
    response.status(200).json({ message: "password changed", status: -1 });
  } else {
    response.status(200).json({ message: "failed", status: 0 });
  }
});

// app.post("/reset",function(req,res){
//     customer.findByUsername(req.body.email).then(function(exixstdUser){
//     if (exixstdUser){
//         exixstdUser.setPassword(req.body.password, function(){
//             exixstdUser.save();
//             req.flash("success","password resetted");
//                 // res.redirect("/login");
//         });
//     } else {
//         req.flash("error","User doesnt exist");
//                 // res.redirect("/reset");
//     }
//     },function(err){
//         console.log(err);res.redirect("/");
//     });

//     });


// localhost port number setup

mongoose
  .connect(Connection_string)
  .then(() => {
    app.listen(3030, () => {
      console.log("running success");
    });
  })
  .catch((error) => {
    console.log(error);
  });
