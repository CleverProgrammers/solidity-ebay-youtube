import { createContext, useState, useEffect, useContext } from 'react'
import { useAccount } from 'wagmi'
import Web3 from 'web3'
import { createContract } from '../utils/constants'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [contract, setContract] = useState(null)
  const [userAddress, setUserAddress] = useState('')
  const [products, setProducts] = useState([])

  const { address } = useAccount()

  useEffect(() => {
    setUserAddress(address)
    setContract(createContract())
  }, [address])

  useEffect(() => {
    getAllItems()
  }, [contract])

  const sellItem = async (name, desc, category, image, price, rating) => {
    if (contract) {
      try {
        const priceInWei = Web3.utils.toWei(price, 'ether')
        await contract.methods
          .listNewProduct(name, desc, category, image, priceInWei, rating)
          .send({ from: userAddress, gas: 3000000, gasPrice: null })
      } catch (error) {
        console.error(error)
      }
    }
  }

  const getAllItems = async () => {
    setProducts([])

    if (contract) {
      try {
        const productCount = await contract.methods.getNumberOfProducts().call()

        for (let index = 0; index < productCount; index++) {
          const product = await contract.methods.products(index).call()

          const formattedProduct = {
            id: product.id,
            buyer: product.buyer,
            seller: product.seller,
            name: product.name,
            description: product.description,
            category: product.category,
            imgUrl: product.imgUrl,
            price: Web3.utils.fromWei(product.price, 'ether'),
            rating: product.rating,
          }

          setProducts(prev => [...prev, formattedProduct])
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  const buyProduct = async id => {
    if (contract) {
      try {
        const price = await contract.methods.products(id).call()

        await contract.methods.purchaseItem(id).send({
          from: userAddress,
          gas: 3000000,
          gasPrice: null,
          value: price['price'],
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <AppContext.Provider value={{ sellItem, products, buyProduct }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext)
}
