/* 
  Este código foi criado recentemente para realizar uma atualização em uma tabela específica do DynamoDB 
  O atributo createdBy anteriormente era preenchido com o email do usuário e foi trocado para o username
  Como a tabela em questão tinha poucos registros e em todos eles o atributo createdBy repetia-se entre três emails, foi criado apenas um dicionário mocado
  para relacionar email com o usuário responsável
  Os nomes e endereços de emails foram omitidos, pois trata-se de um código utilizado internamente na empresa 
*/

process.env.DB_ENDPOINT = 'url-omitida'

const aws = require('aws-sdk')
const dynamoUtils = require('dynamo-utils')(aws)
const internalProcessTable = 'nomeTabelaNoDynamo' // The name of the table that will be updated

const main = async () => {
  const query = {
    TableName: internalProcessTable, 
    IndexName: 'type',
    KeyConditionExpression: '#type = :type',
    ExpressionAttributeNames:{
      '#type': 'type',
    },
    ExpressionAttributeValues: {
      ':type': 'someType',
    }
  }

 const staticUsers = {
    'exemplo@email.com.br' : 'nome.usuario',
    'exemplo@email.com.br' : 'nome.usuario',
    'exemplo@email.com.br': 'nome.usuario',
  }

  await dynamoUtils.queryAndProcess(query, async records => {
    await Promise.all(
      records.map(async record => {
        if(!staticUsers[record.createdBy]) return
        await dynamoUtils.update(internalProcessTable, { username: record.username, createAt: record.createAt }, { createdBy: staticUsers[record.createdBy] })
      })
    )
  })
  
  return true
}

main()