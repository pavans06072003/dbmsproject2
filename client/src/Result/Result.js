import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import Course from '../Course_selection/Course_selection';
import { Navbar } from '../TopNavigationTab/navbar';
import { useNavigate } from 'react-router-dom';

const course = 2;

const Result = (props) => {
  const his=useNavigate();
  const [resultArray, setResultArray] = useState([]);
  const [maxScore, setMaxScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [initial, setInitial] = useState(false);
  const [pageStatus, setPageStatus] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      let req = { ans:props.data.answer,que:props.data.questions };
      try {
        let response = await fetch('/api/result', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(req),
        });

        let data = await response.json();
        console.log(data);
        let results = [];
        let totalScore = 0;
        let maxScore = 0;
        let ind=1;
        data.forEach((item, index) => {
          let resultRow = [];
          maxScore += 4;
          resultRow.push(<td key={`q${index}`}>{ind++}</td>);
          resultRow.push(<td key={`sel${index}`}>{item.selectedOption}</td>);
          resultRow.push(<td key={`cor${index}`}>{item.correct_answer}</td>);

          if (item.selectedOption === item.correct_answer) {
            resultRow.push(<td key={`mark${index}`}>4</td>);
            totalScore += 4;
          } else {
            resultRow.push(<td key={`mark${index}`}>0</td>);
          }

          results.push(<tr key={`row${index}`}>{resultRow}</tr>);
        });

        setResultArray(results);
        setMaxScore(maxScore);
        setTotalScore(totalScore);
        setInitial(true);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, [props.data.answer]);

  const handleHome = (event) => {
    his('/main');
  };

  if (!initial) return <></>;

  if (pageStatus === course) return <Course />;

  return (
    <>
      <Navbar />
      <br></br><br></br><br></br>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>QUESTION</th>
            <th>SELECTED OPTION</th>
            <th>CORRECT OPTION</th>
            <th>MARKS OBTAINED</th>
          </tr>
        </thead>
        <tbody>{resultArray}</tbody>
      </Table>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>MAX SCORE</th>
            <th>OBTAINED</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{maxScore}</td>
            <td>{totalScore}</td>
          </tr>
        </tbody>
      </Table>
      <center>
        <Button variant="success" value={course} onClick={handleHome}>
          GO TO HOME
        </Button>
      </center>
    </>
  );
};

export default Result;
