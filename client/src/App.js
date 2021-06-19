import { Route, useHistory, Switch } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { BASE_URL } from './globals'
import axios from 'axios'
import Overview from './pages/Overview'
import ProductDetail from './pages/ProductDetail'
import './App.css'

const nextChar = (letter) => {
  return String.fromCharCode(letter.charCodeAt(0) + 1)
}

const App = () => {
  const [products, setProducts] = useState([])

  const getAllAds = async () => {
    try {
      //get all ads
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
      <header>Header</header>
      <main>
        <Switch>
          <Route
            exact
            path="/"
            component={() => <Overview products={products} />}
          />
          <Route path="/:product" component={() => <ProductDetail />} />
        </Switch>
      </main>
    </div>
  )
}

export default App
