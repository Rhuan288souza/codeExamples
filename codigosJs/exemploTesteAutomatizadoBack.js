/*
Este é um exemplo de teste automatizado criado recentemente para simular a criação de um cartão,
salvar informações de conta em uma tabela, bem como validar os inputs do lambda
Lambda interno, sem rota http
*/

'use strict'


// De acordo com o ambiente, pega determinada função
const getCardAccount = process.env.TEST_REMOTE
  ? `ecard-${process.env.STAGE}-getCardAccount`
  : require('../../getCardAccount').getCardAccount

// Este trecho de código representa a função que está no arquivo getCardAccount
/*
É basicamente um handler que faz algumas validações e depois passa a requisição para o arquivo de serviço
*/
'use strict'

const aws = require('aws-sdk')
const api = require('api-utils')(aws)
const validator = require('./utils/requestValidator')
const service = require('./service/ecardService')

module.exports.getCardAccount = (event, _context, callback) => {
  api.middleware(event)
  .then(validator.getCardAccount)
  .then(() => service.getCardAccount(event.body.document, event.body.productCode))
  .then(data => callback(null, api.success(data)))
  .catch(err => callback(null, api.error(err)))
}

// A finalidade deste lambda é retornar alguns dados passados esses dois parâmetros

// Fim do trecho de código de exemplo

const testUtils = require('test-utils')
const cardTestUtils = require('../someRepo') // Biblioteca proprietária interna
const cardAccountDB = require('../someRepo') // Biblioteca proprietária interna
const cardConfigDefaultProcessor = process.env.Omitido 
const validUserData = cardTestUtils.getValidUserData
const { assembleExpectedEcardAccount } = require('../someRepo') // Biblioteca proprietária interna

const admin = process.env.ADMIN_USERNAME


// Utilizado para mocar um body de uma requisição válida
const getValidBody = ({ id, password = '123456', number = '123', productId } = {}) => ({
  ...id ? { id } : {},
  encryptedPassword: testUtils.encryptPassword(password),
  deliveryAddress: {
    cep: '12345678',
    street: 'Rua',
    district: 'Bairro',
    city: 'São Paulo',
    state: 'SP',
    number,
    complement: 'Complemento'
  },
  cardText: 'Texto',
  otherInfo: {
    location: {
      lat: 1,
      long: 2
    }
  },
  productId
})

describe('Get card Account', () => {
  before(async ()=>{
    const { token } = await testUtils.cryptoLogin(admin)
    global.token = token
  })
  it('Should validate the input', () => validateInputs())
  it('Should get card account', async () => {
    const accountName = testUtils.generateCpf()
    await createNewAccount(accountName, 40)
    .then(async () => {
      const result = await testUtils.testSuccess(getCardAccount, { body: {document: accountName, productCode: 40} })
      result.should.be.ok()
    })
  })
})

const createNewAccount = async (accountName, productCode) => {
  const productId = 'id-omitido'
  const userData = validUserData(accountName)
  await prepareUserAndLogin(accountName, { userData, group: cardConfigDefaultProcessor }, 500)
  const body = getValidBody({ productId })
  const newAccount = assembleExpectedEcardAccount('active', userData, body, productCode, undefined, productId)
  await cardAccountDB.saveAccount(newAccount)
}

const validateInputs = async (document = 'document-test', productCode = 40) =>  {
  const body = {
    document,
    productCode
  }
  await Promise.all([
    testUtils.testError(getCardAccount, testUtils.buildEvent(undefined), 1000), 
    validateRequiredAndTypeString(body, 'document', 1097, 1099),
    validateRequiredAndTypeNumber(body, 'productCode', 1098, 1100)
  ])
}

const validateRequiredAndTypeString = (body, field, requiredError, invalidError) => {
  return validateTypeString(body, field, invalidError)
    .then(() => validateRequired(body, field, requiredError))
}

const validateRequiredAndTypeNumber = (body, field, requiredError, invalidError) => {
  return validateTypeNumber(body, field, invalidError)
    .then(() => validateRequired(body, field, requiredError))
}

const validateRequired = (body, field, requiredError) => {
  const incomplete = copyWithout(body, field)
  return testUtils.testError(getCardAccount, testUtils.buildEvent(incomplete), requiredError)
}

const validateTypeString = (body, field, invalidError) => {
  const wrongType = copyWith123(body, field)
  return testUtils.testError(getCardAccount, testUtils.buildEvent(wrongType), invalidError)
}

const validateTypeNumber = (body, field, invalidError) => {
  const wrongType = copyWithString(body, field)
  return testUtils.testError(getCardAccount, testUtils.buildEvent(wrongType), invalidError)
}

const copyWithChange = value => (obj, field) => {
  const copied = copy(obj)
  const path = field.split(['.'])
  const target = path.pop()
  path.reverse()
  let accessed = copied
  while (path.length > 0) accessed = accessed[path.pop()]
  accessed[target] = value
  return copied
}

const copyWithout = copyWithChange(undefined)

const copyWith123 = copyWithChange(123)

const copyWithString = copyWithChange('text')

const copy = obj => JSON.parse(JSON.stringify(obj))

const prepareUserAndLogin = async (accountName, userInfo, balance) => {
  await testUtils.createTestUser(accountName, userInfo)
  const [{ token }] = await Promise.all([
    testUtils.cryptoLogin(accountName),
    balance ? testUtils.setBalance(accountName, balance) : Promise.resolve()
  ])
  global.token = token
}