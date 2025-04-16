import { User } from "../../types/user"

interface Props {
  user: User
  setUser: (user: User) => void
}

export function UserForm({ user, setUser }: Props) {
  return (
    <section className="form-section user-form">
      <h2>Destinatário</h2>
      <div className="form-group">
        <label>Nome:</label>
        <input value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
        <label>CPF:</label>
        <input value={user.cpf} onChange={(e) => setUser({ ...user, cpf: e.target.value })} />
        <label>Endereço:</label>
        <input value={user.address} onChange={(e) => setUser({ ...user, address: e.target.value })} />
        <label>Número:</label>
        <input value={user.number} onChange={(e) => setUser({ ...user, number: e.target.value })} />
        <label>Bairro:</label>
        <input value={user.neighborhood} onChange={(e) => setUser({ ...user, neighborhood: e.target.value })} />
        <label>Código da Cidade:</label>
        <input value={user.cityCode} onChange={(e) => setUser({ ...user, cityCode: e.target.value })} />
        <label>Cidade:</label>
        <input value={user.city} onChange={(e) => setUser({ ...user, city: e.target.value })} />
        <label>Estado:</label>
        <input value={user.state} onChange={(e) => setUser({ ...user, state: e.target.value })} />
        <label>CEP:</label>
        <input value={user.zipCode} onChange={(e) => setUser({ ...user, zipCode: e.target.value })} />
      </div>
    </section>
  )
}
