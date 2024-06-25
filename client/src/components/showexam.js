import React, { useContext, useEffect, useState } from 'react'
import { Navbar } from '../TopNavigationTab/navbar'
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from './context';

export const Showexam = () => {
    const his=useNavigate();
    const { logindata, setLogindata } = useContext(LoginContext);
    console.log(logindata.result.data[0][0].BranchId);
    const branch_id = logindata.result.data[0][0].BranchId;
    const [exams, setexams] = useState([]);
    const examdetails = async () => {
        const res = await fetch(`/api/getexams/${branch_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        let data = await res.json();
        setexams(data[0]);
    }
    useEffect(() => {
        examdetails()
    }, []);

    const handletest=(eid)=>{
        his(`/test?eid=${eid}`);
    }
    return (
        <>
            <Navbar />
            <br></br>
            <br></br>
            <br></br>
                <div style={{marginLeft:"450px",marginTop:"150px"}}>

                </div>
                {
                  exams.map((exam, index)=>{
                    return (
                     <>
                     <div style={{ marginLeft: "450px",marginTop:"75px" }}>
                     <div class="card w-75">
                         <div class="card-body">
                             <h5 class="card-title">Title: {exam.title}</h5>
                             <span>Total Questions: {exam.total}</span> <span style={{marginLeft:"150px"}}>Total Time: {exam.time} sec</span>  <span  style={{marginLeft:"150px"}}>Scheduled Date: {new Date(exam.scheduled_date).toLocaleDateString()}</span>
                             <br></br>
                             <button class="btn btn-primary"  ><Link to={`/test?eid=${exam.eid}&&branch_id=${branch_id}`}style={{color:"black"}}>Take test</Link></button>
                         </div>
                     </div>
                 </div>
                 </>)
                })
            }
        </>
    )
}
