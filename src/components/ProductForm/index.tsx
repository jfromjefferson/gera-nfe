import { Product } from "../../types/product"

interface Props {
  products: Product[]
  setProducts: (products: Product[]) => void
  onAddProduct: () => void
}

export function ProductForm({ products, setProducts, onAddProduct }: Props) {
  return (
    <section className="form-section product-form">
      <h2>Produtos</h2>
      {products.map((prod, idx) => (
        <div className="form-group" key={idx}>
          <label>Nome:</label>
          <input
            value={prod.name}
            onChange={(e) => {
              const updated = [...products]
              updated[idx].name = e.target.value
              setProducts(updated)
            }}
          />
          <label>Preço:</label>
          <input
            type="number"
            value={prod.price}
            onChange={(e) => {
              const updated = [...products]
              updated[idx].price = parseFloat(e.target.value)
              setProducts(updated)
            }}
          />
        </div>
      ))}
      <button onClick={onAddProduct}>Adicionar Produto</button>
    </section>
  )
}
