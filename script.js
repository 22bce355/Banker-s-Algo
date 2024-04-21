
function createArrayWithZeros(n) {
    var result = [];
    for (var i = 0; i < n; i++) {
        result.push(0);
    }
    return result;
}

function alltrue(arr){
    for(let i=0;i<arr.length;i++){
        if(arr[i]==0) return false;
    }
    return true;
}

function validateInputs() {
    const inputs = document.querySelectorAll('input[type="number"]');
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value.trim() === '') {
            alert("Please fill in all input fields.");
            return false;
        }
    }
    return true;
}

function getmatrix() {
    if (!validateInputs()) {
        return;
    }
    const number_res = document.querySelector('#num-res').value;
    const table_res = document.querySelector('#total-res');
    
    const ct = document.createElement('tr');
    const cd = document.createElement('th');
    cd.innerHTML = "<h3>Resources</h3>";
    const cd1 = document.createElement('th');
    cd1.innerHTML = "<h3>Instances</h3>";
    ct.appendChild(cd);
    ct.appendChild(cd1);
    table_res.appendChild(ct);

    for (let i = 1; i <= parseInt(number_res); i++) {
        const ct = document.createElement('tr');
        const cd = document.createElement('td');
        cd.innerText = String.fromCharCode(i + 64);
        ct.appendChild(cd);
        const cd1 = document.createElement('td');
        const inputtake = document.createElement('input');
        inputtake.id = 'input' + i;
        inputtake.type = "number";
        inputtake.min = 1;
        cd1.appendChild(inputtake);
        ct.appendChild(cd1);
        table_res.appendChild(ct);
    }

    const btn1 = document.getElementById('btn1');
    btn1.disabled = true;
    const btn2 = document.createElement('button');
    btn2.id = "btn2";
    btn2.onclick = getmatrix2;
    btn2.innerText = "allocation and max";
    document.querySelector('#p1').appendChild(btn2);
}

function getmatrix2() {
    if (!validateInputs()) {
        return;
    }
    var resources = [];
    const number_res = document.querySelector('#num-res').value;
    const number_pro = document.querySelector('#num-process').value;
    const allocation = document.getElementById('allocation');
    document.getElementById('p1').innerHTML += "<h3>Allocation</h3>";
    const metadata = document.createElement('tr');
    const mth=document.createElement('th');
    mth.innerText="process";
    metadata.appendChild (mth);
    for (let i = 1; i <= parseInt(number_res); i++) {
        const temp = document.getElementById('input' + i).value;
        resources.push(temp);
        const thmetadata=document.createElement('th');
        thmetadata.innerText = String.fromCharCode(i + 64);;
        metadata.appendChild(thmetadata);


    }
    allocation.appendChild(metadata);

    
    for (let i = 1; i <= parseInt(number_pro); i++) {
        const tr = document.createElement('tr');
        for (let j = 1; j <= parseInt(number_res) + 1; j++) {
            const td = document.createElement('td');
            if (j == 1) {
                td.innerText = 'P' + i;
            } else {
                const input = document.createElement('input');
                input.type = 'number';
                input.id = 'all' + i + '' + j;
                input.min = 0;
                td.appendChild(input);
            }
            tr.appendChild(td);
        }
        allocation.appendChild(tr);
    }
    document.querySelector('#p2').innerHTML = "<h3>max</h3>";
    const max = document.querySelector('#max');
    const metadata1 = document.createElement('tr');
    const mth1=document.createElement('th');
    mth1.innerText="process";
    metadata1.appendChild (mth1);
    for (let j = 1; j <= parseInt(number_res); j++){
        const mth2=document.createElement('th');
        mth2.innerText= String.fromCharCode(j + 64);
        metadata1.appendChild(mth2);
    }
    max.appendChild(metadata1);
    for (let i = 1; i <= parseInt(number_pro); i++) {
        const tr = document.createElement('tr');
        for (let j = 1; j <= parseInt(number_res) + 1; j++) {
            const td = document.createElement('td');
            if (j == 1) {
                td.innerText = 'P' + i;
            } else {
                const input = document.createElement('input');
                input.type = 'number';
                input.id = 'max' + i + '' + j;
                input.min = 0;
                td.appendChild(input);
            }
            tr.appendChild(td);
        }
        max.appendChild(tr);
    }
    btn2.disabled = true;
    const btn3 = document.createElement('button');
    btn3.type = "button";
    btn3.innerText = "need";
    btn3.onclick = function () {
        getmatrix3(resources);
        btn3.disabled=true;
    };
    document.getElementById('p3').appendChild(btn3);
}

