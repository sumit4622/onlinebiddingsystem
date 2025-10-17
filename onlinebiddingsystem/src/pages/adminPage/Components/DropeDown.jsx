import { useState } from 'react'
import "../../../styles/adminCSS/DropeDown.css"
import { Ban, Trash2, EllipsisVertical } from 'lucide-react'

export default function DropDown({ onBlock, onDelete }) {
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => {
        setIsOpen(prev => !prev)
    }

    const handleBlock = () => {
        onBlock()
        setIsOpen(false)
    }

    const handleDelete = () => {
        onDelete()
        setIsOpen(false)
    }

    return (
        <div className="dropdown-wrapper">
      <button
        type="button"
        onClick={toggleDropdown}
        className="dropdown-toggle-btn"
      >
        <EllipsisVertical size={20} />
      </button>
      {isOpen && (
        <>
          <div 
            className="dropdown-backdrop"
            onClick={() => setIsOpen(false)}
          />
          <div className="dropdown-menu-custom">
            <button
              onClick={handleBlock}
              className="dropdown-item-custom"
            >
              <Ban size={16} />
              Block
            </button>
            <button
              onClick={handleDelete}
              className="dropdown-item-custom dropdown-item-danger"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </>
      )}
    </div>
    )
}