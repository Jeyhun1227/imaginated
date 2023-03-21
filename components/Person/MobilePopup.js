import React, { useState, useEffect, useRef } from "react";
import OutsideClickHandler from 'react-outside-click-handler';

const MobilePopup = ({ showVideoId, showVideoIdChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragDirection, setDragDirection] = useState(null);
  const [containerFullHeight, setContainerFullHeight] = useState(false);

  const containerRef = useRef();
  const handleRef = useRef();
  const popupRef = useRef();

  const handleTouchStart = (e) => {
    setDragStart(e.touches[0].clientY);
    setDragDirection(null);
  };

  const handleTouchMove = (e) => {
    if (dragStart === null) return;

    const distance = e.touches[0].clientY - dragStart;
    if (distance > 0) {
      if (dragDirection !== 'down') setDragDirection('down');
      containerRef.current.style.transform = `translateY(${distance}px)`;
    } else if (distance < 0) {
      if (dragDirection !== 'up') setDragDirection('up');
      containerRef.current.style.height = `calc(310px + ${-distance}px)`;
      // containerRef.current.style.transform = `translateY(${distance}px)`;
    }
  };

  const handleTouchEnd = (e) => {
    if (dragStart === null) return;
    const distance = e.changedTouches[0].clientY - dragStart;
    if (dragDirection === 'down') {
      closePopup();
    } else if (distance < -50) {
      setPopupToFullHeight();
    } else {
      containerRef.current.style.transform = '';
      containerRef.current.style.height = '';
    }
    setDragStart(null);
  };

  const setPopupToFullHeight = () => {
    // containerRef.current.style.height = '100%';
    setContainerFullHeight(true)
    containerRef.current.style.transform = '';
    // popupRef.current.style.marginTop = '50%'

  };

  const closePopup = () => {
    containerRef.current.style.height = '';
    setIsOpen(false);
    setContainerFullHeight(false);
    showVideoIdChange();
  };

  const _renderVideo = (item) => {
    if (!item) return null;
    return (
<div className="video-wrapper">
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
    );
  };

  useEffect(() => {
    if (showVideoId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    setIsOpen(showVideoId);
  }, [showVideoId]);

  return (
    <>
      {isOpen && (
        <div className="individual-popup-container">
          <div
            className={`individual-popup  ${containerFullHeight ? 'height-100': ''} ${isOpen ? 'open' : ''}`}
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className={`individual-popup-handle`} ref={handleRef}></div>
            <OutsideClickHandler onOutsideClick={() => showVideoIdChange()}>
              <div className={`individual-popup-main ${containerFullHeight ? 'margin-top-50': ''}`} ref={popupRef}>
                <div className="individual-popup-inner">
                {_renderVideo(showVideoId)}
                </div>
              </div>
            </OutsideClickHandler>
          </div>
        </div>
      )}
    </>
  );
};
export default MobilePopup;