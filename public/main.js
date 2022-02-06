class App{
    init(){
        this.render();
        this.getDoctors();
    }
    render(){
        
     let ul=  document.getElementById("phy-list")
     var that=this;
     ul.addEventListener('click', function (event) { 
            var ele = event.target.parentNode
            var id=ele.getAttribute("id");
           
            that.getDoctorById(id);
            event.preventDefault();
        });
    }
    fillTableInfo(data){
        if(data.length<0)return;
        let fullname=document.getElementById("doc-full-name");
        let email=document.getElementById("doc-email");
        fullname.innerText=data[0].doctorFullName;
        email.innerText=data[0].doctorEmail;
        let t_body=document.getElementById("t_body");
        for(var i=0;i<data.length;i++){
            var rowNode = document.createElement("tr");
var id = document.createElement("td");
var name = document.createElement("td");
var time=document.createElement("td");
var kind=document.createElement("td");
var id_text = document.createTextNode(i+1);
var name_text=document.createTextNode(data[i].name);
var time_text=document.createTextNode(data[i].time);
var kind_text=document.createTextNode(data[i].type);

id.appendChild(id_text);
name.appendChild(name_text);
time.appendChild(time_text);
kind.appendChild(kind_text);
rowNode.appendChild(id);
rowNode.appendChild(name);
rowNode.appendChild(time);
rowNode.appendChild(kind);

t_body.appendChild(rowNode);
        }
    }
    fillNavBar(data){
let ul=document.getElementById("phy-list");
for(var i=0;i<data.length;i++){
    let li=document.createElement("li");
    li.setAttribute("id",data[i].id);
    li.innerText=data[i].name;
}
    }
    getDoctors(){
        debugger
        fetch('localhost:8000/doctors').then(e=>e.json()).then(data=>{
this.fillNavBar(data);
        })
    }
    getDoctorById(id){
        fetch('localhost:8000/doctors/'+id).then(e=>e.json()).then(data=>{
            this.fillTableInfo(data);
        })
    }
}
let app=new App();
app.init();
