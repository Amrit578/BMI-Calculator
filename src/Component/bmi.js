import CancelIcon from '@mui/icons-material/Cancel';
import './bmi.css'
import { useEffect, useState } from 'react';


// to get the data from ls 

const getlocalitem = () =>{
    let list = localStorage.getItem('list',)
    if(list){
        return JSON.parse(localStorage.getItem('list'))
    }else{
        return [];  
    }
}
const BMI = () =>{
    const [input,setInput] = useState({
        weight : "",
        height : "",
        result : null,
        message : "",
    })


    // ================ States =================
    const [bmi, setBmi] = useState(0);
    const [fresult,setFresult] = useState(getlocalitem())
    const [status,setStatus] = useState("")

    
   

    const handleChange = (event) =>{
        event.preventDefault();
        const {name,value} = event.target;
        setInput((prev)=>{
            return {...prev,[name]:value};
        })
    }

    const crossBtn = (index) =>{
        const updateItem = fresult.filter((element,ind)=>{
            return index !== ind;
        });
        setFresult(updateItem)
    };

    const calculatebmi = () =>{
        const height2 = input.height * input.height;
        const result = input.weight/height2;
        let bmiStatus = "Obese"
        if(result<18.5){
            bmiStatus = "Under Weight";
        }else if(result>=18.5 && result<=24.9){
            bmiStatus = "Healthy"
        }else if(result>=25 && result <=29.9){
            bmiStatus = "Over Weight";
        }else{
            bmiStatus = "Obese";
        }
       
        input.result = result.toFixed(2);
        input.message = bmiStatus;
        setFresult([...fresult,input])
        setStatus(bmiStatus)
        
    }


    // add data in local storage 
    useEffect(()=>{
        localStorage.setItem('list',JSON.stringify(fresult))
    },[fresult])



    return(
        <>
           <h1>BMI Calculator</h1>
           <form>
           <div className='input-container'>
                <div className='inputs'>
                    <h3>Weight (in kg)</h3>
                    <input type="text" placeholder='Enter Weight' name = "weight" value={input.weight} onChange = {handleChange} required/>
                </div>
                <div className='inputs'>
                    <h3>Height (in m)</h3>
                    <input type="text" placeholder='Enter height' name = "height" value={input.height}  onChange = {handleChange} required/>
                </div>
           </div>
           </form>
           <button onClick={calculatebmi}>Calculate BMI</button>
           <div className='result-list'>
                <h2>{input.result}</h2>
                <h2>{input.message}</h2>
           </div>

            

            <div className='display'>
                <ul>
                    {
                        fresult.map((item,index)=>{
                            return(
                                <>
                                    <div key={index} className="list">
                                        <h2>Bmi is : {item.result}</h2>
                                        <h2 className='second-h2'>Message : {item.message}</h2>
                                        <div className='list-item' key={index}>
                                            <p>Weight is : {item.weight}</p>
                                            <p>Height is : {item.height}</p>
                                            <p>Date is : {new Date().toLocaleDateString()}</p>
                                        </div> 
                                        <CancelIcon className='cross-icon' onClick={()=>crossBtn(index)}/>
                                    </div>
                                </>
                                
                            )
                        })
                    }
                </ul>
            </div>

           
           
           



           
        </>
    )
}

export default BMI;