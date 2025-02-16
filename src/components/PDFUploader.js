import React, { useState } from 'react';
import { Upload, X, Maximize2, Minimize2 } from 'lucide-react';

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

      <style jsx>{`
        .uploader-container {
          width: 100%;
          max-width: 90rem;
          margin: 0 auto;
          padding: 1rem;
        }

        .upload-card {
          background: white;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          margin-bottom: 1.5rem;
          padding: 1.5rem;
        }

        .upload-area {
          border: 2px dashed #e2e8f0;
          border-radius: 0.5rem;
          padding: 2rem;
          text-align: center;
        }

        .file-input {
          display: none;
        }

        .upload-label {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
        }

        .upload-icon {
          width: 3rem;
          height: 3rem;
          color: #a0aec0;
          margin-bottom: 0.5rem;
        }

        .upload-text {
          font-size: 1.125rem;
          font-weight: 500;
          margin-bottom: 0.25rem;
        }

        .upload-subtext {
          font-size: 0.875rem;
          color: #718096;
        }

        .preview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1rem;
          position: relative;
        }

        .preview-card {
          background: white;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: all 0.3s ease;
          height: 500px;
        }

        .preview-card.expanded {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90vw;
          height: 90vh;
          z-index: 5000;
        }

        .preview-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
        }

        .preview-info {
          overflow: hidden;
        }

        .preview-title {
          font-size: 0.875rem;
          font-weight: 500;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .preview-size {
          font-size: 0.75rem;
          color: #718096;
        }

        .preview-actions {
          display: flex;
          gap: 0.5rem;
        }

        .action-button {
          background: none;
          border: none;
          padding: 0.25rem;
          cursor: pointer;
          color: #718096;
          transition: color 0.2s;
        }

        .action-button:hover {
          color: #3b82f6;
        }

        .action-icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        .preview-content {
          height: calc(100% - 3.5rem);
          background: #f8fafc;
        }

        .pdf-preview {
          width: 100%;
          height: 100%;
          border: none;
        }

        @media (max-width: 768px) {
          .preview-grid {
            grid-template-columns: 1fr;
          }

          .preview-card {
            height: 400px;
          }
        }
      `}</style>
    </div>
  );
};

export default PDFUploader;