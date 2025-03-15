import React from 'react'
import imgImage from "../../assets/imgImage.gif";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export const getDescription = () => ({
    text: "Explore a high-resolution image that captures intricate details with remarkable clarity. This page presents visually stunning content, allowing you to appreciate the beauty and depth of imagery. Whether for artistic inspiration or informational purposes, this image showcases the power of visual storytelling in a dynamic and engaging manner.",
    image: imgImage
})
export const Picture_and_text = () => {
    return (
        <div className='container bg-dark-gray rounded p-3 mt-5'>
            <h2><span><Link to="/preview"> <FontAwesomeIcon icon={faArrowLeft} /></Link></span> Picture and Text</h2>
            <div className='hover-prev-child-description'>
                <div className='row p-3 justify-content-center'>
                    <div className='col-md-5 bg-warning p-3'>
                        <h2>Text Info</h2>
                        {getDescription().text}
                    </div>
                    <div className='col-md-5 bg-darkBlue' >
                        <img src={imgImage} style={{ height: '100%', width: '100%' }} />
                    </div>
                </div>
            </div>
        </div>
    )
}
