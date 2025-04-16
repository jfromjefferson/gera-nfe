import { create } from 'xmlbuilder2'
import { User } from '../types/user'
import { Product } from '../types/product'
import { Company } from '../types/company'
import { Totals } from '../types/totals'

function generateNFeCode() : string {
	const prefix = 'NFe'
	let numbers = ''
	
	for (let i = 0; i < 44; i++) {
		numbers += Math.floor(Math.random() * 10)
	}

	return prefix + numbers
}

export function buildXML(user: User, company: Company, products: Product[], totals: Totals) : string {

	const root = create({ version: '1.0', encoding: 'UTF-8' })
		.ele('nfeProc', { xmlns: 'http://www.portalfiscal.inf.br/nfe', versao: '4.00' })
		.ele('NFe')
		.ele('infNFe', { versao: '4.00', Id: generateNFeCode() })

	// Dados da nota fiscal (ide)
	const ide = root.ele('ide')
	ide.ele('cUF').txt('42')
	ide.ele('natOp').txt('Venda de mercadoria')
	ide.ele('mod').txt('55')
	ide.ele('serie').txt('1')
	ide.ele('nNF').txt('1234')
	ide.ele('dhEmi').txt(new Date().toISOString())
	ide.ele('tpNF').txt('1')
	ide.ele('idDest').txt('1')

	// Dados do emitente (empresa)
	const emit = root.ele('emit')
	emit.ele('CNPJ').txt(company.cnpj)
	emit.ele('xNome').txt(company.name)
	emit.ele('xFant').txt(company.fantasyName)

	const enderEmit = emit.ele('enderEmit')
	enderEmit.ele('xLgr').txt(company.address)
	enderEmit.ele('nro').txt(company.number)
	enderEmit.ele('xBairro').txt(company.neighborhood)
	enderEmit.ele('cMun').txt(company.cityCode)
	enderEmit.ele('xMun').txt(company.city)
	enderEmit.ele('UF').txt(company.state)
	enderEmit.ele('CEP').txt(company.zipCode)
	enderEmit.ele('cPais').txt('1058')
	enderEmit.ele('xPais').txt('Brasil')
	emit.ele('IE').txt(company.stateRegistration)
	emit.ele('CRT').txt(company.taxRegime)

	// Dados do destinatário
	const dest = root.ele('dest')
	dest.ele('CPF').txt(user.cpf)
	dest.ele('xNome').txt(user.name)

	const enderDest = dest.ele('enderDest')
	enderDest.ele('xLgr').txt(user.address)
	enderDest.ele('nro').txt(user.number)
	enderDest.ele('xBairro').txt(user.neighborhood)
	enderDest.ele('cMun').txt(user.cityCode)
	enderDest.ele('xMun').txt(user.city)
	enderDest.ele('UF').txt(user.state)
	enderDest.ele('CEP').txt(user.zipCode)
	enderDest.ele('cPais').txt('1058')
	enderDest.ele('xPais').txt('Brasil')

	// Produtos
	products.forEach((p, i) => {
		const det = root.ele('det', { nItem: i + 1 })
		const prod = det.ele('prod')
		prod.ele('cProd').txt(p.code)
		prod.ele('xProd').txt(p.name)
		prod.ele('NCM').txt(p.ncm)
		prod.ele('CFOP').txt(p.cfop)
		prod.ele('uCom').txt(p.unit)
		prod.ele('qCom').txt(p.quantity.toFixed(4))
		prod.ele('vUnCom').txt(p.price.toFixed(2))
		prod.ele('vProd').txt((p.price * p.quantity).toFixed(2))
	})

	// Impostos
	const total = root.ele('total')
	const icmsTot = total.ele('ICMSTot')
	icmsTot.ele('vBC').txt(totals.vBC)
	icmsTot.ele('vICMS').txt(totals.vICMS)
	icmsTot.ele('vProd').txt(totals.vProd)
	icmsTot.ele('vNF').txt(totals.vNF)

	return root.end({ prettyPrint: true })
}
