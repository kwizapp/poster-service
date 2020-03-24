const micro = require('micro')
const request = require('supertest')

const server = require('../src/index')

let endpoint = null
let service = null

beforeEach(() => {
  service = micro(server)
  endpoint = request(service)
})

afterEach(() => {
  service.close()
})

describe('poster-service', () => {
  it('should fetch a movie poster with a correct id', async () => {
    const response = await endpoint.get('/?id=tt3896198')
    const expected =
      'https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg'

    expect(response.body.poster).toEqual(expected)
  })

  it('should return 400 if id url parameter is not specified', async () => {
    const response = await endpoint.get('/')
    expect(response.statusCode).toEqual(400)
  })

  it('should return 400 if id url parameter is empty', async () => {
    const response = await endpoint.get('/?id=')
    expect(response.statusCode).toEqual(400)
  })

  it('should return 400 if id url parameter has the wrong format', async () => {
    const response = await endpoint.get('/?id=xx3896198')
    expect(response.statusCode).toEqual(400)
  })

  it('should return a movie poster with a specified size', async () => {
    const response = await endpoint.get('/?id=tt3896198&size=450')
    const expected =
      'https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX450.jpg'

    expect(response.body.poster).toEqual(expected)
  })

  it('should return 400 if specified size has the wrong format (string)', async () => {
    const response = await endpoint.get('/?id=tt3896198&size=hello')
    expect(response.statusCode).toEqual(400)
  })

  it('should return 400 if specified size has the wrong format (number too big or too small)', async () => {
    // size too big
    const response = await endpoint.get('/?id=tt3896198&size=9999')
    expect(response.statusCode).toEqual(400)
    // size too small
    const response2 = await endpoint.get('/?id=tt3896198&size=299')
    expect(response2.statusCode).toEqual(400)
  })
})
