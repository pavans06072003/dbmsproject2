import React, { useState, useEffect } from 'react';
import Result from "../Result/Result";
import { Button, Table } from 'react-bootstrap';
import { Navbar } from '../TopNavigationTab/navbar';
import ReactCountdownClock from "react-countdown-clock";
import { useLocation } from 'react-router-dom';

const RESULTS = 2;
const QUE = 1;

const Que = (props) => {
  const location = useLocation();
  const eid1 = new URLSearchParams(location.search).get('eid');
  const branch_id1 = new URLSearchParams(location.search).get('branch_id');
  const eid = encodeURIComponent(eid1);
  const branch_id = encodeURIComponent(branch_id1);
  let  ans=[];
  const [answer,setAnswer]=useState([]);
  const [selectedAns, setSelectedAns] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [initial, setInitial] = useState(false);
  const [pageStatus, setPageStatus] = useState(QUE);
  const [questionArray, setQuestionArray] = useState([]);
  const [indexQidMap, setIndexQidMap] = useState({});
  const [qidIndexMap, setQidIndexMap] = useState({});
  const [max, setMax] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const largerFontStyle = { fontSize: '20px' };
  const [questions,setquestion]=useState([]);
let data;
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const url={eid,branch_id};
        const response = await fetch("/api/question", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(url)
          });
          const result = await response.json();
         data=result[0];
         setquestion(data);
        const questionArray = [];
        const indexQidMap = {};
        const qidIndexMap = {};
        const max = data.length;

        data.forEach((question, index) => {
          indexQidMap[index] = question.Qid;
          qidIndexMap[question.Qid] = index + 1;
          questionArray[index] = [
            <tr key={`q${index}`} style={largerFontStyle}>
              <td>Que {index + 1}:</td>
              <td>{question.Que}</td>
            </tr>,
            <tr key={`a${index}`} style={largerFontStyle}>
              <td>a.</td>
              <td><input type="radio" name="comp" onChange={handleRadio} value="a" /> {question.Op1}</td>
            </tr>,
            <tr key={`b${index}`} style={largerFontStyle}>
              <td>b.</td>
              <td><input type="radio" name="comp" onChange={handleRadio} value="b" /> {question.Op2}</td>
            </tr>,
            <tr key={`c${index}`} style={largerFontStyle}>
              <td>c.</td>
              <td><input type="radio" name="comp" onChange={handleRadio} value="c" /> {question.Op3} </td>
            </tr>,
            <tr key={`d${index}`} style={largerFontStyle}>
              <td>d.</td>
              <td><input type="radio" name="comp" onChange={handleRadio} value="d" /> {question.Op4}</td>
            </tr>
          ];
        });

        setQuestionArray(questionArray);
        setIndexQidMap(indexQidMap);
        setQidIndexMap(qidIndexMap);
        setMax(max);
        setInitial(true);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [eid]);

  const handleRadio = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleEnd = () => {
    setPageStatus(RESULTS);
  };

  const handleNext = () => {
    const qid = indexQidMap[selectedIndex];
    console.log(selectedOption);
    ans.push(selectedOption);
    // const updatedSelectedAns = { ...selectedAns, selectedOption };

    // setSelectedAns(updatedSelectedAns);
    setSelectedIndex(selectedIndex + 1);


    setSelectedAns((prevSelectedOptions) => ({
      ...prevSelectedOptions,
       selectedOption,
    }));
    setAnswer((answer) => [...answer,selectedOption]);

  };

  if (initial && pageStatus === QUE) {
    if (max > selectedIndex) {
      return (
        <>
        <Navbar/>
        <br></br>
        <br></br>
        <br></br>
          <ReactCountdownClock
            seconds={120}
            color="#000"
            alpha={0.9}
            size={100}
            onComplete={handleEnd}
          />
          <center>
            <table>
              <tbody>
                {questionArray[selectedIndex]}
              </tbody>
            </table>
            <Button variant="success" onClick={handleNext} value="Next">Next</Button>
          </center>
        </>
      );
    } else {
      return (
        <center>
          <Navbar />
          <br></br>
          <br></br>
          <br></br>
         <div style={{fontSize:"50px",marginTop:"100px"}}>
         TEST ENDED!!<br></br>
          <Button variant="danger" onClick={handleEnd} value="Submit">GO TO RESULTS</Button>
         </div>
        </center>
      );
    }
  } else if (pageStatus === RESULTS) {
    const data1 = { answer,questions };
    return <Result data={data1} />;
  } else {
    return <></>;
  }
};

export default Que;
