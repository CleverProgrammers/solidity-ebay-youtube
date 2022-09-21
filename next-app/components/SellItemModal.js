import { useState } from 'react'

const SellItem = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [rating, setRating] = useState('')

  const handleUploadProductImage = async () => {}

  const handleSubmit = async event => {}

  return (
    <div className='sell-container'>
      <div className='sell-input-container'>
        <span className='sell-input-title'>Name</span>
        <input
          className='sell-input-textbox'
          type='text'
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </div>
      <div className='sell-input-container'>
        <span className='sell-input-title'>Image</span>
        <button
          className='sell-input-button'
          onClick={handleUploadProductImage}
        >
          Upload Product image
        </button>
      </div>
      <div className='sell-input-container'>
        <span className='sell-input-title'>Description</span>
        <textarea
          className='sell-input-textbox'
          rows='4'
          type='text'
          value={description}
          onChange={event => setDescription(event.target.value)}
        />
      </div>
      <div className='sell-input-container'>
        <span className='sell-input-title'>Category</span>
        <input
          className='sell-input-textbox'
          type='text'
          value={category}
          onChange={event => setCategory(event.target.value)}
        />
      </div>
      <div className='sell-input-container'>
        <span className='sell-input-title'>Price</span>
        <input
          className='sell-input-textbox'
          type='text'
          value={price}
          onChange={event => setPrice(event.target.value)}
        />
      </div>
      <div className='sell-input-container'>
        <span className='sell-input-title'>Rating</span>
        <input
          className='sell-input-textbox'
          type='text'
          value={rating}
          onChange={event => setRating(event.target.value)}
        />
      </div>
       
      <button onClick={handleSubmit} className='sell-input-button'>
        List Item
      </button>
    </div>
  )
}

export default SellItem
