/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
  Bold,
  Italic,
  Heading as HeadingIcon,
  List,
  ListOrdered,
  ImagePlus,
  LinkIcon,
} from 'lucide-react'
import Heading from '@tiptap/extension-heading'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { cdnPath } from '@/app/Components/cdnPath'

const MenuBar = ({ editor, onImageButtonClick, selectedContentImage }) => {
  if (!editor) return null

  useEffect(() => {
    try {
      if (selectedContentImage?.imageUrl) {
        editor
          .chain()
          .focus()
          .setImage({
            src: cdnPath + selectedContentImage.imageUrl,
            alt: selectedContentImage.altText || '',
          })
          .insertContent('<p></p>')
          .run()

        editor.commands.blur()
        editor.commands.focus()
      }
    } catch (error) {
      console.log(error)
    }
  }, [selectedContentImage])

  const handleLink = () => {
    const { from, to } = editor.state.selection
    if (from === to) {
      alert('Please select text to link.')
      return
    }

    const url = prompt('Enter the URL')
    if (url) {
      editor?.commands?.toggleLink({ href: url })
      editor?.commands?.focus()
    }
  }

  return (
    <div className='flex sticky top-7 z-20 gap-3 border border-dotted p-2 bg-blue-600 text-white'>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-1 rounded-md ${
          editor.isActive('heading', { level: 2 }) ? 'bg-slate-800' : ''
        }`}
        type='button'
      >
        <HeadingIcon size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-1 rounded-md ${
          editor.isActive('bold') ? 'bg-slate-800' : ''
        }`}
        type='button'
      >
        <Bold size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-1 rounded-md ${
          editor.isActive('italic') ? 'bg-slate-800' : ''
        }`}
        type='button'
      >
        <Italic size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-1 rounded-md ${
          editor.isActive('bulletList') ? 'bg-slate-800' : ''
        }`}
        type='button'
      >
        <List size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-1 rounded-md ${
          editor.isActive('orderedList') ? 'bg-slate-800' : ''
        }`}
        type='button'
      >
        <ListOrdered size={18} />
      </button>

      <button onClick={handleLink}>
        <LinkIcon size={18} />
      </button>

      <button onClick={onImageButtonClick}>
        <ImagePlus size={18} />
      </button>
    </div>
  )
}

const CustomEditor = ({
  value,
  onChange,
  images,
  onImageButtonClick,
  selectedContentImage,
}) => {
  const [isClient, setIsClient] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [altText, setAltText] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [dialogPosition, setDialogPosition] = useState({ top: 0, left: 0 })
  const dialogRef = useRef(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({
        HTMLAttributes: {
          class: 'text-lg max-md:text-xl font-bold',
          levels: [2],
        },
      }),
      BulletList.configure({ HTMLAttributes: { class: 'list-disc ml-2' } }),
      OrderedList.configure({ HTMLAttributes: { class: 'list-decimal ml-2' } }),
      Image.extend({
        addNodeView() {
          return ({ node, getPos }) => {
            const img = document.createElement('img')
            img.src = node.attrs.src
            img.alt = node.attrs.alt || ''

            img.onload = () => {
              // Ensure image is loaded before rendering
              editor?.commands?.updateImageNode(node, img)
            }

            img.onclick = (event) => {
              // Handle image click for editing alt text
              const rect = event.target.getBoundingClientRect()
              setDialogPosition({
                top: rect.top + window.scrollY + 10,
                left: rect.left + window.scrollX + 10,
              })
              setSelectedImage({ src: node.attrs.src, pos: getPos() })
              setAltText(node.attrs.alt || '')
              setIsDialogOpen(true)
            }

            return {
              dom: img,
              contentDOM: null,
              update: (updatedNode) => {
                img.src = updatedNode.attrs.src
                img.alt = updatedNode.attrs.alt || ''
                return true
              },
            }
          }
        },
      }).configure({
        HTMLAttributes: {
          class: 'p-3 mx-auto w-[90%] max-md:w-full',
        },
        inline: true,
      }),
      Link.configure({
        defaultProtocol: 'https',
        linkOnPaste: true,
        HTMLAttributes: { class: 'text-blue-600 underline' },
      }),
    ],
    content: value || '',
    editorProps: {
      attributes: { class: 'p-3 focus:outline-none' },
      handleDOMEvents: {
        click: (view, event) => {
          const target = event.target
          if (target.tagName === 'IMG') {
            setSelectedImage(target)
            setAltText(target.alt || '')
            setIsDialogOpen(true)
          }
          return false
        },
      },
    },
    immediatelyRender: false,
  })

  useEffect(() => {
    if (editor) {
      const handleUpdate = () => {
        const htmlContent = editor.getHTML()
        onChange(htmlContent)
      }
      editor.on('update', handleUpdate)

      return () => {
        editor.off('update', handleUpdate)
      }
    }
  }, [editor, onChange])

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor?.commands?.setContent(value || '')
    }
  }, [editor, value])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        // setSelectedImage(null)
        setIsDialogOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleAltTextSave = () => {
    if (selectedImage) {
      const { state, dispatch } = editor.view
      const { doc } = state

      let imagePos = null

      // Traverse the document to find the current image position
      doc.descendants((node, pos) => {
        if (
          node.type.name === 'image' &&
          node.attrs.src === selectedImage.src
        ) {
          imagePos = pos
          return false // Stop traversal once found
        }
      })

      if (imagePos !== null) {
        editor
          .chain()
          .focus()
          .command(({ tr }) => {
            tr.setNodeMarkup(imagePos, undefined, {
              src: selectedImage.src,
              alt: altText,
            })
            dispatch(tr)
            return true
          })
          .run()

        setSelectedImage(null)
        setIsDialogOpen(false)
      } else {
        console.warn('Image not found in the document.')
      }
    }
  }

  if (!isClient) return null

  return (
    <div className='w-full'>
      <MenuBar
        images={images}
        editor={editor}
        onImageButtonClick={onImageButtonClick}
        selectedContentImage={selectedContentImage}
      />
      <EditorContent
        editor={editor}
        className='min-h-[150px] editor-content bg-white border border-dotted border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-2xl font-serif text-gray-800 placeholder-gray-400'
      />

      {isDialogOpen && selectedImage && (
        <div
          ref={dialogRef}
          className='absolute z-50 p-3 border border-gray-300 bg-white shadow-lg rounded-md'
          style={{
            top: dialogPosition.top,
            left: dialogPosition.left,
          }}
        >
          <label className='block mb-2 text-sm font-medium text-gray-700'>
            Alt Text:
          </label>
          <input
            type='text'
            className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
          />
          <div className='mt-3 flex justify-end gap-2'>
            <button
              className='px-3 py-1 text-sm bg-gray-200 rounded-md'
              onClick={() => setSelectedImage(null)}
            >
              Cancel
            </button>
            <button
              className='px-3 py-1 text-sm bg-blue-500 text-white rounded-md'
              onClick={handleAltTextSave}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomEditor
