import React from 'react';
import Rating from "../huddle-meet/Rating"
import { useState ,useRef} from 'react';

function Popup({ isOpen,onClose }) {
  // Your rating feedback form logic
  const [userRating, setUserRating] = useState(0);
  const [selectedFileName, setSelectedFileName] = useState('');

  const handleRatingChange = (newRating) => {
    setUserRating(newRating);
  };
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    // Handle the file change event if needed
    const selectedFile = e.target.files[0];
    setSelectedFileName(selectedFile ? selectedFile.name : '');
    console.log('Selected File:', selectedFile);
  };

  const handleButtonClick = () => {
    // Trigger the file input click when the button is clicked
    fileInputRef.current.click();
  };

  return (
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content" style={{background:"gray"}}>
      <div class="modal-header" style={{alignItems:"flex-start",border:"none"}}>
        <Rating onRatingChange={handleRatingChange} />
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style={{color:"red"}}></button>
      </div>
      <div class="modal-body">
      <div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <button onClick={handleButtonClick} style={{background:"white",border:"none",borderRadius:"5px",padding:"5px 10px"}}>
        <span role="img" aria-label="Download Icon">
          📥
        </span>
        <span style={{fontSize:"15px",letterSpacing:"1px"}}>{selectedFileName ||" Download Transcript"}</span>
      </button>
    </div>
      </div>
      <div class="modal-footer" style={{border:"none"}}>
        {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
        {/* <button type="button" class="btn btn-primary">Save changes</button> */}
      </div>
    </div>
  </div>
</div>
  );
};

export default Popup;
