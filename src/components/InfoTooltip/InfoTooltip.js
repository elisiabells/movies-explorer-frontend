import React from 'react';
import successfully from '../../images/successfully.png'

export default function InfoTooltip({ isOpen, onClose, message }) {
   const contentRef = React.useRef();
 
   const handleOverlayClick = (event) => {
     if (contentRef.current && !contentRef.current.contains(event.target)) {
       onClose();
     }
   };
 
   return (
     <div className={`info-tooltip ${isOpen ? 'info-tooltip_opened' : ''}`} onClick={handleOverlayClick}>
       <div ref={contentRef} className='info-tooltip__content'>
         <img src={successfully} alt="Успешно" className='info-tooltip__image'/>
         <p className='info-tooltip__message'>{message}</p>
         <button onClick={onClose} className='info-tooltip__close-button'>
         </button>
       </div>
     </div>
   );
 }
