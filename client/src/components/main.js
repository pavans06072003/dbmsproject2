import React, { useContext, useEffect, useState } from 'react'
import { Navbar } from '../TopNavigationTab/navbar'
import { LoginContext } from './context';

export const Main = () => {
    // const { logindata, setLogindata } = useContext(LoginContext);
    // console.log(logindata.result.data[0][0].BranchId);
    // const branch_id = logindata.result.data[0][0].BranchId;
    // const [exams, setexams] = useState({});
    // const examdetails = async () => {
    //     const res = await fetch(`/api/getexams/${branch_id}`, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //         }
    //     });
    //     let data = await res.json();
    //     console.log(data[0][0]);
    //     setexams(data[0]);
    // }
    // useEffect(() => {
    //     examdetails()
    // }, []);
    return (
        <>
            <Navbar />
            <br></br>
            <br></br>
            <br></br>
            {/* {
                <>
                <div style={{marginLeft:"450px",marginTop:"150px"}}>

                </div>
                exams.map((element)=>{
                     <div style={{ marginLeft: "450px" }}>
                     <div class="card w-75">
                         <div class="card-body">
                             <h5 class="card-title"></h5>
                             <span>Total Questions: {}</span> <span style={{marginLeft:"200px"}}>Total Time: {}</span>  <span  style={{marginLeft:"200px"}}>Date: {}</span>
                             <br></br>
                             <a href="#" class="btn btn-primary">Take test</a>
                         </div>
                     </div>
                 </div>
                })
                </>

            } */}
        </>
    )
}
