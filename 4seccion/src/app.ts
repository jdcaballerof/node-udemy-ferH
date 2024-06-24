import { findHeroById } from "./services/hero.services";



const id = 10
const hero1 = findHeroById( id )

console.log(hero1?.name ?? `Not founded hero ${id}`);