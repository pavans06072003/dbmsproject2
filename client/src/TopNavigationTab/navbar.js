import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import { LoginContext } from '../components/context';
import { useNavigate } from 'react-router-dom';


export const Navbar = () => {
    const history = useNavigate();
    const [query, setQuery] = useState('');
    const {logindata, setLoginData} = useContext(LoginContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    console.log(logindata.role )


    return (
        < nav className="navbar navbar-expand-lg navbar-light bg__navbar fixed-top" >
            <div className="container-fluid">
                <h2>Online Examination System</h2>

                <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ marginLeft: "40px" }}>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {logindata.role == 'examiner' ? <li className="nav-item" style={{ marginLeft: "30px" }}><Link to='/addexam' style={{ color: "black", fontSize: "20px" }}>Add Exam</Link></li>
                            :<><li className="nav-item" style={{marginLeft:"20px"}}><Link to='/main' style={{color:"black",fontSize:"20px"}}>HOME</Link></li>
                        <li className="nav-item" style={{marginLeft:"30px"}}><Link to='/profile' style={{color:"black",fontSize:"20px"}}>Profile</Link></li>
                        <li className="nav-item" style={{marginLeft:"30px"}}><Link to='/show' style={{color:"black",fontSize:"20px"}}>Exam List</Link></li></> }



                    </ul>

                    {/* <div className='avtar'>

                        {
                            logindata ? <Avatar style={{ background: "grey", fontWeight: "bold", textTransform: "capitalize" }} onClick={handleClick} >{logindata.name[0].toUpperCase()}</Avatar> :
                                <Avatar style={{ background: "blue" }} onClick={handleClick} />
                        }
                    </div> */}

                </div>
                <button style={{ border: "none", borderRadius: "5px" }} onClick={() => history('/')}>LogOut</button>
            </div>
        </nav >
    )


}