function getmatrix3(resources) {
    if (!validateInputs()) {
        return;
    }
    var allocation = [];
    var max = [];
    const number_res = document.querySelector('#num-res').value;
    const number_pro = document.querySelector('#num-process').value;
    document.getElementById('p3').innerHTML += "<h3>Need</h3>";
    const need = document.querySelector('#need');
    for (let i = 1; i <= parseInt(number_pro); i++) {
        var temp = [];
        for (let j = 2; j <= parseInt(number_res)+1; j++) {
            temp.push(document.getElementById('max' + i + '' + j).value);
        }
        max.push(temp);
    }
    for (let i = 1; i <= parseInt(number_pro); i++) {
        var temp = [];
        for (let j = 2; j <= parseInt(number_res)+1; j++) {
            temp.push(document.getElementById('all' + i + '' + j).value);
            if(parseInt(document.getElementById('all' + i + '' + j).value) > max[i-1][j-2]){
                alert("incorrect data! available can not be negative!!");
    window.location.reload();
            }
        }
        allocation.push(temp);
    }
var need1=[];
    for(let i=0;i<allocation.length;i++){
        var temp=[];
        for(let j=0;j<allocation[i].length;j++){
            temp.push(max[i][j] - allocation[i][j]);
            if(max[i][j]-allocation[i][j]<0){
                alert("incorrect data! available can not be negative!!");
                window.location.reload();
                return;
            }
        }
        need1.push(temp);
    }
    const tr1= document.createElement('tr');
    const th2= document.createElement('th');
    th2.innerText= "process";
    tr1.appendChild(th2);
    for(var i=1;i<=number_res ; i++){
       const th1= document.createElement('th');
       th1.innerText=String.fromCharCode(i + 64);
       tr1.appendChild(th1);
    }
    need.appendChild(tr1);
    for (var i = 0; i < need1.length; i++) {
        var row = document.createElement("tr");
        
        for (var j = 0; j <= need1[i].length; j++) {
            var cell = document.createElement("td");
            if(j==0){
            cell.textContent = "P"+(i+1);
            }
           else{ 
            cell.textContent = need1[i][j-1];
            }
            row.appendChild(cell);
        }
        need.appendChild(row);
    }


    document.getElementById('p4').innerHTML += "<h3>Available</h3>";
    var temp1 = createArrayWithZeros(number_res);
    for (let i = 0; i < allocation.length; i++) {
        for (let j = 0; j < allocation[i].length; j++) {
            temp1[j] += parseInt(allocation[i][j]);

        }
    }
    // console.log(temp1);

    var available = createArrayWithZeros(number_res);
    var available2= createArrayWithZeros(number_res);
    for (let i = 0; i < temp1.length; i++) {
        available[i] = resources[i] - temp1[i];
        available2[i]= resources[i] - temp1[i];
        if(available[i]<0){
            alert("incorrect data! available can not be negative!!");
            window.location.reload();
            return;
        }
       
    }
    var arrayString = available.join(" ");
    
    document.getElementById("p4").innerHTML = "<h3>Available</h3>"+arrayString;
    const btn4 = document.createElement('button');
    btn4.type = "button";
    btn4.innerText = "safe sequence";
    btn4.onclick = function () {
        getmatrix4(allocation,need1,available,max,available2);
    };
    // btn3.disabled = true;
    document.getElementById('p5').appendChild(btn4);
}

function getmatrix4(allocation,need1,available,max,available2){
    if (!validateInputs()) {
        return;
    }
    const number_pro = document.querySelector('#num-process').value;
    var result= createArrayWithZeros(number_pro);
    var ansstring="< ";
    var bool1=true;
    while(! alltrue(result)){ 
        console.log(available);
        
      bool1=true;
for(let i=0;i<need1.length;i++){
    console.log(available);
    var bool=true;
    if(result[i]==0){
    for(let j=0;j<need1[i].length;j++){
        if(parseInt(need1[i][j])>parseInt(available[j])){
            bool=false;
            break;
        }
        if(bool==false) break;
    }
    if(bool==true){
       for(let j=0;j<allocation[i].length;j++){
        available[j] += parseInt(allocation[i][j]);
      
       }
        result[i]=1;
        ansstring+="P"+(i+1)+" ";
        bool1=false;

    }}

}
if(bool1==true) break;
}
document.getElementById('p5').innerHTML+="<br>"
if(alltrue(result)) document.getElementById('p6').innerText+=ansstring+">";
else document.getElementById('p6').innerText+="UNSAFE:(";
const btn7= document.createElement('button');
btn7.type="button";
btn7.innerText="request";
btn7.onclick=function(){
    requestalgo(allocation,need1,max,available2);
    btn7.disabled=true;
}
// btn4.disabled = true;
document.getElementById('p7').appendChild(btn7);
// btn4.disabled = true;
}


