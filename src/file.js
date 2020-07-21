const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

/* Read Data */
const rawData = fs.readFileSync('db.json')
const parsedData = JSON.parse(rawData)

/* Write Data */
const fakeData = { id: uuidv4(), title: 'test' }

const originalPosts = parsedData.post || []

const newData = {
  post: [
    ...originalPosts,
    fakeData,
  ],
}

const updatedData = JSON.stringify(newData)
fs.writeFileSync('db.json', updatedData)
