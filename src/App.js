
import './App.css';
import Display from './calculator';
import {useState} from 'react';
function App() {
  const [res, setRes] = useState("");
  const [exp, setExp] = useState("0");
  
  
  //const [dot, setDot] = useState(false);

  function handleACClick(){
    
    if(exp !=="0"){
      setRes("");
    setExp("0");
    }
  }
  function handleNormalClick(btnTxt){
    
    if(exp === "0"){
      setExp(btnTxt);
      setRes(btnTxt);
    }else{
      setExp(exp.concat(btnTxt));
     setRes(res.concat(btnTxt));
    }
    
  }
  function handleOperatorClick(btnTxt){
    setRes(res.concat(btnTxt));
    setExp("");
  }
  
  function handleEquals(){
    //TO DO
    const nums =[];
    const ops = [];
    if(res===""||"+-X/".includes(res[res.length-1])){
      alert("Nothing to Eval")
      return;
    }else{
      let len = 0;
      let term ="";
      while(len < res.length){
        var nextCh = res[len];
       // console.log(nextCh);
        if (nextCh ==="."||parseInt(nextCh)>=0){
          term = term.concat(nextCh);
          
        }else{
          if(nextCh === "+"){
            //console.log("+ is working");
            nums.push(parseFloat(term));
            term = "";
            while(ops.length>0 && (ops[ops.length-1]==="X"||ops[ops.length-1]==="/"||ops[ops.length-1]==="-")){
                 nums.push(ops.pop());
                 console.log(nums[nums.length-1]);
            }
            //console.log(nums.toString());
            ops.push(nextCh)
          }else if(nextCh === "-"){
            //console.log("- is working");
            nums.push(parseFloat(term));
            term = "";
            while(ops.length>0 && ops[ops.length-1]!=="(" && (ops[ops.length-1]==="+"||ops[ops.length-1]==="/"||ops[ops.length-1]==="X")){
                 nums.push(ops.pop());
                 
            }
            //console.log(nums.toString());
            ops.push(nextCh)
          }else if(nextCh === "X"){
            //console.log(nextCh==="X");
            nums.push(parseFloat(term));
            term = "";
            while(ops.length>0 && ops[ops.length-1]!=="(" && ops[ops.length-1]==="/"){
                 nums.push(ops.pop());
                 
            }
            ops.push(nextCh)
          }else if(nextCh === "/"){
            //console.log("/ is working");
            nums.push(parseFloat(term));
            term = "";
            while(ops.length>0 && ops[ops.length-1]!=="(" && ops[ops.length-1]==="X"){
                 nums.push(ops.pop());
                 
            }
            ops.push(nextCh)
          }
        }
        len++;
        if(len === res.length){
          nums.push(term);
          term = "";
        }
      }//end of parsing whie
      //console.log(ops.toString());
      if(ops.length){
        for(var i = ops.length-1;i>=0;i--){
          nums.push(ops.pop());
        }
      }
    }
    //console.log(nums.toString());
    let index = 0;
    while(index<nums.length){
      if(nums[index]==="+"){
        let sum = parseFloat(nums[index-1])+parseFloat(nums[index-2]);
        nums[index-2] = sum;
        nums.splice(index-1,2);
        index-=2;
        //nums.pop();

      }else if(nums[index]==="-"){
        let diff = parseFloat(nums[index-2])-parseFloat(nums[index-1]);
        nums[index-2] = diff;
        nums.splice(index-1,2);
        index-=2;
      }else if(nums[index]==="/"){
        let quotient = parseFloat(nums[index-2])/parseFloat(nums[index-1]);
        nums[index-2] = quotient;
        nums.splice(index-1,2);
        index-=2;
      }else if(nums[index]==="X"){
        let prod = parseFloat(nums[index-2])*parseFloat(nums[index-1]);
        nums[index-2] = prod;
        nums.splice(index-1,2);
        index-=2;
      }
      index++;
    }
    //console.log(nums.toString());
    setRes(nums.toString())
    setExp(nums.toString());
  }
  function handleDecimal(){
     if(exp.includes(".")){
      return;
     }else{
      setExp(exp.concat("."));
      setRes(res.concat("."));
     }
  }
  return (
    <div className = "App">
      <header className="App-header">
      
        <p>
         JS Calculator
        </p>
        
      </header>
      <Display res={res} exp = {exp}/>
      <div className="Row-1">
      <Button cn = "AClear" id="clear" txt="AC" onclick={e=>handleACClick()}/>
      <Button cn = "Normal" id="divide" txt="/" onclick={e=>handleOperatorClick("/")}/>
      <Button cn = "Normal" id="multiply" txt="X" onclick={e=>handleOperatorClick("X")}/>
      </div>
      <div className="Row-2">
      <Button cn = "Normal" id="seven" txt="7"onclick={e=>handleNormalClick("7")}/>
      <Button cn = "Normal" id="eight" txt="8" onclick={e=>handleNormalClick("8")}/>
      <Button cn = "Normal" id="nine" txt="9" onclick={e=>handleNormalClick("9")}/>
      <Button cn = "Normal" id="subtract" txt="-" onclick={e=>handleOperatorClick("-")}/>
      </div>
      <div className="Row-3">
      <Button cn = "Normal" id="four" txt="4"onclick={e=>handleNormalClick("4")}/>
      <Button cn = "Normal" id="five" txt="5" onclick={e=>handleNormalClick("5")}/>
      <Button cn = "Normal" id="six" txt="6"onclick={e=>handleNormalClick("6")}/>
      <Button cn = "Normal" id="add" txt="+" onclick={e=>handleOperatorClick("+")}/>
      </div>
      <div className="Row-4">
      <Button cn = "Normal" id="one" txt="1" onclick={e=>handleNormalClick("1")}/>
      <Button cn = "Normal" id="two" txt="2" onclick={e=>handleNormalClick("2")}/>
      <Button cn = "Normal" id="three" txt="3" onclick={e=>handleNormalClick("3")}/>
      <Button cn = "Equal" id="equal" txt="=" onclick={e=>handleEquals()}/>
      <Button cn = "Zero" id="zero" txt="0" onclick={e=>handleNormalClick("0")}/>
      <Button cn = "Decimal" id="decimal" txt="." onclick={e=>handleDecimal(".")}/>
      
      </div>
      
      
    </div>
  );
}
function Button({id, cn, txt, onclick}){
  return(
      <button className ={cn} id ={id} onClick={onclick}>{txt}</button>
  );
}
export default App;
