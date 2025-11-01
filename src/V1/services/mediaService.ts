//Ce fichier permet de simuler une base de donnees avec un fichier db.json
//Pour rajouter, enlever ou modifier des donnees
import { readFileSync, writeFileSync } from 'fs'
import path from 'path'

// Use project root to locate the JSON file reliably in ESM/CommonJS
const DB_PATH = path.join(process.cwd(), 'src', 'V1', 'data', 'db.json')
//Lire
export function readData() {
    const data = readFileSync(DB_PATH, 'utf-8')
    return JSON.parse(data)
}
//Ecrire
export function writeData(data: any) {
    writeFileSync(DB_PATH, JSON.stringify(data, null, 2))
}