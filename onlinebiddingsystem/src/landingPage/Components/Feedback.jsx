import { useState } from 'react';
import { ThumbsUp, X } from 'lucide-react';
import { feedback } from '../../services/userServices';
import '../../styles/Landing/button/feedback.css'

export default function FeedbackButton({itemId}) {
    const [isOpen, setIsOpen] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        likes: '',
        dislikes: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFeedback = async (e) => {
        e.preventDefault();
        try {
            await feedback(itemId, formData);
            setShowThankYou(true);

            setTimeout(() => {
                setIsOpen(false);
                setShowThankYou(true);
                setFormData({ name: '', likes: '', dislikes: '' });
            }, 3000);
        } catch (error) {
            console.log(`error while sending feedback`, error)
        

    }

};

const toggleWidget = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
        setShowThankYou(false);
    }
};

return (
    <>
        {isOpen && (
            <div className="feedback-widget">
                <button onClick={toggleWidget} className="close-btn">
                    <X size={30} />
                </button>

                {!showThankYou ? (
                    <div>
                        <h3 className="h5 fw-semibold text-dark mb-2">
                            Share Your Feedback
                        </h3>
                        <p className="text-muted small mb-4">
                            We'd love to hear your thoughts
                        </p>

                        <div>
                            <div className="mb-3">
                                <label className="form-label small fw-medium">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label small fw-medium">
                                    What do you like?
                                </label>
                                <textarea
                                    name="likes"
                                    value={formData.likes}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="Tell us what you enjoyed..."
                                    rows="3"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label small fw-medium">
                                    What could be improved?
                                </label>
                                <textarea
                                    name="dislikes"
                                    value={formData.dislikes}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="Tell us what could be better..."
                                    rows="3"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={handleFeedback}
                                className="btn btn-primary w-100"
                            >
                                Submit Feedback
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-4">
                        <div className="thank-you-icon">
                            <ThumbsUp size={32} className="text-success" />
                        </div>
                        <h3 className="h5 fw-semibold text-dark mb-2">
                            Thank You!
                        </h3>
                        <p className="text-muted small">
                            We appreciate your valuable feedback
                        </p>
                    </div>
                )}
            </div>
        )}

        {/* Floating Action Button */}
        <button onClick={toggleWidget} className="feedback-button">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className="fw-medium small">Feedback</span>
        </button>
    </>
);
}