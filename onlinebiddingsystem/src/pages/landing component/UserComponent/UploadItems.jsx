import "../../../styles/Landing/Userprofile/Upload.css";
import { useState } from "react";
import { ACCESS_TOKEN } from "../../../constants";
import api from "../../../api";

export default function UploadItems() {
    const token = localStorage.getItem(ACCESS_TOKEN); 

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        minimum_bid: ''
    });

    const [imageFile, setImageFile] = useState(null);
    const [uploadedImagePreview, setUploadedImagePreview] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setUploadedImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = new FormData();
        dataToSend.append("title", formData.title);
        dataToSend.append("description", formData.description);
        dataToSend.append("start_date", formData.start_date);
        dataToSend.append("end_date", formData.end_date);
        dataToSend.append("minimum_bid", formData.minimum_bid);
        if (imageFile) {
            dataToSend.append("image", imageFile);
        }

        try {
            const response = await api.post("/api/items/upload/", dataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 201 || response.status === 200) {
                console.log("Upload successful", response.data);
                alert("Item uploaded successfully!");
            }
        } catch (error) {
            console.error("Upload failed:", error.response?.data || error.message);
            alert("Upload failed. Check console for details.");
        }
    };

    return (
        <div className="upload-container">
            <div className="upload-form">
                <div className="photo-section">
                    <label className="photo-label">Main Photo</label>
                    <div className="photo-upload-area">
                        {uploadedImagePreview ? (
                            <img src={uploadedImagePreview} alt="Preview" className="uploaded-image" />
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

                <div className="form-fields">
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

                    <div className="form-row">
                        <div className="form-group flex-1">
                            <input
                                type="date"
                                name="start_date"
                                value={formData.start_date}
                                onChange={handleInputChange}
                                className="form-input"
                            />
                        </div>
                        <div className="form-group flex-1">
                            <input
                                type="date"
                                name="end_date"
                                value={formData.end_date}
                                onChange={handleInputChange}
                                className="form-input"
                            />
                        </div>
                        <div className="form-group flex-1">
                            <input
                                type="text"
                                name="minimum_bid"
                                value={formData.minimum_bid}
                                onChange={handleInputChange}
                                placeholder="Minimum Bid Amount (e.g. Rs 400)"
                                className="form-input"
                            />
                        </div>
                    </div>

                    <div className="submit-section">
                        <button onClick={handleSubmit} type="submit" className="submit-btn">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
