import React from 'react'
import gifImage from "../../assets/gifImage.gif";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
export const getDescription = () => ({
    text : "Enjoy a dynamic and animated GIF that adds motion to storytelling. This page features short yet expressive visual content that enhances communication through movement. GIFs are widely used to illustrate concepts, add humor, or demonstrate processes in an engaging and efficient way, making information retention easier and more enjoyable",
    image : gifImage
})
export const Gif_and_text = () => {
  return (
    <div className='container bg-dark-gray rounded p-3 mt-5'>
            <h2><span><Link to="/preview"> <FontAwesomeIcon icon={faArrowLeft} /></Link></span> Gif and Text</h2>
            <div className='hover-prev-child-description'>
                <div className='row p-3 justify-content-center'>
                    <div className='col-md-5 bg-warning p-3'>
                        <h2>Text Info</h2>
                        {getDescription().text}
                    </div>
                    <div className='col-md-5 bg-darkBlue' >
                        <img src={gifImage} style={{ height: '100%', width: '100%' }} />
                    </div>
                </div>
            </div>
        </div>
  )
}
