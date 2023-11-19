import { useState,useEffect } from 'react'
import Instance from '../Instance'

function Tests() {
const [test , setTest] = useState([])

useEffect(() => {
    fetchDataTest();
  }, []);

const fetchDataTest = async () =>{
    try {
        const result =  await Instance.get("http://localhost:5000/api/tests");
        setTest(result.data.tests);
        // console.log(result.data.tests)
      
    } catch (error) {
      console.error("-+-+-+-Erreur lors de la connexion:", error);
    }
  }



  return (
    <div>
        <h1>Tests</h1>
        {
            test.map((test,index)=>(
                <div key = {index} >
                    <p> {test.date} </p>
                    <p> {test.value} </p>
                </div>
            ))
        }
        
        
    </div>
  )
}

export default Tests ;