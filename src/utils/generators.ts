import { Product } from "../types/product"
import { User } from "../types/user"

export function generateRandomUser() : User {
  return {
    name: `Fulano ${Math.floor(Math.random() * 1000)}`,
    cpf: `${Math.floor(10000000000 + Math.random() * 89999999999)}`,
    address: `Rua ${Math.floor(Math.random() * 100)}, Centro`,
    number: `${Math.floor(Math.random() * 100)}`,
    neighborhood: `Bairro ${Math.floor(Math.random() * 100)}`,
    cityCode: `${Math.floor(1000000 + Math.random() * 8999999)}`,
    city: `Cidade ${Math.floor(Math.random() * 100)}`,
    state: 'SP',
    zipCode: `${Math.floor(10000000 + Math.random() * 89999999)}`
  }
}

export function generateRandomProduct() : Product {
  const randomPrice = (Math.random() * 100).toFixed(2);
  return {
    name: `Produto ${Math.floor(Math.random() * 1000)}`,
    code: `COD${Math.floor(Math.random() * 9999)}`,
    price: parseFloat(randomPrice),
    quantity: 1,
    unit: 'UN',
    ncm: '85183000',
    cfop: '5102',
    ean: '7892017437626'
  }
}
