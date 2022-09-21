import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAppContext } from '../context/context'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Toaster } from 'react-hot-toast'
import Modal from 'react-modal'
import Product from '../components/Product'
import SellItem from '../components/SellItemModal'
import { modalStyles } from '../utils/constants'
import Sidebar from '../components/Sidebar'
import BreadCrumb from '../components/BreadCrumb'
import Searchbar from '../components/Searchbar'
import EbayLogo from '../components/EbayLogo'

Modal.setAppElement('#__next')

const App = () => {
  const router = useRouter()

  const { products } = useAppContext()

  return (
    <>
      <div>
        <Toaster position='top-center' />
      </div>

      <header className='header'>
        <EbayLogo />
        <button className='drop-down-button'>Shop by category ›</button>
        <Searchbar />
        <ConnectButton />

        <Link href='/?sell=1'>
          <button className='connect-button'>Create</button>
        </Link>
      </header>

      <main className='container'>
        <BreadCrumb />
        <div className='main-content'>
          <div className='container-wrapper'>
            <Sidebar />
          </div>

          <section className='container-results'>
            <div className='ebayclone-Hits'>
              <div className='ebayclone-Hits-list'>
                {products.map((item, index) => {
                  return <Product product={item} key={index} />
                })}
              </div>
            </div>

            <footer className='container-footer'></footer>
          </section>
        </div>
      </main>

      <Modal
        isOpen={!!router.query.sell}
        onRequestClose={() => router.push('/')}
        style={modalStyles}
      >
        <SellItem />
      </Modal>
    </>
  )
}

export default App
