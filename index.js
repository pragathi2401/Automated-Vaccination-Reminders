var Mongoclient = require('mongodb').MongoClient
var express = require('express')
var cors=require('cors')
var twilio=require('twilio');
const { PhoneNumberContext } = require('twilio/lib/rest/routes/v2/phoneNumber');

var app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use('/images', express.static('images'));
Mongoclient.connect("mongodb://localhost:27017",(err,client)=>{
  if(err)
  {
      console.log("error in connection"+err)
  }
  else{
      console.log("connection successful")
      db=client.db('vaccine')
  }
})
////hospital//// 


app.get('/',(req,res)=>{
  res.sendFile(__dirname+"/home.html")
})
app.get('/vaccinationchart.html',(req,res)=>{
  res.sendFile(__dirname+"/vaccinationchart.html")
})
app.get('/vaccinationusage.html',(req,res)=>{
  res.sendFile(__dirname+"/vaccinationusage.html")
})
app.get('/hospital_login.html',(req,res)=>{
  res.sendFile(__dirname+"/hospital_login.html")
})
app.get('/parentlogin.html',(req,res)=>{
  res.sendFile(__dirname+"/parentlogin.html")
})
app.get('/medical_asst_login.html',(req,res)=>{
  res.sendFile(__dirname+"/medical_asst_login.html")
})
app.get('/hospital.html',(req,res)=>{
  res.sendFile(__dirname+"/hospital.html")
})
app.get('/parent.html',(req,res)=>{
  res.sendFile(__dirname+"/parent.html")
})
app.get('/medical_assistant.html',(req,res)=>{
  res.sendFile(__dirname+"/medical_assistant.html")
})
app.post('/adddetails',async (req,res)=>{
  //  console.log("adding details");
   result= await db.collection('details').findOne({"phno":req.body.phno});
   console.log(result);
   if(result){
    res.send({msg:"Phone Number Already Exists"});
   }
   
   else{
   db.collection('details').insertOne(req.body)
   db.collection('anm').insertOne({"phno":req.body.phno,"dob":req.body.dob,"BCG":"NO","OPV0":"NO","HEPB":"NO",
  "OPV1":"NO","PENTA1":"NO","IPV1":"NO","OPV2":"NO","PENTA2":"NO","OPV3":"NO","PENTA3":"NO","IPV2":"NO",
  "MEASLES1":"NO","VITA1":"NO","DPTBOOSTER1":"NO","OPVBOOSTER":"NO","MEASLES2":"NO",
  "VITA2":"NO","DPTBOOSTER2":"NO","TT1BOOSTER":"NO","TT2BOOSTER":"NO"
   });
   //db.collection('anm').insertOne({"phno":req.body.phno,"dob":req.body.dob});
    res.send({msg:"Successfully Registered"});
  }
})

/////Parent/////
app.get('/parenthtml',(req,res)=>{
  res.sendFile(__dirname+"/parent.html");
})
app.put('/addchild/:phno/:child',(req,res)=>{
  console.log(req.params.child);
   db.collection('details').updateOne({"phno":req.params.phno},{$set:{"childName":req.params.child}})
   res.end();
})
app.get("/parent/:phno/:dob",(req,res)=>{
   db.collection("details").find({"phno":req.params.phno,"dob":req.params.dob}).toArray((err, items) => {
    if (err) { }
    res.send(items);
});
})
app.get("/vaccination/:phno/:dob",(req,res)=>{
  db.collection("anm").find({"phno":req.params.phno,"dob":req.params.dob}).toArray((err, items) => {
   if (err) { }
   res.send(items);
});
})

/////vaccination details////

