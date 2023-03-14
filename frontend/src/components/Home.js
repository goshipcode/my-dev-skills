import {
    MDBBtn
} from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";

export function Home() {
    const navigate = useNavigate();

    const btnOnClick = () => {
        navigate('/admin');
    };

    return (
        <header>
            <div
                className='p-5 text-center bg-image'
                style={{ backgroundImage: "url(/pexels-lukas-574071.jpg)", height: '900px' }}
            >
                <div className='mask' style={{ backgroundColor: 'rgba(47,39,26,0.6)' }}>
                    <div className='d-flex justify-content-center align-items-center h-100'>
                        <div className='text-white'>
                            <h1 className='mb-3'>My Developer Skills</h1>
                            <h4 className='mb-3'>Login to create your own developer skills resume</h4>
                            <MDBBtn onClick={btnOnClick} tag="a" color="info" size="lg">
                                Login In / Register
                            </MDBBtn>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}