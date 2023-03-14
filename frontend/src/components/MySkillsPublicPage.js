import {useParams} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardText,
    MDBCardTitle,
    MDBCol,
    MDBIcon, MDBRow, MDBContainer, MDBTypography
} from "mdb-react-ui-kit";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import CONFIG from '../configuration'

export function MySkillsPublicPage() {
    //fetch skills based on public url passed in the url
    let {uniquePath} = useParams();
    const [skillList, setSkillList] = useState([]);

    useEffect(() => {
        const url = CONFIG.BACKEND_HOST+'/skills/publicurl/' + uniquePath;

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                setSkillList(json.skillList);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, []);

    //query backend to get data with the uniquePath


    //if not found then route to page not found.


    return (
        <MDBContainer breakpoint="sm">
            <MDBTypography tag='div' className='display-1 pb-3 mb-3 border-bottom text-center'>
                My Dev Skills
            </MDBTypography>
            <MDBTypography listUnStyled className='display-6 border-bottom text-center '>
                <li className='mb-1'>
                    <MDBIcon icon="laptop" className='me-2 text-success ' />Dev skills for {uniquePath}
                </li>

            </MDBTypography>
            <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
                {skillList.map((skill, i) => (
                    <MDBCol key={i}>
                        <MDBCard background='dark' className='text-white'>
                            <MDBCardHeader><MDBCardTitle>{skill.skillName}</MDBCardTitle></MDBCardHeader>
                            <MDBCardBody>
                                <MDBCardTitle>Level: {skill.rating}</MDBCardTitle>
                                <BarChart
                                    width={250}
                                    height={150}
                                    data={[ {
                                        name: 'Skill',
                                        level: parseInt(skill.rating),
                                        amt: parseInt(skill.rating),
                                    }]}
                                    stackOffset={'expand'}
                                >
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="level" fill="#8884d8" />
                                </BarChart>
                                <MDBCardText>
                                    <b>Proof: </b>{skill.description}
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                ))}
            </MDBRow>
        </MDBContainer>

    );
}