app.get("/anm/:phno/:dob",(req,res)=>{
  db.collection("anm").find({"phno":req.params.phno,"dob":req.params.dob}).toArray((err, items) => {
   if (err) { }
   res.send(items);
});
})
app.put('/anmupdate/BCG/:phone',(req,res)=>{
   db.collection("anm").updateOne({"phno":req.params.phone},{$set:{"BCG":"YES"}})
  res.end();
})
app.put('/anmupdate/OPV0/:phone',(req,res)=>{
   db.collection("anm").updateOne({"phno":req.params.phone},{$set:{"OPV0":"YES"}})
  res.end();
})
app.put('/anmupdate/HEPB/:phone',(req,res)=>{
  db.collection("anm").updateOne({"phno":req.params.phone},{$set:{"HEPB":"YES"}})
 res.end();
})
app.put('/anmupdate/OPV1/:phone',(req,res)=>{
  db.collection("anm").updateOne({"phno":req.params.phone},{$set:{"OPV1":"YES"}})
 res.end();
})
app.put('/anmupdate/PENTA1/:phone',(req,res)=>{
  db.collection("anm").updateOne({"phno":req.params.phone},{$set:{"PENTA1":"YES"}})
 res.end();
})
app.put('/anmupdate/IPV1/:phone',(req,res)=>{
  db.collection("anm").updateOne({"phno":req.params.phone},{$set:{"IPV1":"YES"}})
 res.end();
})
app.put('/anmupdate/OPV2/:phone',(req,res)=>{
  db.collection("anm").updateOne({"phno":req.params.phone},{$set:{"OPV2":"YES"}})
 res.end();
})
app.put('/anmupdate/PENTA2/:phone',(req,res)=>{
  db.collection("anm").updateOne({"phno":req.params.phone},{$set:{"PENTA2":"YES"}})
 res.end();
})
app.put('/anmupdate/OPV3/:phone',(req,res)=>{
  db.collection("anm").updateOne({"phno":req.params.phone},{$set:{"OPV3":"YES"}})
 res.end();
})
app.put('/anmupdate/PENTA3/:phone',(req,res)=>{
  db.collection("anm").updateOne({"phno":req.params.phone},{$set:{"PENTA3":"YES"}})
 res.end();
})
app.put('/anmupdate/IPV2/:phone',(req,res)=>{
  db.collection("anm").updateOne({"phno":req.params.phone},{$set:{"IPV2":"YES"}})
 res.end();
})
app.put('/anmupdate/MEASLES1/:phone',(req,res)=>{
  db.collection("anm").updateOne({"phno":req.params.phone},{$set:{"MEASLES1":"YES"}})
 res.end();
})
app.put('/anmupdate/VITA1/:phone',(req,res)=>{
  db.collection("anm").updateOne({"phno":req.params.phone},{$set:{"VITA1":"YES"}})
 res.end();
})
app.put('/anmupdate/DPTBOOSTER1/:phone',(req,res)=>{
  db.collection("anm").updateOne({"phno":req.params.phone},{$set:{"DPTBOOSTER1":"YES"}})
 res.end();
})
app.put('/anmupdate/OPVBOOSTER/:phone',(req,res)=>{
  db.collection("anm").updateOne({"phno":req.params.phone},{$set:{"OPVBOOSTER":"YES"}})
 res.end();
})
app.put('/anmupdate/MEASLES2/:phone',(req,res)=>{
  db.collection("anm").updateOne({"phno":req.params.phone},{$set:{"MEASLES2":"YES"}})
 res.end();
})
app.put('/anmupdate/VITA2/:phone',(req,res)=>{
  db.collection("anm").updateOne({"phno":req.params.phone},{$set:{"VITA2":"YES"}})
 res.end();
})
app.put('/anmupdate/DPTBOOSTER2/:phone',(req,res)=>{
  db.collection("anm").updateOne({"phno":req.params.phone},{$set:{"DPTBOOSTER2":"YES"}})
 res.end();
})
app.put('/anmupdate/TT1BOOSTER/:phone',(req,res)=>{
  db.collection("anm").updateOne({"phno":req.params.phone},{$set:{"TT1BOOSTER":"YES"}})
 res.end();
})
app.put('/anmupdate/TT2BOOSTER/:phone',(req,res)=>{
  db.collection("anm").updateOne({"phno":req.params.phone},{$set:{"TT2BOOSTER":"YES"}})
 res.end();
})
app.post('/sms',(req,res)=>{
  
  // const accountSid = "AC92e37b32eb6b68d4f87f2fa7e025f327";
  // const authToken = "5f04d9996cb2d6ee9ade792b1bd8963f";
  const client = twilio(accountSid, authToken);
  phno="91"+req.body.phn;
  phone=parseInt(phno);
  console.log(req.body.msg);
    client.messages 
      .create({ 
         body: 'All vaccines to be taken in this slot are done and your next vaccination is on '+req.body.msg,  
         messagingServiceSid: 'MGf1f475b1ac68a54f4ebeb297f8d32eec',      
         to: phone 
       }) 
      .then(message => console.log(message.sid)) 
      .done();
const dob=new Date(req.body.dob);
console.log(dob);

const future=new Date(dob.getFullYear(),dob.getMonth(),dob.getDate(),16,00,00)//4 pm
console.log(future.toISOString());
// const sendWhen = new Date(new Date().getTime() + 61 * 60000);
client.messages.create({
  from: 'MGf1f475b1ac68a54f4ebeb297f8d32eec',
  to: phone,  // ← your phone number here
  body: 'Your next vaccination is tomorrow',
  scheduleType: 'fixed',
  sendAt: future.toISOString(),
}).then(message => console.log(message.sid));


})
app.post('/sms/complete',(req,res)=>{
  console.log("Complete");
  // const accountSid = "AC92e37b32eb6b68d4f87f2fa7e025f327";
  // const authToken = "5f04d9996cb2d6ee9ade792b1bd8963f";
  const client = twilio(accountSid, authToken);
  phno="91"+req.body.phn;
  phone=parseInt(phno);
  client.messages 
      .create({ 
         body: 'Your child is successfully vaccinated with all the vaccines',  
         messagingServiceSid: 'MGf1f475b1ac68a54f4ebeb297f8d32eec',      
         to: phone 
       }) 
      .then(message => console.log(message.sid)) 
      .done();
})
app.listen(3000,()=>{
  console.log("Server Started...");
})