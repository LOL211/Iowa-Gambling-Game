

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
}


const probclick = (prob)=>{
    let output = document.querySelector("#output")
    
    if(!isGameOn) return;

    if(prob=='win-1'){
        if(Math.random()>=0.5? true: false){
            if(Math.random()>=0.6? true: false)
                output.innerHTML="You won 50 but lost 50"
            else
                output.innerHTML="You lost 50"
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

    update_money();
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
   r.classList.add("row-cols-2");
   r.classList.add('justify-content-center');
   
   let rcol = document.createElement("div")
   rcol.classList.add("col");
   rcol.classList.add("justify-content-center");
   rcol.innerHTML="<center><h5 id='money'>Money: 1000</h5><center>";


   
   let rtimer = document.createElement("div")
   rtimer.classList.add("col");
   rtimer.classList.add("justify-content-center");
   rtimer.innerHTML="<center><h5 id=\"timer\">Timer: </h5><center>";

   
   
   r.appendChild(rcol);
   r.appendChild(rtimer)
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
    startTimer();
}
const startTimer = ()=>{

let timertext = document.querySelector("#timer");
let x = 0
let timerstart = setInterval( function (){


    if(x==120){
        stop();
        clearInterval(timerstart);
    }
   

    min = Math.floor(x/60);
    seconds = x%60;
    seconds = seconds<10? "0"+seconds: seconds;
    timertext.innerHTML="Timer: "+min+":"+seconds;

    x+=1
    
   
},1000)

}


const stop= ()=>{
    document.querySelectorAll(".btn-outline-primary").forEach(element => {
        element.classList.add("disabled");
    });
}
startbtn.addEventListener("click",start_onclick);