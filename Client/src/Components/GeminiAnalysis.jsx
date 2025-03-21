import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GeminiAnalysis.css';

const GeminiAnalysis = ({ file, initialPrompt, onClose }) => {
    const [prompt, setPrompt] = useState(initialPrompt || '');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Automatically analyze when component mounts if there's an initial prompt
        if (initialPrompt) {
            handleAnalyze();
        }
    }, []);

    const handleAnalyze = async () => {
        if (!prompt.trim()) {
            setError('Please enter a prompt');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('prompt', prompt);

            const response = await axios.post('http://localhost:5000/v1/analyze', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                setResponse(response.data.analysis);
            } else {
                setError('Failed to analyze file');
            }
        } catch (error) {
            setError('Error analyzing file: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="gemini-overlay">
            <div className="gemini-popup">
                <button className="close-button" onClick={onClose}>×</button>
                <h2>Analyze with Gemini AI</h2>
                
                <div className="file-info">
                    <p>File: {file.name}</p>
                    <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
                </div>

                <div className="prompt-section">
                    <textarea
                        placeholder="Enter your prompt for analysis..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="prompt-input"
                    />
                    <button 
                        onClick={handleAnalyze}
                        disabled={loading}
                        className="analyze-button"
                    >
                        {loading ? 'Analyzing...' : 'Analyze'}
                    </button>
                </div>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {response && (
                    <div className="response-section">
                        <h3>Analysis Result:</h3>
                        <div className="response-content">
                            {response}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GeminiAnalysis; 