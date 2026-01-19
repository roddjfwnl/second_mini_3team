import { useState } from 'react'
import './CodeDetail.css'

function CodeDetail({ code, onClose, onBuy }) {
  const [copied, setCopied] = useState(false)

  if (!code) return null

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([code.code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = code.fileName || `${code.title}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="code-detail-container">
      <div className="code-detail-header">
        <h2>코드 상세 정보</h2>
      </div>

      <div className="code-detail-meta">
        <span className="code-detail-language">{code.language}</span>
        {code.fileName && (
          <span className="code-detail-filename">{code.fileName}</span>
        )}
      </div>

      <h3 className="code-detail-title">{code.title}</h3>

      <div className="code-detail-code-section">
        <div className="code-detail-code-header">
          <span className="code-detail-label">Preview</span>
          <button className="code-detail-copy-btn" onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy code'}
          </button>
        </div>
        <pre className="code-detail-code-box">{code.code}</pre>
      </div>

      <div className="code-detail-price-section">
        <p className="code-detail-price">₩{code.price.toLocaleString()}</p>
        <span className="code-detail-price-label">KRW</span>
      </div>

      <div className="code-detail-actions">
        <button className="code-detail-btn code-detail-btn-primary" onClick={() => onBuy(code)}>
          Buy now
        </button>
        <button className="code-detail-btn code-detail-btn-download" onClick={handleDownload}>
          Download
        </button>
        <button className="code-detail-btn code-detail-btn-secondary" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
}

export default CodeDetail
