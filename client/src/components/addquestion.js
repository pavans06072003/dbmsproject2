import React ,{useState}from 'react'
import { Navbar } from '../TopNavigationTab/navbar'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export const Addquestion = () => {
    const location = useLocation();
    const his=useNavigate();
    const eid1 = new URLSearchParams(location.search).get('eid');
    const branch_id1 = new URLSearchParams(location.search).get('branch_id');
    const total1 = new URLSearchParams(location.search).get('total');
    const eid = encodeURIComponent(eid1);
    const branch_id = encodeURIComponent(branch_id1);
    const total = encodeURIComponent(total1);
    console.log(eid, branch_id);


    const [iterationCount, setIterationCount] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');

    const handleInputChange = (e, index) => {
        const newOptions = [...options];
        newOptions[index] = e.target.value;
        setOptions(newOptions);
    };

    const handleCorrectAnswerChange = (e) => {
        setCorrectAnswer(e.target.value);
    };

    const handleNext = () => {
        if (iterationCount < 5) {
            setQuestions([...questions, { question: currentQuestion, options, correctAnswer }]);
            setIterationCount(iterationCount + 1);
            setCurrentQuestion('');
            setOptions(['', '', '', '']);
            setCorrectAnswer('');
        }
    };
    const handleSubmit=async()=>{
        const data={questions,eid,branch_id};
        const response = await fetch("/api/addque", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          });
          const result = await response.json();
          console.log(result)
          if (result) {
            console.log("client==>", result);
            alert ("question added successfully");
            his(`/main`);
          } else {
            throw new Error("Invalid user");
          }
    };
    return (
        <>
            <Navbar />
            <br></br>
            <br></br>
            <br></br>
            {<div>
               <center><h1>Enter the questions</h1></center> 
                {iterationCount < total ? (
                    <div style={{marginLeft:"400px",fontSize:"22px"}}>
                        <h3>Question Number: {iterationCount + 1}</h3>
                        <div style={{marginTop:"25px"}}> 
                            <h5>Question:</h5>
                            <textarea  style={{marginLeft:"100px"}}
                                type="textarea"
                                value={currentQuestion} rows={5} cols={50}
                                onChange={(e) => setCurrentQuestion(e.target.value)}
                            />
                        </div>
                        <div>
                            {options.map((option, index) => (
                                <div key={index} style={{marginTop:"25px"}}>
                                    <label>{`Option ${index + 1}:`}</label>
                                    <input
                                        type="text"
                                        value={option}
                                        onChange={(e) => handleInputChange(e, index)}
                                    />
                                </div>
                            ))}
                        </div>
                        <div style={{marginTop:"25px"}}>
                            <label>Correct Answer:</label>
                            <input
                                type="text"
                                placeholder='a/b/c/d'
                                value={correctAnswer}
                                onChange={handleCorrectAnswerChange}
                            />
                        </div>
                        <button onClick={handleNext} style={{marginTop:"25px"}}>Next</button>
                    </div>
                ) : (
                    <><center><p style={{fontSize:"45px"}}>Done with Entering the questions!!!</p>
                    <button onClick={handleSubmit}>make into Database</button></center></>
                )}
            </div>
            }
        </>
    )
}
