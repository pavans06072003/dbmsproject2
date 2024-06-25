import React, { useEffect, useContext, useState } from 'react'
import { LoginContext } from './context';
import { Navbar } from '../TopNavigationTab/navbar';




export const Profile = () => {
    const { logindata, setLoginData } = useContext(LoginContext);
    console.log(logindata);
    const user = logindata.data.user;
    console.log(user);
    const [profileData, setprofiledata] = useState([]);
    console.log(logindata);
    const fetchstuddata = async () => {
        const res = await fetch(`/api/getprofile/${user}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        let data = await res.json();
        setprofiledata(data[0][0]);
    }
    useEffect(() => {
        fetchstuddata()
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    return (
        <>
            <Navbar />
            <br></br>
            <br></br>
            <br></br>
            <table className="student-profile-table"
             style={{
                marginTop: '100px',
                marginLeft: '150px',
                fontSize: '40px',
                border: '2px solid black',
                borderRadius: '10px',
                backgroundColor: '#f0f0f0',
                padding: '20px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                color: 'black'
                
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.backgroundColor = '#e0e0e0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.backgroundColor = '#f0f0f0';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
              }}>
            
            
            
            
            
            
            
            
                <tbody>
                    <tr>
                        <th>Name:</th>
                        <td>{profileData.Name}</td>
                    </tr>
                    <tr>
                        <th>College:</th>
                        <td>{profileData.College}</td>
                    </tr>
                    <tr>
                        <th>Branch:</th>
                        <td>{profileData.Branch}</td>
                    </tr>
                    <tr>
                        <th>Year:</th>
                        <td>{profileData.Year}</td>
                    </tr>
                    <tr>
                        <th>Email:</th>
                        <td>{profileData.Email}</td>
                    </tr>
                    <tr>
                        <th>Gender:</th>
                        <td>{profileData.Gender}</td>
                    </tr>
                    <tr>
                        <th>Date of Birth:  </th>
                        <td>{new Date(profileData.DOB).toLocaleDateString()}</td>
                    </tr>
                </tbody>
            </table>

        </>
    )
}
