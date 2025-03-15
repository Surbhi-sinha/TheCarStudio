import React from 'react'
import pdfImage from "../../assets/pdfImage.gif";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

export const getDescription = () => ({
    text : "Access an interactive PDF document containing well-structured information in a professional format. This page allows you to explore detailed content, formatted for easy readability and reference. PDFs are versatile for presentations, reports, or guides, providing a seamless way to distribute and consume information in a universally accessible format.",
    image : pdfImage
})
export const Pdf_and_text = () => {
  return (
    <div className='container bg-dark-gray rounded p-3 mt-5'>
            <h2><span><Link to="/preview"> <FontAwesomeIcon icon={faArrowLeft} /></Link></span> Pdf and Text</h2>
            <div className='hover-prev-child-description'>
                <div className='row p-3 justify-content-center'>
                    <div className='col-md-5 bg-warning p-3'>
                        <h2>Text Info</h2>
                        {getDescription().text}
                    </div>
                    <div className='col-md-5 bg-darkBlue' >
                        <img src={pdfImage} style={{ height: '100%', width: '100%' }} />
                    </div>
                </div>
            </div>
        </div>
  )
}

