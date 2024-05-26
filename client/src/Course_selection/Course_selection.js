import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Que from "../Que/Que";
import Login from "../Login/Login";
import { Navbar } from '../TopNavigationTab/navbar';
import Badge from 'react-bootstrap/Badge';

const QUE = 2;
const COURSE = 1;
const LOGIN = 3;

const Course = () => {
  const [pageStatus, setPageStatus] = useState(COURSE);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/course", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data1 = await response.json();

        const data=data1[0];
        console.log(data);
        const branchButtons = data.map(branch => (
          <React.Fragment key={branch.BranchId}>
            <Button variant="outline-secondary" value={branch.BranchId} onClick={handleCourse}>
              {branch.BranchName}
            </Button>{' '}
          </React.Fragment>
        ));
        setBranches(branchButtons);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleCourse = event => {
    const branchId = parseInt(event.target.value);
    setSelectedBranch(branchId);
    setPageStatus(QUE);
  };

  const handleLogout = event => {
    setPageStatus(parseInt(event.target.value));
  };

  if (pageStatus === COURSE) {
    return (
      <>
        <Navbar />
        <br></br>
        <br></br>
        <br></br>
        <center>
          <h2>
            <Badge variant="info">Choose Your Branch</Badge>
          </h2>
          {branches}
          <br />
          <br />
          <br />
        </center>
      </>
    );
  } else if (pageStatus === QUE) {
    const data = { selectedBranch };
    return <Que data={data} />;
  } else if (pageStatus === LOGIN) {
    return <Login />;
  } else {
    return <>Select Branch</>;
  }
};

export default Course;
