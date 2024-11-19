/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react'
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop'
import { canvasPreview } from './canvasPreview'
import { useDebounceEffect } from './useDebounceEffect'
import 'react-image-crop/dist/ReactCrop.css'
import { Modal, ModalBody, ModalCloseButton } from './CustomModal'

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  )
}

export default function ImageCroper({
  isOpen,
  onClose,
  onCropComplete,
  aspectRatio,
}) {
  const [imgSrc, setImgSrc] = useState('')
  const previewCanvasRef = useRef(null)
  const imgRef = useRef(null)
  const [crop, setCrop] = useState()
  const [completedCrop, setCompletedCrop] = useState()
  const scale = 1
  const rotate = 0
  const aspect = aspectRatio ? aspectRatio : 4 / 5
  const [fileName, setFileName] = useState(null)

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name)
      setCrop(undefined)
      const reader = new FileReader()
      reader.addEventListener('load', () => setImgSrc(reader.result || ''))
      reader.readAsDataURL(e.target.files[0])
    }
  }

  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }

  async function onDownloadCropClick() {
    const image = imgRef.current
    const previewCanvas = previewCanvasRef.current
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error('Crop canvas does not exist')
    }

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    )
    const ctx = offscreen.getContext('2d')
    if (!ctx) {
      throw new Error('No 2D context')
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height
    )

    const blob = await offscreen.convertToBlob({
      type: 'image/jpeg',
      quality: 1,
    })

    const croppedImageUrl = URL.createObjectURL(blob)
    onCropComplete(blob, croppedImageUrl, fileName)
    onClose()
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // Use canvasPreview for fast rendering
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        )
      }
    },
    100,
    [completedCrop, scale, rotate]
  )

  return (
    <Modal isOpen={isOpen} size={'2xl'}>
      <ModalCloseButton onClick={onClose} />
      <ModalBody>
        <div className='App'>
          <div className='Crop-Controls'>
            <input
              className='p-2 border-[2px] mb-5 border-dotted'
              type='file'
              accept='image/*'
              onChange={onSelectFile}
            />
            {fileName && (
              <button
                onClick={onDownloadCropClick}
                className='rounded-sm p-2 px-4 bg-blue-600 text-white ml-4'
              >
                Upload
              </button>
            )}
          </div>
          {!!imgSrc && (
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect}
              minHeight={100}
            >
              <img
                ref={imgRef}
                alt='Crop me'
                src={imgSrc}
                style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          )}
          {!!completedCrop && (
            <>
              <div>
                <canvas
                  ref={previewCanvasRef}
                  style={{
                    border: '1px solid black',
                    objectFit: 'contain',
                    width: completedCrop.width,
                    height: completedCrop.height,
                  }}
                />
              </div>
              <div></div>
            </>
          )}
        </div>
      </ModalBody>
    </Modal>
  )
}
