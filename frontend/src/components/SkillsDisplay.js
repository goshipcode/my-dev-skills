import React, {useEffect, useState} from "react";
import {
    MDBContainer,
    MDBTypography,
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBRow,
    MDBCol,MDBBtn,MDBNavbar,MDBIcon,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBModal,
    MDBInput
} from 'mdb-react-ui-kit';
import CONFIG from '../configuration'

function SkillsDisplay({signOut, user}) {

    const [uniqueUrlPath, setUniqueUrlPath] = useState("");
    const [skillList, setSkillList] = useState([]);
    const [skillName, setSkillName] = useState("");
    const [rating, setRating] = useState("");
    const [description, setDescription] = useState("");
    const [centredModal, setCentredModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [indexInEditMode, setIndexInEditMode] = useState("");


    useEffect(() => {
        const url = CONFIG.BACKEND_HOST + '/skills/' + user.attributes.email;

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();

                console.log("json resp", json);


                setUniqueUrlPath(json.uniqueUrlPath);
                setSkillList(json.skillList);
            } catch (error) {
                console.log("error", error);
                setUniqueUrlPath(crypto.randomUUID());
            }
        };

        fetchData();
    }, []);

    const newSkillsClicked = () => {
        //console.log("new skills clicked");
        setCentredModal(!centredModal);
        setSkillName('');
        setDescription('');
        setRating('');
        setIsEditMode(false);
    };

    const saveNewSkillClicked = () => {
        //console.log("new skills clicked");
        //create a new object to be added to the skills array
        //then send it off to the backend for saving
        if (isEditMode === true) {
            let newArray = [...skillList];
            let updatedSkill = {skillName:skillName, rating:rating, description:description};
            newArray[indexInEditMode] = updatedSkill;
            updateArrayInBackendAndState(newArray);
            setCentredModal(!centredModal);
            setIsEditMode(false);
        } else { //new skill
            let newSkill = {skillName:skillName, rating:rating, description:description};
            let newArray = [...skillList];
            newArray.push(newSkill);
            updateArrayInBackendAndState(newArray);
            setCentredModal(!centredModal);
        }
    };

    const handleSetRatingChanged = (event) => {
        const myValue = event.target.value;
        setRating(myValue);
    };

    const handleDescriptionChange = (event) => {
        const myValue = event.target.value;
        setDescription(myValue);
    };

    const handleSkillNameChange = (event) => {
        const myValue = event.target.value;
        setSkillName(myValue);
    };

    const deleteSkillClicked = (index) => {
        let newArray = [...skillList];
        newArray.splice(index, 1);
        updateArrayInBackendAndState(newArray);
    };

    const editSkillsClicked = (index) => {
        //console.log("edit skills clicked index",index);
        setCentredModal(!centredModal);
        setSkillName(skillList[index].skillName);
        setDescription(skillList[index].description);
        setRating(skillList[index].rating);
        setIndexInEditMode(index);
        setIsEditMode(true);
    }

    function updateArrayInBackendAndState(newArray) {

        let postPayload = {userId:user.attributes.email,uniqueUrlPath:uniqueUrlPath,skillList:newArray};

        fetch(CONFIG.BACKEND_HOST+ '/skills', {
            method: 'POST',
            body: JSON.stringify(postPayload),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then(
                (result) => {
                    setSkillList(newArray);
                },
                (error) => {
                    console.log("error", error)
                    //todo: alert, or retry, or route to error page
                }
            )
    }
    return (
        <>
            <MDBNavbar light bgColor='light'>
                <MDBContainer tag="form" fluid className='justify-content-start'>
                    <MDBBtn onClick={signOut} outline color="danger" size="sm" type='button' >
                        Logout
                    </MDBBtn>
                </MDBContainer>
            </MDBNavbar>
            <MDBContainer breakpoint="sm">
                <MDBTypography tag='div' className='display-1 pb-3 mb-3 border-bottom text-center'>
                    My Dev Skills
                </MDBTypography>
                <MDBTypography listUnStyled className='mb-0 border-bottom '>
                    Welcome, {user.attributes.email}!
                    <br/>
                    <br/>


                </MDBTypography>
                <br/>

                <MDBRow>
                    <MDBCol size='md'>
                        <MDBBtn onClick={newSkillsClicked}>
                            + Add A New Skill
                        </MDBBtn>
                    </MDBCol>
                    <MDBCol size='md'>
                        {skillList.length > 0 &&
                            <p>
                        <MDBIcon icon="desktop" className='me-2 text-success' />Your public skills page is available here:  <a href={CONFIG.FRONTEND_HOST+"/myskills/"+uniqueUrlPath} target="_blank">{CONFIG.FRONTEND_HOST+"/myskills/"+uniqueUrlPath}</a>
                            </p>
                        }
                    </MDBCol>
                </MDBRow>
                <br/>
                <br/><br/>

                <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
                    {skillList.map((skill,i) => (
                        <MDBCol key={i}>
                            <MDBCard background='light' className='h-100'>
                                <MDBCardHeader><MDBCardTitle>{skill.skillName}</MDBCardTitle></MDBCardHeader>
                                <MDBCardBody>
                                    <MDBCardTitle>rating: {skill.rating}</MDBCardTitle>
                                    <MDBCardText>
                                        description: {skill.description}
                                    </MDBCardText>
                                    <MDBBtn onClick={() => editSkillsClicked(i)} className='me-1' color='warning'>
                                        <MDBIcon fas icon="edit" />
                                    </MDBBtn>
                                    <MDBBtn onClick={() => deleteSkillClicked(i)} className='me-1' color='danger'>
                                        X
                                    </MDBBtn>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    ))}
                </MDBRow>
                <MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}>
                    <MDBModalDialog centered>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>Add New Goal</MDBModalTitle>
                                <MDBBtn className='btn-close' color='none' onClick={newSkillsClicked}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>
                                <b>Skill Name:</b>
                                <MDBInput type='text' value={skillName} onChange={handleSkillNameChange}></MDBInput>
                                <br />
                                <b>Rating 1-10 (10 being expert):</b>
                                <MDBInput type='text' value={rating} onChange={handleSetRatingChanged}></MDBInput>
                                <br />
                                <b>Describe your experience:</b>
                                <MDBInput type='text' value={description} onChange={handleDescriptionChange}></MDBInput>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color='secondary' onClick={newSkillsClicked}>
                                    Close
                                </MDBBtn>
                                <MDBBtn color='success' onClick={saveNewSkillClicked} >Save changes</MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
            </MDBContainer>
        </>
    );
}

export default SkillsDisplay;