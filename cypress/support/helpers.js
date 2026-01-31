import { faker } from '@faker-js/faker'

export function getRandomNumber() {
  return new Date().getTime()
}

export function getRandomEmail() {
  return `qa-teste-${getRandomNumber()}@test.com`
}

export function createUserAddress() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    company: `Pgats ${faker.company.name()}`,
    address: faker.location.streetAddress(),
    country: 'Canada',
    state: faker.location.state(),
    city: faker.location.city(),
    zipCode: faker.location.zipCode(),
    mobile: '111 222 3333'
  }
}
