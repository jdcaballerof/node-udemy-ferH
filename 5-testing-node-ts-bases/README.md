# Testing - introducción

## Pruebas unitarias
Probar un componente o funcion en especifico


## Pruebas de integración
Prueba de elementos en conjunto


## Caracteristicas
1. Faciles de escribir
2. Faciles de leer
3. Confiables
4. Rapidas
5. Principalmente unitarias


## Principio AAA
Arrange, Act and Assert (Arreglar, Actuar y Afirmar)

### Arrange - preparamos el estado inicial
- Inicializar variables
- Importaciones necesarias

### Act - aplicar acciones/estimulos
- Llamar o invocar  metodos/clases/funcs
- Simular clicks
- Realizar X acción

### Assert - confirmar el comportamiento
Verificar el (los) resultado(s) esperado(s) 

---
## Configurar ambiente de pruebas
Seguir [Guia de configuración](https://gist.github.com/Klerith/98d7b1bc0f1525e892f260813cad1007) 

> Una vez configurado continuar creando los test

## Metodos mas usados de Jest (en el curso)
- describe
- test / it
- spyOn
- toHaveBeenCalled
- toHaveBeenCalledWith
- expect
- toBe
- toContain
- any
- objectContaining

## Creacion de Tests
Crear la carpeta `src/tests` y tendra todos los archivos, anidados de la misma forma que en src. (/test ~ /src)

### Test 1 - ejemplo basico para entender funcionabilidad
- Las funciones usadas aca añadidas por Jest de forma global.
- 'it' y 'test' sirven para lo mismo. 'it' tiene mas sentido semantico en ingles, ejemplo: "it 'should be true'"
- 'test' no necesariamente va dentro de `describe`, se puede omitir el uso de `describe`, solo ayuda a englobar/categorizar tests dentro de un mismo archivo

```TS
describe('App', () => {
    test('should be true', () => {
        expect(true).toBe(true)
    })

    it('should be true too', () => {
        expect(true).toBe(true)
    })
})

test('should be false', () => {
    expect(false).toBe(false)
})
```

> Una vez creados, se pueden ejecutar todos los test usando el comando `npm run test` o `npm run test:watch` para estar observando los archivos .test 

### Test 2 - Siguiendo principio AAA

```TS
// Importaciones 
const [num1, num2] = [10, 20]


describe('App', () => {

    it('should be 30', () => {
        // 1. Arrange (Set)
        const n1 = num1
        const n2 = num2

        // 2. Act (Do...)
        const res = n1 + n2

        // 3. Assert (Confirm)
        expect(res).toBe(30)
    })
})
```

Como ejemplo se menciona que si fuera `.toBe(35)` entonces daria error, lo que significa que puede que este mal la logica o el test, concluyendo que por aplicar tests aun asi se puede tener errores

### Test 3 - Ejemplo de uso de codigo async
Se hace uso de la funcion `done()` para decir a Jest cuando terminar el test

```TS
test( 'getuserById should return an error if user does NOT exist', (done) => {
    const id = 10   // Usuario 10 NO existe

    // El callback se ejecuta una vez que la paticion termina
    getUserById( id, (user, error) => {
        expect( error ).toBe(`User not found with id ${id}`)
        expect( user ).toBeUndefined()

        // Con done() indicamos cuando terminar el test, hasta entonces, espera.
        done()
    })
})
```

### Test 4 - uso de spyOn de Jest
`spyOn` es una herramienta poderosa en Jest para espiar y simular funciones, lo cual es esencial para escribir pruebas unitarias efectivas y mantener tu código bien testeado.

Aca lo que se logra es que el metodo `getFullYear` regrese, en este caso, 2022. Consiguiendo que no importa cuando se ejecute el Test, no se verá afectado por el año actual real

```TS
test('getCurrentYear should return mocked year 2022', () => {
  const spy = jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(2022);

  const year = getCurrentYear();

  expect(year).toBe(2022);

  spy.mockRestore(); // Restaurar la implementación original
});
```

Donde 

```TS
// dateUtils.js
export function getCurrentYear() {
  const date = new Date();
  return date.getFullYear();
}
```