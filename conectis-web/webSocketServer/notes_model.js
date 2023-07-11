const Pool = require('pg').Pool
const pool = new Pool({
    user: 'dartflow',
    host: 'localhost',
    database: 'dartflow_db',
    password: 'dartflow',
    port: 5432,
});

const getNote = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM notes ORDER BY id', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }
  const createNote = (body) => {
    return new Promise(function(resolve, reject) {
      const { name, email } = body
      pool.query('INSERT INTO notes (start_time, end_time, note) VALUES ($1, $2, $3) RETURNING *', [start_time, end_time, note], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`A new data has been added added: ${results.rows[0]}`)
      })
    })
  }
  const deleteNote = () => {
    return new Promise(function(resolve, reject) {
      const id = parseInt(request.params.id)
      pool.query('DELETE FROM notes WHERE id = $1', [id], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`Data deleted with ID: ${id}`)
      })
    })
  }
  
  module.exports = {
    getNote,
    createNote,
    deleteNote,
  }