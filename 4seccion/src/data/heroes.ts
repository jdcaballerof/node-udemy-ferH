interface Hero {
    id: number;
    name: string;
    owner: 'DC'|'Marvel';
}


export const HEROS: Hero[] = [
    { id: 1, name: 'batman', owner: 'DC'},
    { id: 2, name: 'superman', owner: 'DC'},
    { id: 3, name: 'hulk', owner: 'Marvel'},
]