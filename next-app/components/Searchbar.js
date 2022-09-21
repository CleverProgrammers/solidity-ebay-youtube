import { useState, useEffect } from 'react'
import { DropDown } from '../data/DropDown.seed'

const Searchbar = () => {
  const [categories, setAllCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])

  useEffect(() => {
    const allCat = []
    DropDown.forEach(item => {
      allCat = [...allCat, ...item.items]
    })

    setAllCategories(allCat)
  }, [])

  return (
    <div className='ebayclone-SearchBox'>
      <form className='ebayclone-SearchBox-form' role='search' noValidate>
        <input
          type='search'
          placeholder='Product, brand, color, …'
          className='ebayclone-SearchBox-input'
        />
        <button
          type='submit'
          title='Submit your search query.'
          className='ebayclone-SearchBox-submit'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 18 18'
          >
            <g
              fill='none'
              fillRule='evenodd'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='1.67'
              transform='translate(1 1)'
            >
              <circle cx='7.11' cy='7.11' r='7.11' />
              <path d='M16 16l-3.87-3.87' />
            </g>
          </svg>
        </button>
        <select className='allDropDown'>
          <option value='0' className='dropdownOption'>
            All Categories
          </option>
          {categories.map((item, index) => {
            return (
              <option key={index} value='0' className='dropdownOption'>
                {item}
              </option>
            )
          })}
        </select>
      </form>
    </div>
  )
}

export default Searchbar
