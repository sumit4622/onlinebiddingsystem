import "../../../styles/Landing/Userprofile/Upload.css"
import { useState } from "react";

export default function UploadItems() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        minimumBid: ''
    });

    const [uploadedImage, setUploadedImage] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUploadedImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <div className="upload-container">
            {/* Header Section */}
            {/* <div className="upload-header">
                <h2 className="upload-title">Your work Description</h2>
                <p className="upload-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fugiaut nisl turpis leo sed
                    in commodo purus velit. Massa ut dictumst praesent lacus, libero. Non placerat
                    dictumst lacinia nisl at suscipit id porttitor purus. Magna diam purus egestas vel.
                </p>
                <button className="add-attachment-btn">Add attachment</button>
            </div> */}

            {/* Upload Form */}
            <div className="upload-form">
                {/* Main Photo Section */}
                <div className="photo-section">
                    <label className="photo-label">Main Photo</label>
                    <div className="photo-upload-area">
                        {uploadedImage ? (
                            <img src={uploadedImage} alt="Uploaded" className="uploaded-image" />
                        ) : (
                            <div className="photo-placeholder">
                                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
                                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                    <circle cx="12" cy="13" r="4" />
                                </svg>
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="photo-input"
                            id="photo-upload"
                        />
                        <label htmlFor="photo-upload" className="photo-upload-label">
                            Click to upload image
                        </label>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="form-fields">
                    {/* Title Field */}
                    <div className="form-group">
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Title"
                            className="form-input title-input"
                        />
                    </div>

                    {/* Description Field */}
                    <div className="form-group">
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Story / Description"
                            rows="4"
                            className="form-input description-input"
                        />
                    </div>

                    {/* Date and Bid Fields Row */}
                    <div className="form-row">
                        <div className="form-group flex-1">
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleInputChange}
                                placeholder="Start Bid Date m/d/y"
                                className="form-input"
                            />
                        </div>
                        <div className="form-group flex-1">
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleInputChange}
                                placeholder="End Bid Date m/d/y"
                                className="form-input"
                            />
                        </div>
                        <div className="form-group flex-1">
                            <input
                                type="text"
                                name="minimumBid"
                                value={formData.minimumBid}
                                onChange={handleInputChange}
                                placeholder="minimum Bid amount Rs 400"
                                className="form-input"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="submit-section">
                        <button type="submit" className="submit-btn">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}