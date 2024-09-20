import { faker } from "@faker-js/faker";
import { createHash } from "./hashFunctions.js";
faker.locale = "es";

export const generateUser = async (petsCount) => {
  const pets = ['Lola', ' Pepa', 'Furia', 'Apolo', 'Anubis', 'Humo'];
  
  if(petsCount){
    while(pets.length <= petsCount) {
      pets.push(pets[faker.random.number(pets.length - 1 )])
    }
  }

  const password = await createHash('coder123')   
  return {
    password,
    role: faker.helpers.arrayElement(['admin', 'user']),
    pets: petsCount ? faker.helpers.arrayElements(pets, Number(petsCount)) : []
  }
  
}
  


