

let startbtn = document.getElementsByClassName('btn btn-warning btn-lg')[0];

let money = 1000;

let isGameOn = true;


const createrow= ()=>{

let r = document.createElement("div");
r.classList.add("row");
r.classList.add("row-cols-4");
r.classList.add('justify-content-center');
return r;
}
const createcol= ()=>{

    let create = document.createElement("div");
    create.classList.add("col");
    create.classList.add('xs')
    return create;
}

const reset = ()=>{
    money=1000;
    update_money();
    document.querySelector("#output").innerHTML="<br>";

    document.querySelectorAll(".btn-outline-primary").forEach(element => {
        element.classList.remove("disable");
        element.disabled = false;
    });
    document.querySelector("#tryagain").classList.add("disable")
    document.querySelector("#tryagain").disabled = true
    clicks = 0;
    update_clicks();
    startTimer()
}
let clicks = 0

const probclick = (prob)=>{
    let output = document.querySelector("#output")
    
    if(!isGameOn) return;

    if(prob=='win-1'){
        if(Math.random()>=0.5? true: false){
            if(Math.random()>=0.3? true: false)
                output.innerHTML="You won 50 but lost 50"
            else{
                output.innerHTML="You lost 50"
                money-=50;
            }
        }
        else{
            output.innerHTML="You won 50!"
            money+=50;
        }
    }

    else if(prob=='lose-1'){
        if(Math.random()>=0.75? true: false){
            output.innerHTML="You won 100"
            money+=100
        }
        else{
            output.innerHTML="You won 100 but lost 150"
            money-=50;
        }
    }
    
   else  if(prob=='win-2'){
        if(Math.random()>=0.4? true: false){
            output.innerHTML="You won 100 but lost 50"
            money+=50
        }
        else{
            output.innerHTML="You lost 50!"
            money-=50
        }
    }
    
    else{
        if(Math.random()>=0.75? true: false){
            output.innerHTML="You won 150"
            money+=150
        }
        else{
            output.innerHTML="You won 50 but lost 150"
            money-=100;
        }
    }
    clicks+=1;
    update_clicks();
    update_money();
}
const update_clicks = ()=>{
    
    document.querySelector("#clicks").innerHTML="Clicks: "+clicks;
    if(clicks==50)
    {
        
        document.querySelector("#output").innerHTML="You clicked too much! "
        stop();
    }
    
}

const update_money = ()=>{
    document.querySelector('#money').innerHTML="Money: "+money;
}






const create_but = (possib) =>{
    let but = document.createElement("button")
    
    but.setAttribute("type", "button")
    but.classList.add("btn")
    but.classList.add("btn-outline-primary")
    but.setAttribute('id', possib)
    but.addEventListener("click",()=>probclick(possib));
    return but;
}



let maincontainer = document.querySelector(".main")

const start_onclick = ()=>{
    
   let prompt =  document.querySelector("#text_prompt");
   prompt.classList.add("invisible");
   
   let r = document.createElement("div");
   r.classList.add("row");
   r.classList.add("row-cols-3");
   r.classList.add('justify-content-center');
   
   let rcol = document.createElement("div")
   rcol.classList.add("col");
   rcol.classList.add("justify-content-center");
   rcol.innerHTML="<center><h5 id='money'>Money: 1000</h5><center>";


   
   let rtimer = document.createElement("div")
   rtimer.classList.add("col");
   rtimer.classList.add("justify-content-center");
   rtimer.innerHTML="<center><h5 id=\"timer\">Timer: </h5><center>";
   
   let rclicks = document.createElement("div")
   rclicks.classList.add("col");
   rclicks.classList.add("justify-content-center");
   rclicks.innerHTML="<center><h5 id=\"clicks\">Clicks: 0</h5><center>";
   
   
   r.appendChild(rcol);
   r.appendChild(rtimer)
   r.appendChild(rclicks)
    let help = document.createElement('p');
    help.innerHTML="<center>Start clicking buttons and earning money!<center>"
    maincontainer.append(help);
   maincontainer.append(r);
   
   let output = document.createElement("div")
    //output.setAttribute("id","output")
   output.innerHTML="<h3 id=\"output\"><br></h3>";
    maincontainer.append(output);

   
   
   let row = createrow();


    let prob = ["win-1","win-2","lose-1","lose-2"];
    for(let c = 0; c<4; c++)
    {

        let create = createcol();
        let probb = prob[Math.floor(Math.random()*prob.length)];
        let but = create_but(probb);
        let index = prob.indexOf(probb);
        prob.splice(index, 1);
        but.innerHTML=c+1
        create.appendChild(but);
        row.appendChild(create);
    }

    
    maincontainer.append(row)

    let rbut = document.createElement("div")
    rbut.classList.add("row")
    rbut.classList.add("row-cols-1");
   rbut.classList.add('justify-content-center');

   let rcoll = document.createElement('div')
    rcoll.classList.add('col')
   
    
    
    
    let ef =  document.createElement("button")
    ef.setAttribute("type", "button")
    ef.classList.add("btn-warning")
    ef.classList.add("btn-lg")
    ef.classList.add("disable")
    ef.setAttribute('id',"tryagain")
    ef.addEventListener("click",reset);
     ef.innerHTML="Try again?"
   // ef.disabled= true;
    
   
    rcoll.appendChild(document.createElement('center').appendChild(ef))
    rbut.appendChild(rcoll)
    ef.disabled= true;
    maincontainer.append(rbut)

    startTimer();
}

let timerref = ""
const startTimer = ()=>{

let timertext = document.querySelector("#timer");
let x = 0
timerref = setInterval( function (){


    if(x==10){
        
        clearInterval(timerref);
        document.querySelector("#output").innerHTML="Your time's up!, "
        stop();
    }
   

    min = Math.floor(x/60);
    seconds = x%60;
    seconds = seconds<10? "0"+seconds: seconds;
    timertext.innerHTML="Timer: "+min+":"+seconds;

    x+=1
    
   
},1000)

}


const stop= ()=>{
    clearInterval(timerref);
    document.querySelector("#output").innerHTML+="You started with 1000 and ended up with "+money;
    document.querySelectorAll(".btn-outline-primary").forEach(element => {
        element.classList.add("disable");
        element.disabled = true; 
    });
   let t =  document.querySelector("#tryagain")
   t.classList.remove('disable')
   t.disabled = false
}
startbtn.addEventListener("click",start_onclick);