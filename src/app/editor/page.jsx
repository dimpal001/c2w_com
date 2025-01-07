'use client'

import React, { useRef } from 'react'
import EmailEditor from 'react-email-editor'

const EditorPage = () => {
  const emailEditorRef = useRef(null)

  // Export HTML content
  const exportHtml = () => {
    if (emailEditorRef.current) {
      emailEditorRef.current.exportHtml((data) => {
        const { html } = data
        console.log('Exported HTML:', data, html)
      })
    }
  }

  // Handler for when the editor is ready
  const onReady = () => {
    console.log('Email Editor is ready!')
  }

  return (
    <div>
      <button
        onClick={exportHtml}
        style={{
          marginBottom: '10px',
          padding: '10px',
          background: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Export HTML
      </button>
      <EmailEditor ref={emailEditorRef} onReady={onReady} />
    </div>
  )
}

export default EditorPage
