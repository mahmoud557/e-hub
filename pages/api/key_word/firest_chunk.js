//import { Pool, Client } from 'pg'
/*export default (req, res) => {
    var offset=0;
    pool.query(
        'SELECT name FROM key_words order by id limit 50',
          (err, db_res) => {
              if(!err){
                res.status(200).json( db_res['rows'])
              }else{
                res.status(200).json({err:true})
              }
        }
    )
    
}*/
export default (req, res) => {
  db.all(
    `SELECT name FROM key_words order by id limit 50`,
    (err, db_res) => {
      if(!err){
        res.status(200).json(db_res)
      }else{
        res.status(200).json({err:true})
      }
    }
  )
}