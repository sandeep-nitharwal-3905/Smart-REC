import React, { useState } from 'react';
import { Upload, X, Maximize2, Minimize2 } from 'lucide-react';
import './styles/PDFUploader.css';

const PDFUploader = () => {
  const [pdfs, setPdfs] = useState([]);
  const [expandedPdf, setExpandedPdf] = useState(null);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const pdfFiles = files.filter(file => file.type === 'application/pdf');
    
    const newPdfs = pdfFiles.map(file => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2)
    }));
    
    setPdfs([...pdfs, ...newPdfs]);
  };

  const handleRemovePdf = (index) => {
    const updatedPdfs = pdfs.filter((_, i) => i !== index);
    if (expandedPdf === index) {
      setExpandedPdf(null);
    }
    setPdfs(updatedPdfs);
  };

  const toggleExpand = (index) => {
    setExpandedPdf(expandedPdf === index ? null : index);
  };

  return (
    <div className="uploader-container">
      {/* Upload Section */}
      <div className="upload-card">
        <div className="upload-area">
          <input
            type="file"
            multiple
            accept=".pdf"
            onChange={handleFileUpload}
            className="file-input"
            id="pdf-upload"
          />
          <label htmlFor="pdf-upload" className="upload-label">
            <Upload className="upload-icon" />
            <span className="upload-text">Drop PDFs here or click to upload</span>
            <span className="upload-subtext">Supports multiple PDF files</span>
          </label>
        </div>
      </div>

      {/* PDF Grid Preview Section */}
      <div className="preview-grid">
        {pdfs.map((pdf, index) => (
          <div 
            key={index}
            className={`preview-card ${expandedPdf === index ? 'expanded' : ''}`}
          >
            <div className="preview-header">
              <div className="preview-info">
                <h3 className="preview-title">{pdf.name}</h3>
                <span className="preview-size">{pdf.size} MB</span>
              </div>
              <div className="preview-actions">
                <button
                  onClick={() => toggleExpand(index)}
                  className="action-button"
                >
                  {expandedPdf === index ? (
                    <Minimize2 className="action-icon" />
                  ) : (
                    <Maximize2 className="action-icon" />
                  )}
                </button>
                <button
                  onClick={() => handleRemovePdf(index)}
                  className="action-button"
                >
                  <X className="action-icon" />
                </button>
              </div>
            </div>
            <div className="preview-content">
              <iframe
                src={pdf.url}
                className="pdf-preview"
                title={pdf.name}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PDFUploader;