import React, { useState, useEffect, useRef } from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import ImageGallery from 'react-image-gallery';


const DesktopPopup = ({ showVideoId, showVideoIdChange, WordIndividualFound }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [WordIndividualFoundFiltered, setWordIndividualFoundFiltered] = useState(false);
    const _renderVideo = (item) => { 
        if(!item) return null;
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
        setIsOpen(showVideoId);
        if(showVideoId){
            let wif = WordIndividualFound.filter((e) => e.thumbnail !== showVideoId.thumbnail).slice(0, 3)
            wif.unshift(showVideoId)
            setWordIndividualFoundFiltered(wif)
        }
    }, [showVideoId]); 


  
    return (
      <>
        {isOpen && (
            <Dialog
            open={true}
            onClose={() => showVideoIdChange()}
            // className={classes.dialog}
            PaperProps={{ style: { borderRadius: 0 } }}
          >
            <DialogContent>
              <ImageGallery showNav={false} lazyLoad={true} showFullscreenButton={false} showPlayButton={false}  items={WordIndividualFoundFiltered} renderItem={_renderVideo}/>
            </DialogContent>
          </Dialog>
        )}
      </>
    );
  };
  
  export default DesktopPopup;