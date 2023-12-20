#! /usr/bin/env node

import fs from 'node:fs/promises'

const main = async () => {
  const items = []
  const csv_paths = (await fs.readdir('data')).map(path => `data/${path}`)
  for (const csv_path of csv_paths) {
    const type = csv_path.split('/')[1].split('.')[0].split('_')[1]
    const csv = await fs.readFile(csv_path, 'utf-8')
    const [header, ...lines] = csv.split('\n')
    const keys = header.split(',')
    for (const line of lines) {
      const values = line.split(',')
      const item = { type }
      for (const [index, key] of keys.entries()) {
        item[key] = values[index]
      }
      items.push(item)
    }
  }
  console.log(items)
}
main()
