/*export default (req, res) => {
    console.log(req.query.offset)
    pool.query(
        'SELECT name FROM key_words order by id limit 50 OFFSET $1',
        [+req.query.offset],
          (err, db_res) => {
              if(!err){
                if(db_res['rows'].length==0){
                    res.status(200).json({limit:true})
                }else{
                    res.status(200).json({chunk:db_res['rows']})
                }
              }else{
                res.status(200).json({err:true})
              }
        }
    )   
}

*/
/*
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
*/

export default (req, res) => {
 /* console.log(req.query.offset)
  pool.query(
      'SELECT name FROM key_words order by id limit 50 OFFSET $1',
      [+req.query.offset],
        (err, db_res) => {
            if(!err){
              if(db_res['rows'].length==0){
                  res.status(200).json({limit:true})
              }else{
                  res.status(200).json({chunk:db_res['rows']})
              }
            }else{
              res.status(200).json({err:true})
            }
      }
  ) */
  db.all(
    `SELECT name FROM key_words order by id limit 50 OFFSET ?`,
    [+req.query.offset],
    (err, db_res) => {
        if(!err){
          if(db_res.length==0){
              res.status(200).json({limit:true})
          }else{
              res.status(200).json({chunk:db_res})
          }
        }else{
          res.status(200).json({err:true})
        }
    }
  )   
}