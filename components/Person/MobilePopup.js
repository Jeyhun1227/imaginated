import React, { useState, useEffect, useRef } from "react";
import OutsideClickHandler from 'react-outside-click-handler';
// import {BagDash} from 'react-bootstrap-icons';

const MobilePopup = ({ showVideoId, showVideoIdChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dragStart, setDragStart] = useState(null);
    const containerRef = useRef();
  
  
    const handleTouchStart = (e) => {
      setDragStart(e.touches[0].clientY);
    };
  
    const handleTouchMove = (e) => {
      if (dragStart === null) return;
      const distance = e.touches[0].clientY - dragStart;
      if (distance > 0) {
        containerRef.current.style.transform = `translateY(${distance}px)`;
      }
    };
  
    const handleTouchEnd = (e) => {
      if (dragStart === null) return;
      const distance = e.changedTouches[0].clientY - dragStart;
      if (distance > containerRef.current.offsetHeight / 2) {
        showVideoIdChange()
      } else {
        containerRef.current.style.transform = "";
      }
      setDragStart(null);
    };

    const _renderVideo = (item) => { 
        if(!item) return null;
        console.log("_renderVideo: ", item)
        return <div className="video-wrapper">
                  <div className='wp-content-youtube'>
                    <a
                      className="close-video"
                    ></a>
                    <iframe
                      width="560"
                      height="315"
                      src={item.embedUrl}
                      frameBorder="0"
                      allow="autoplay; fullscreen"
                    ></iframe>
                    </div>
                </div>
    }
    useEffect(() => {
        if (showVideoId) {
            document.body.style.overflow = "hidden";
          } else {
            document.body.style.overflow = "";
          }
          setIsOpen(showVideoId);

    }, [showVideoId]); 
  
    return (
      <>
        {isOpen && (
          <div className="individual-popup-container"
          >
            <div className={`individual-popup ${isOpen ? "open" : ""}`}
                      ref={containerRef}
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
            >
            <div className='individual-popup-handle'></div>
            <OutsideClickHandler   onOutsideClick={() => showVideoIdChange()}>
                <div className={`individual-popup`}>{_renderVideo(showVideoId)}</div>
            </OutsideClickHandler></div>
            
          </div>
        )}
      </>
    );
  };
  
  export default MobilePopup;