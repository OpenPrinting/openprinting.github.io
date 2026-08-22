import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { toPrinterSummary } from '../../lib/foomatic/catalog.ts'
import type { Printer } from '../../lib/foomatic/types.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.join(__dirname, "..", "..")

type PrintersPayload = {
  printers: Printer[]
}

async function splitPrintersData() {
  try {
    console.log('Starting printer data splitting process...')
    
    const printersPath = path.join(ROOT_DIR, 'public', 'foomatic-db', 'printers.json')
    const data = JSON.parse(await fs.readFile(printersPath, 'utf-8')) as PrintersPayload
    
    console.log(`Found ${data.printers.length} printers to process`)
    
    const printersDir = path.join(ROOT_DIR, 'public', 'foomatic-db', 'printers')
    await fs.mkdir(printersDir, { recursive: true })
    
    const printersMap = {
      printers: data.printers.map(toPrinterSummary)
    }
    const mapPath = path.join(ROOT_DIR, 'public', 'foomatic-db', 'printersMap.json')
    // Minified on purpose: this artifact is fetched by the browser (directory
    // page and, later, the assistant catalogue), and pretty-printing it costs
    // ~490 KB of raw payload for zero consumer benefit.
    await fs.writeFile(mapPath, JSON.stringify(printersMap))
    console.log(`Created lightweight index: ${mapPath}`)
    let processed = 0
    const batchSize = 100
    
    for (let i = 0; i < data.printers.length; i += batchSize) {
      const batch = data.printers.slice(i, i + batchSize)
      
      await Promise.all(batch.map(async (printer: Printer) => {
        const printerPath = path.join(printersDir, `${printer.id}.json`)
        await fs.writeFile(printerPath, JSON.stringify(printer, null, 2))
        processed++
      }))
      
      if (processed % 500 === 0) {
        console.log(`Processed ${processed}/${data.printers.length} printers...`)
      }
    }
    
    console.log(`Successfully split ${data.printers.length} printers into individual files`)
    console.log(`Individual files saved to: ${printersDir}`)
    const originalSize = (await fs.stat(printersPath)).size
    const mapSize = (await fs.stat(mapPath)).size
    const savings = ((originalSize - mapSize) / originalSize * 100).toFixed(1)
    
    console.log(`Size comparison:`)
    console.log(`   Original printers.json: ${(originalSize / 1024 / 1024).toFixed(2)} MB`)
    console.log(`   Lightweight printersMap.json: ${(mapSize / 1024).toFixed(2)} KB`)
    console.log(`   Initial load size reduction: ${savings}%`)
    
  } catch (error) {
    console.error(' Error splitting printer data:', error)
    process.exit(1)
  }
}

splitPrintersData()
