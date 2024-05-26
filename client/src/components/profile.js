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
            <table className="student-profile-table" style={{ marginTop: '100px',marginLeft:"150px", fontSize: '40px' }}>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <td>{profileData.Name}</td>
                    </tr>
                    <tr>
                        <th>College</th>
                        <td>{profileData.College}</td>
                    </tr>
                    <tr>
                        <th>Branch</th>
                        <td>{profileData.Branch}</td>
                    </tr>
                    <tr>
                        <th>Year</th>
                        <td>{profileData.Year}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{profileData.Email}</td>
                    </tr>
                    <tr>
                        <th>Gender</th>
                        <td>{profileData.Gender}</td>
                    </tr>
                    <tr>
                        <th>Date of Birth  </th>
                        <td>{new Date(profileData.DOB).toLocaleDateString()}</td>
                    </tr>
                </tbody>
            </table>

        </>
    )
}
