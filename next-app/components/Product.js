import { useAppContext } from '../context/context'
import { formatNumber } from '../utils'
import toast from 'react-hot-toast'

const Product = ({ product }) => {
  const { buyProduct } = useAppContext()

  return (
    <article
      className='hit'
      onClick={() => {
        toast.promise(buyProduct(product.index), {
          loading: 'Buying Item... This can take a few seconds. ⏳',
          success: 'Item bought! 🎉',
          error: 'Error buying item. 😢',
        })
      }}
    >
      <header className='hit-image-container relative'>
        <img src={product.imgUrl} alt={product.name} className='hit-image' />
      </header>

      <div className='hit-info-container'>
        <p className='hit-category'>{product.category}</p>
        <h1>
          <span className='ebayclone-Highlight'>
            <span className='ebayclone-Highlight-nonHighlighted'>
              {product.brand}
            </span>
          </span>
        </h1>
        <p className='hit-description'>
          <span className='ebayclone-Snippet'>
            <span className='ebayclone-Snippet-nonHighlighted'>
              {product.description}
            </span>
          </span>
        </p>

        <footer>
          <p>
            <span className='hit-em'>$</span>{' '}
            <strong>{formatNumber(product.price)}</strong>{' '}
            <span className='hit-em hit-rating'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='8'
                height='8'
                viewBox='0 0 16 16'
              >
                <path
                  fill='#000000'
                  fillRule='evenodd'
                  d='M10.472 5.008L16 5.816l-4 3.896.944 5.504L8 12.616l-4.944 2.6L4 9.712 0 5.816l5.528-.808L8 0z'
                />
              </svg>{' '}
              {product.rating}
            </span>
          </p>
        </footer>
      </div>
    </article>
  )
}

export default Product
