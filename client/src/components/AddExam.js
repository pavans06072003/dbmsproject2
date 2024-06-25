import React ,{useState}from 'react'
import { Navbar } from '../TopNavigationTab/navbar'
import { useNavigate } from 'react-router-dom';

export const AddExam = () => {
    const his=useNavigate();

    const [formData, setFormData] = useState({
        eid: '',
        title: '',
        right: '',
        wrong: '',
        total: '',
        time: '',
        scheduled_date: '',
        branch_id: ''
      });
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };

      const handlesubmit=async()=>{
        const {eid ,title,right, wrong,total,time,scheduled_date,branch_id , scheduled_time}=formData;
        const data={eid ,title,right, wrong,total,time,scheduled_date,branch_id , scheduled_time}
        console.log(data);
        const response = await fetch("/api/addexam", {
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
            alert ("exam added successfully");
            his(`/addque?eid=${eid}&&branch_id=${branch_id}&&total=${total}`);
          } else {
            throw new Error("Invalid user");
          }
        console.log(formData);
      }
    return (
   <>
            <Navbar />
            <br></br>
            <br></br>
            <br></br>
            <div class="row">
                <span class="title1" style={{marginLeft:"40%",fontSize:'30px'}}><b>Enter Exam Details</b></span><br /><br />
                <div class="col-md-3"></div><div class="col-md-6" style={{marginLeft:"400px"}}> 
                    <fieldset>


                        <div class="form-group">
                            <label class="col-md-12 control-label" for="name"></label>
                            <div class="col-md-12">
                                <input id="title" name="title" placeholder="Enter Exam title" class="form-control input-md" type="text" value={formData.title} onChange={handleChange}/>

                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-12 control-label" for="name"></label>
                            <div class="col-md-12">
                                <input id="eid" name="eid" placeholder="Enter Exam ID" class="form-control input-md" type="text" value={formData.eid} onChange={handleChange}/>

                            </div>
                        </div>
 
                        <div class="form-group">
                            <label class="col-md-12 control-label" for="wrong"></label>
                            <div class="col-md-12">
                                <input id="branch_id" name="branch_id" placeholder="Enter the branch id" class="form-control input-md" min="0" value={formData.branch_id} onChange={handleChange} type="number"/>

                            </div>
                        </div>


                        <div class="form-group">
                            <label class="col-md-12 control-label" for="total"></label>
                            <div class="col-md-12">
                                <input id="total" name="total" placeholder="Enter total number of questions" class="form-control input-md" value={formData.total} onChange={handleChange} type="number"/>

                            </div>
                        </div>

                     
                        <div class="form-group">
                            <label class="col-md-12 control-label" for="right"></label>
                            <div class="col-md-12">
                                <input id="right" name="right" placeholder="Enter marks on right answer" class="form-control input-md" value={formData.right} onChange={handleChange} min="0" type="number"/>

                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-12 control-label" for="wrong"></label>
                            <div class="col-md-12">
                                <input id="wrong" name="wrong" placeholder="Enter minus marks on wrong answer without sign" value={formData.wrong} onChange={handleChange} class="form-control input-md" min="0" type="number"/>

                            </div>
                        </div>

                       
                        <div class="form-group">
                            <label class="col-md-12 control-label" for="time"></label>
                            <div class="col-md-12">
                                <input id="time" name="time" placeholder="Enter time limit for test in seconds" value={formData.time} onChange={handleChange} class="form-control input-md" min="1" type="number"/>

                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-12 control-label" for="time">Enter the date of the exam</label>
                            <div class="col-md-12">
                                <input id="scheduled_date" name="scheduled_date" placeholder="Enter the date of the exam" value={formData.scheduled_date} onChange={handleChange} class="form-control input-md" min="1" type="date"/>

                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-12 control-label" for="time">Enter the time of the exam</label>
                            <div class="col-md-12">
                                <input id="tischeduled_time" name="scheduled_time" placeholder="Enter the time of the exam" value={formData.scheduled_time} onChange={handleChange} class="form-control input-md" min="1" type="time"/>

                            </div>
                        </div>


                        <div class="form-group">
                            <label class="col-md-12 control-label" for=""></label>
                            <div class="col-md-12">
                                <input type="submit"  class="btn btn-primary" value="Submit"   onClick={handlesubmit}/>
                            </div>
                        </div>

                    </fieldset>
            </div>
            </div>
            </>
            )
}
