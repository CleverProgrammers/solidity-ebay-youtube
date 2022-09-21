import { useState } from 'react'
import PriceSlider from './PriceSlider'
import Ratings from './Ratings'
import { category } from '../data/Category.seed'
import { Brands } from '../data/Brands.seed'

const Sidebar = () => {
  const [selectedCategories, setSelectedCategories] = useState([])

  const onKeyUp = event => {
    if (event.key !== 'Escape') {
      return
    }

    closeFilters()
  }

  const selectCategories = item => {
    setSelectedCategories(prevState => {
      if (prevState.includes(item.name)) {
        let filteredValues = prevState.filter(data => {
          return item.name !== data
        })

        return filteredValues
      } else {
        return [...prevState, item.name]
      }
    })
  }

  return (
    <>
      <section className='container-filters' onKeyUp={onKeyUp}>
        <div className='container-header'>
          <span>Category</span>
        </div>

        <div className='container-body'>
          <div className='ebayclone-Panel'>
            <div className='ebayclone-Panel-header'>
              <div>Buying Format</div>
              <div className='ebayclone-Panel-seeAll'>see all</div>
            </div>

            <div className='ebayclone-Panel-body'>
              <div className='ebayclone-RefinementList-list'>
                {category.map((item, index) => {
                  return (
                    <div className='ebayclone-RefinementList-item' key={index}>
                      <label className='ebayclone-RefinementList-label'>
                        <input
                          onClick={event => selectCategories(item)}
                          type='checkbox'
                          className={`ebayclone-RefinementList-checkbox round ${
                            selectedCategories.includes(item.name)
                              ? 'checked'
                              : ''
                          }`}
                        ></input>
                        <span className='ebayclone-RefinementList-labelText'>
                          {item.name}
                        </span>
                        <span className='ebayclone-RefinementList-count'>
                          {item.count}
                        </span>
                      </label>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className='ebayclone-Panel'>
            <div className='ebayclone-Panel-header'>
              <div>Brands</div>
              <div className='ebayclone-Panel-seeAll'>see all</div>
            </div>

            <div className='ebayclone-Panel-body'>
              <div className='ebayclone-RefinementList-list'>
                {Brands.map((item, index) => {
                  return (
                    <div className='ebayclone-RefinementList-item' key={index}>
                      <label className='ebayclone-RefinementList-label'>
                        <input
                          value={true}
                          type='checkbox'
                          className={`ebayclone-RefinementList-checkbox ${
                            selectedCategories.includes(item.name)
                              ? 'checked'
                              : ''
                          }`}
                          onClick={e => selectCategories(item)}
                        ></input>
                        <span className='ebayclone-RefinementList-labelText'>
                          {item.name}
                        </span>
                        <span className='ebayclone-RefinementList-count'>
                          {item.count}
                        </span>
                      </label>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className='ebayclone-Panel'>
            <div className='ebayclone-Panel-header'>Price</div>
            <PriceSlider />
          </div>

          <div className='ebayclone-Panel'>
            <div className='ebayclone-Panel-header'>Ratings</div>
            <Ratings />
          </div>
        </div>
      </section>
    </>
  )
}

export default Sidebar
