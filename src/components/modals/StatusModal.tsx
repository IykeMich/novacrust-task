import { useEffect } from 'react'
import SuccessCheckGif from '@/assets/animation/success-check.gif'
import { DefaultButton } from '../input/DefaultButton'

interface StatusModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  subtitle?: string
  disableCloseOnInteractOutside?: boolean
  showCloseButton?: boolean
  hasButton?: boolean
  buttonText?: string
  onButtonClick?: () => void
  className?: string
  modalType?: 'success' | 'error'
}

export default function StatusModal({ 
  isOpen, 
  onClose, 
  title,
  subtitle,
  disableCloseOnInteractOutside = false,
  showCloseButton = true,
  hasButton = false,
  buttonText = 'Close',
  onButtonClick = () => {},
  className = '',
  modalType = 'success',
}: StatusModalProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen && !disableCloseOnInteractOutside) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose, disableCloseOnInteractOutside])

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget && !disableCloseOnInteractOutside) {
          onClose()
        }
      }}
    >
      <div 
        className={`bg-white rounded-2xl p-6 w-full max-w-xs md:max-w-md lg:max-w-lg shadow-xl relative ${className}`}
        onClick={(event) => event.stopPropagation()}
      >
        {showCloseButton && !hasButton && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        <div className="space-y-3 w-full">
          <div className="text-center mt-10 space-y-2">
            {modalType === 'success' && (
              <img 
                src={SuccessCheckGif} 
                alt="Success Check" 
                className='size-[100px] md:size-[150px] lg:size-[180px] mx-auto' 
              />
            )}
            <h1 className='text-[#013941] font-semibold text-base! md:text-[20px]! lg:text-[20px]! xl:text-[28px]! lg:leading-[36px]! tracking-[2%]!'>
              {title}
            </h1>
            {subtitle && (
              <p className="text-[#4F4F4F] text-sm md:text-[14px] font-normal leading-relaxed my-4">
                {subtitle}
              </p>
            )}
            {hasButton && (
              <DefaultButton 
                label={buttonText}
                onClick={onButtonClick || onClose}
                extraClassName='w-[50%] mx-auto rounded-[8px]! h-[46px]!'
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

