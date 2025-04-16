import { useState } from 'react'
import { buildXML } from './utils/xmlBuilder'
import { generateRandomUser, generateRandomProduct } from './utils/generators'
import { UserForm } from './components/UserForm'
import { ProductForm } from './components/ProductForm'
import { User } from './types/user'
import { Product } from './types/product'

export function App() {
  const [user, setUser] = useState<User>(generateRandomUser())
  const [products, setProducts] = useState<Product[]>([generateRandomProduct()])
  const [xmlPreview, setXmlPreview] = useState('')

  function handleAddProduct() {
    setProducts([...products, generateRandomProduct()])
  }

  const company = {
    cnpj: '12345678000195',
    name: 'Empresa Exemplo LTDA',
    fantasyName: 'Exemplo LTDA',
    address: 'Rua Exemplo',
    number: '123',
    neighborhood: 'Centro',
    cityCode: '1234567',
    city: 'Cidade Exemplo',
    state: 'SP',
    zipCode: '12345678',
    stateRegistration: '1234567890',
    taxRegime: '1', // Simples Nacional
  }

  const totals = {
    vBC: products.reduce((acc, p) => acc + p.price * p.quantity, 0).toFixed(2),
    vICMS: '0.00',
    vProd: products.reduce((acc, p) => acc + p.price * p.quantity, 0).toFixed(2),
    vNF: products.reduce((acc, p) => acc + p.price * p.quantity, 0).toFixed(2),
  }


  function handleGenerateXML() {
    const xml = buildXML(user, company, products, totals)
    setXmlPreview(xml)

    const blob = new Blob([xml], { type: 'application/xml' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'nfe.xml'
    link.click()
  }

  function handleCopyXML() {
    navigator.clipboard.writeText(xmlPreview)
    alert('XML copiado para a área de transferência!')
  }

  return (
    <div className="app">
      <h1>Gerador de XML NFe</h1>

      <UserForm user={user} setUser={setUser} />
      <ProductForm products={products} setProducts={setProducts} onAddProduct={handleAddProduct} />

      <button onClick={handleGenerateXML}>Gerar XML</button>
      {xmlPreview && (
        <div className="form-section preview-area">
          <h2>Pré-visualização do XML</h2>
          <textarea rows={15} value={xmlPreview} readOnly />
          <button onClick={handleCopyXML}>Copiar XML</button>
        </div>
      )}
    </div>
  )
}