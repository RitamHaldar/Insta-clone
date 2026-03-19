import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import '../style/alert.scss';

const ErrorAlert = ({ message, onClose }) => {
    if (!message) return null;

    return (
        <div className="error-alert">
            <div className="error-content">
                <AlertCircle className="error-icon" size={20} />
                <span className="error-message">{message}</span>
            </div>
            {onClose && (
                <button className="close-button" onClick={onClose} aria-label="Close error">
                    <X size={18} />
                </button>
            )}
        </div>
    );
};

export default ErrorAlert;
