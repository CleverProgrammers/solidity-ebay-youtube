import React, { useState } from 'react'
import { ratings } from '../data/Rating.seed'
import cx from 'classnames'

const Ratings = () => {
  const [currentRefinement, setCurrentRefinement] = useState({
    min: 4,
    max: 5,
  })

  const stars = new Array(5).fill(null)

  return (
    <div className='ebayclone-RatingMenu'>
      <div className='ebayclone-RatingMenu-list'>
        {ratings.map((rating, ratingIndex) => {
          const isRatingSelected =
            ratings.every(
              currentRating => currentRating.value !== currentRefinement.min,
            ) || rating.value === currentRefinement.min

          return (
            <div
              className={cx('ebayclone-RatingMenu-item', {
                'ebayclone-RatingMenu-item--selected': isRatingSelected,
                'ebayclone-RatingMenu-item--disabled': rating.count === 0,
              })}
              key={rating.value}
            >
              <a
                className='ebayclone-RatingMenu-link'
                aria-label={`${rating.value} & up`}
                // href={createURL(rating.value)}
                onClick={event => {
                  event.preventDefault()
                  setCurrentRefinement({ min: rating.value, max: 5 })
                }}
              >
                {stars.map((_, starIndex) => {
                  const starNumber = starIndex + 1
                  const isStarFull = starNumber < 5 - ratingIndex

                  return (
                    <svg
                      key={starIndex}
                      className={cx('ebayclone-RatingMenu-starIcon', {
                        'ebayclone-RatingMenu-starIcon--full': isStarFull,
                        'ebayclone-RatingMenu-starIcon--empty': !isStarFull,
                      })}
                      aria-hidden='true'
                      viewBox='0 0 16 16'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10.472 5.008L16 5.816l-4 3.896.944 5.504L8 12.616l-4.944 2.6L4 9.712 0 5.816l5.528-.808L8 0z'
                      />
                    </svg>
                  )
                })}

                <span className='ebayclone-RatingMenu-count'>
                  {rating.count}
                </span>
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Ratings
