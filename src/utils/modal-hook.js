import { useState, useEffect, useCallback, useRef } from 'react'
import { ESC_CODE } from '../common/keys'

const useModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isShown, setIsShown] = useState(false)
  const isModalVisibleRef = useRef(isModalVisible)
  isModalVisibleRef.current = isModalVisible

  const toggleModal = useCallback(() => {
    setIsModalVisible(!isModalVisibleRef.current)
    setIsShown(!isShown)
  }, [isShown])

  const hideModal = useCallback(() => {
    setIsModalVisible(false)
    setIsShown(false)
  }, [])

  useEffect(() => {
    const handleEscPress = (event) =>
      event.keyCode === ESC_CODE && toggleModal()

    if (isShown) {
      document.addEventListener('keydown', handleEscPress)
    }
    return () => document.removeEventListener('keydown', handleEscPress)
  }, [isShown, toggleModal])

  return [
    {
      isShown,
      isModalVisible,
      hide: toggleModal,
    },
    toggleModal,
    hideModal,
  ]
}

export default useModal
