import React, { useState, useRef } from 'react';

const ChatInputHandle = ({ onSendMessage, isLoading }) => {
    const [inputText, setInputText] = useState("");
    const [stagedFiles, setStagedFiles] = useState([]);
    const fileInputRef = useRef(null);

    const handlePlusClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setStagedFiles((prev) => [...prev, ...files]);
        e.target.value = null;
    };

    const removeFile = (indexToRemove) => {
        setStagedFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleSend = () => {
        if (!inputText.trim() && stagedFiles.length === 0) return;

        const formData = new FormData();
        formData.append('text', inputText);
        stagedFiles.forEach(file => {
            formData.append('files', file);
        });

        onSendMessage(formData, inputText, stagedFiles);

        setInputText("");
        setStagedFiles([]);
    };

    return (
        <div className="chat-input-container">
            {stagedFiles.length > 0 && (
                <div className="preview-container">
                    {stagedFiles.map((file, index) => {
                        const isImage = file.type.startsWith('image/');
                        return (
                            <div key={index} className="preview-box">
                                {isImage ? (
                                    <img src={URL.createObjectURL(file)} alt="preview" className="preview-img" />
                                ) : (
                                    <div className="document-icon">
                                        <span>{file.name.split('.').pop().toUpperCase()}</span>
                                    </div>
                                )}
                                <button className="remove-btn" onClick={() => removeFile(index)}>X</button>
                            </div>
                        );
                    })}
                </div>
            )}

            <div className="input-row">
                <input
                    type="file"
                    hidden
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    multiple
                    accept=".png,.jpg,.jpeg,.pdf,.txt"
                />
                <button className="icon-btn" onClick={handlePlusClick} disabled={isLoading}>+</button>

                <input
                    type="text"
                    className="text-input"
                    placeholder="Type your message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    disabled={isLoading}
                />

                <button className="send-btn" onClick={handleSend} disabled={isLoading}>
                    {isLoading ? '...' : 'Send'}
                </button>
            </div>
        </div>
    );
};

export default ChatInputHandle;