import { HEROS } from "../data/heroes"


export const findHeroById = (id:number) => {
    const hero = HEROS.find( hero => hero.id === id )

    return hero
}