function requestalgo(allocation,need1,max,available){
    if (!validateInputs()) {
        return;
    }
    const number_pro = document.querySelector('#num-process').value;
    const p=document.getElementById('p8');
    const number_res = document.querySelector('#num-res').value;
    const inputtag=document.createElement('input');
    inputtag.type="number";
    inputtag.id="reqp";
    inputtag.min=1;
    inputtag.max=parseInt(number_pro);
    p.innerText+= "Enter Process Number:";
    p.appendChild(inputtag);
    for (let i = 1; i <= parseInt(number_res); i++) {
        const ct = document.createElement('tr');
        const cd = document.createElement('td');
        cd.innerText = String.fromCharCode(i + 64);
        ct.appendChild(cd);
        const cd1 = document.createElement('td');
        const inputtake = document.createElement('input');
        inputtake.id = 'req' + i;
        inputtake.type = "number";
        inputtake.min = 0;
        cd1.appendChild(inputtake);
        ct.appendChild(cd1);
        p.appendChild(ct);
    }
    const btn8= document.createElement('button');
    btn8.type="button";
    btn8.innerText="NEXT"
    btn8.onclick=function(){
        requestalgo2(allocation,need1,max,available);
    }
    p.appendChild(btn8);

    // btn7.disabled = true;
}


function requestalgo2(allocation,need1,max,available){
    if (!validateInputs()) {
        return;
    }
var req=[];
var result = createArrayWithZeros(need1.length); 
    var ansstring = "< ";
const number_res = document.querySelector('#num-res').value;
for(let i=1;i<=parseInt(number_res);i++){
    req.push(parseInt(document.getElementById('req'+i).value));
}
const index=parseInt(document.getElementById('reqp').value)-1;
var b=true;
for(let i=0;i<parseInt(number_res);i++){
    if(parseInt(need1[index][i])<parseInt(req[i])){
        b=false;
        break;
    }
}
if(b==false){
    document.getElementById('p9').innerText+="Not A Legimitate Request:("
}
else{
    for(let i=0;i<parseInt(number_res);i++){
        if(parseInt(available[i])<parseInt(req[i])){
            b=false;
            break;
        }
    }
    if(b==false){
        document.getElementById('p9').innerHTML+="Req is greater than available:("
    }
    else{
        for(let i=0;i<parseInt(number_res);i++){
            need1[index][i] = parseInt( need1[index][i])-parseInt(req[i]);
            allocation[index][i] = parseInt( allocation[index][i])+ parseInt(req[i]);
            available[i] = parseInt(available[i])- parseInt(req[i]);
        }
    






var bool1=true;
while(! alltrue(result)){ 
    // console.log(available);
//     console.log(need1[index]);
// console.log(allocation[index]);
// console.log(available);
    
  bool1=true;
for(let i=0;i<need1.length;i++){
// console.log(available);
var bool=true;
if(result[i]==0){
for(let j=0;j<need1[i].length;j++){
    if(parseInt(need1[i][j])>parseInt(available[j])){
        bool=false;
        break;
    }
    if(bool==false) break;
}
if(bool==true){
   for(let j=0;j<allocation[i].length;j++){
    available[j] =parseInt(available[j])+ parseInt(allocation[i][j]);
  
   }
    result[i]=1;
    ansstring+="P"+(i+1)+" ";
    bool1=false;

}}   
}
if(bool1==true){
    break;
}

}
console.log(available);
if(alltrue(result)) {
    document.getElementById('p9').innerText+="Req can be passed and safe sequence is: ";
    document.getElementById('p9').innerText+=ansstring+" >";}
else document.getElementById('p9').innerText+="request can not be passed";
}}
// btn8.disabled = true;
}

function restart() {
    window.location.reload(); 
}
