import {useState, useRef, useEffect} from 'react'
const data = [
  {
    id: "1",
    name: "Indomie",
    variants: [
      {
        id: "Indomie#01",
        productId: "1",
        name: "Soto",
        price: 3500
      },
      {
        id: "Indomie#02",
        productId: "1",
        name: "Goreng Original",
        price: 4000
      },
      {
        id: "Indomie#03",
        productId: "1",
        name: "Kari Ayam",
        price: 3200
      }
    ]
  },
  {
    id: "2",
    name: "Coca Cola",
    variants: [
      {
        id: "CocaCola#01",
        productId: "2",
        name: "350ml",
        price: 5000
      },
      {
        id: "CocaCola#02",
        productId: "2",
        name: "1 Liter",
        price: 25000
      },
    ]
  },
  {
    id: "3",
    name: "Aqua",
    variants: [
      {
        id: "Aqua#01",
        productId: "3",
        name: "350ml",
        price: 3000
      },
      {
        id: "Aqua#02",
        productId: "3",
        name: "1,5 Liter",
        price: 5000
      },
    ]
  }
]
export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState("")
  const [selectedVariants, setSelectedVariants] = useState([])

  const handleSelectProduct = (e) => {
    const productId = e.target.value
    if (productId !== selectedProduct) {
      setSelectedProduct(productId)
      const product = data.find((item) => item.id === productId)
      setSelectedVariants(product.variants.map((item) => item.id))
    } else {
      setSelectedProduct("")
      setSelectedVariants([])
    }
  }
  const handleSelectVariant = (e) => {
    const variantId = e.target.value
    if (!selectedVariants.includes(variantId)) {
      const product = data.find((item) => item.variants.find(variant => variant.id === variantId))
      setSelectedProduct(product.id)
      if (selectedVariants.length > 0 && selectedVariants.every((id) => product.variants.find((item) => item.id === id))) {
        const newSelectedVariants = [...selectedVariants, variantId]
        setSelectedVariants(newSelectedVariants)
      } else {
        const newSelectedVariants = [variantId]
        setSelectedVariants(newSelectedVariants)
      }
    } else {
      const newSelectedVariants = selectedVariants.filter((item) => item !== variantId)
      setSelectedVariants(newSelectedVariants)
    }
  }

  const [result, setResult] = useState([])
  const handleSubmit = (e) => {
    e.preventDefault()
    const product = data.find((item) => item.id === selectedProduct)
    const newResult = product.variants.filter((item) => selectedVariants.includes(item.id))
    setResult(newResult.map((item) => ({
      ...item,
      productName: product.name
    })))
  }
  const handleReset = () => {
    setSelectedProduct("")
    setSelectedVariants([])
    setResult([])
  }
  return (
    <main className="h-[100vh] bg-white w-full px-48 flex flex-col justify-center items-center">
      <div className="pb-8">
        <h1 className="text-xl font-semibold text-center">Frontend Test</h1>
      </div>
      <div className="flex space-x-4">
        <div className="bg-white border border-gray-800 rounded-lg p-4">
          <form action="" onSubmit={handleSubmit} onReset={handleReset} className="flex flex-col space-y-8">
            <div className="flex flex-col space-y-4">
              {
                data.map((item, index) => (
                  <div key={index}>
                    <label htmlFor={item.id} className="flex space-x-2">
                      <input 
                        type="checkbox" 
                        name={item.id} 
                        id={item.id} 
                        className="" 
                        value={item.id} 
                        onChange={handleSelectProduct} 
                        checked={selectedProduct === item.id}
                      />
                      <span>{item.name}</span>
                    </label>
                    <div className="pl-4">
                      {item.variants.map((variant, index) => (
                        <label key={index} htmlFor={variant.id} className="flex space-x-2">
                          <input 
                            type="checkbox" 
                            name={variant.id} 
                            id={variant.id} 
                            value={variant.id} 
                            className="" 
                            onChange={handleSelectVariant}
                            checked={selectedVariants.includes(variant.id)}
                          />
                          <span>{variant.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))
              }
            </div>
            <div className="flex space-x-3">
              <button type="reset" className="px-8 py-2 bg-gray-800 rounded-lg text-white">Reset</button>
              <button type="submit" className="px-8 py-2 bg-blue-800 rounded-lg text-white">Simpan</button>
            </div>
          </form>
        </div>
        <div className="">
          <div className="bg-blue-100 border border-gray-800 w-[300px] rounded-lg p-4">
            <p className="mb-8 font-semibold text-sm">Result:</p>
            <div className=" flex flex-col space-y-3">
            {
              result.map((item, index) => (
                <div key={index} className="flex justify-between items-end">
                  <div className="">
                    <p className="text-sm">
                      {item.productName}, {item.name}
                    </p>
                  </div>
                  <div>
                    Rp{item.price}
                  </div>
                </div>
              ))
            }
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
