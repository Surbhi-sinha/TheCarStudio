import React from 'react'
import vedioImage from "../../assets/vedioImage.gif";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
export const getDescription = () => ({
    text: "Watch an engaging video that provides in-depth insights into an interesting topic. This multimedia content is designed to inform and captivate audiences, offering a seamless blend of visuals and narration. Experience an immersive way of learning and exploring new ideas through high-quality video presentations tailored for maximum impact and comprehension.",
    image: vedioImage
})
export const Video_and_text = () => {
    return (
        <div className='container bg-dark-gray rounded p-3 mt-5'>
            <h2><span><Link to="/preview"> <FontAwesomeIcon icon={faArrowLeft} /></Link></span> Video and Text</h2>
            <div className='hover-prev-child-description'>
                <div className='row p-3 justify-content-center'>
                    <div className='col-md-5 bg-warning p-3'>
                        <h2>Text Info</h2>
                        {getDescription().text}
                    </div>
                    <div className='col-md-5 bg-darkBlue' >
                        <img src={vedioImage} style={{ height: '100%', width: '100%' }} />
                    </div>
                </div>
            </div>
        </div>
    )
}
