const express=require('express');
const app=express();
app.use(express.static('public'));
const db = require('./db');
app.get('/schedule/:uid',(req,res)=>{
    debugger
    const schedules=[];
   // const doctor=db.doctors.get(req.params.uid);
    var scheduleData=db.schedules.list();
    scheduleData= scheduleData.filter(a=>a.doctor_id==req.params.uid)
    const doctor_data=db.doctors.get(scheduleData[0].doctor_id);
    const user_data=db.users(doctor_data.user_id);
    console.log(scheduleData)
    for(var i=0;i<scheduleData.length;i++){
        
         const patient_data=db.patients.get(scheduleData[i].patient_Id);
         const kind=db.kinds.get(scheduleData[i].kind_id);

        const schedule={};
        schedule["doctorId"]=doctor_data.doctor_id;
        schedule["doctorName"]=doctor_data.doctor_name;
        schedule["doctorFullName"]=doctor_data.full_name;
        schedule["patientName"]=patient_data.name;
        schedule["type"]=kind.type;
        schedule["id"]=scheduleData[i].id;
        schedule["time"]=scheduleData[i].time;
        schedule["doctorEmail"]=user_data.email;
        schedules.push(schedule);
        console.log(doctor_data)

    }
    
    
   
    res.json(JSON.stringify(schedules));
})
app.get('/doctors',(req,res)=>{
    res.json(db.doctors.list())
})
app.listen(8000,()=>{
    console.log('listening')
})