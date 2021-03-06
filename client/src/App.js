import { Route, Switch } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { BASE_URL } from './globals'
import axios from 'axios'
import Overview from './pages/Overview'
import ProductDetail from './pages/ProductDetail'
import NavBar from './components/NavBar'
import './App.css'

const nextChar = (letter) => {
  return String.fromCharCode(letter.charCodeAt(0) + 1)
}

const App = () => {
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState([])

  //function to get all ads from db
  const getAllAds = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/`)
      //loop through and break the master array into an array of product arrays
      let productArray = []
      let i = 'a'
      while (i !== '{') {
        const singleProductArray = response.data.filter((ad) => {
          return ad.product.toLowerCase() === i
        })
        productArray.push(singleProductArray)
        i = nextChar(i)
      }
      //set state with productArray
      setProducts(productArray)
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    getAllAds()
  }, [])

  return (
    <div className="App">
      <NavBar />
      <main className="main-content">
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <Overview
                products={products}
                setSelectedProduct={setSelectedProduct}
              />
            )}
          />
          <Route
            path="/:product"
            component={() => (
              <ProductDetail selectedProduct={selectedProduct} />
            )}
          />
        </Switch>
      </main>
    </div>
  )
}

export default App
