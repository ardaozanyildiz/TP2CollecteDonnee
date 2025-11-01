//Poiur donner un feedback de si sa marche ou pas
export const logger = {
    info: (msg: string) => console.log(`[information recu] ${msg}`),
    error: (msg: string) => console.error(`[message derreur] ${msg}`)
}

