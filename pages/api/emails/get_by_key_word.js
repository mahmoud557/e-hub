/*export default (req, res) => {
    pool.query(
        'SELECT * FROM emails where key_word=$1 order by id ',
        [req.query.key_word],
          (err, db_res) => {
              console.log(db_res['rows'])
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
}*/

export default (req, res) => {
 /* pool.query(
      'SELECT * FROM emails where key_word=$1 order by id ',
      [req.query.key_word],
        (err, db_res) => {
            console.log(db_res['rows'])
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
    `SELECT * FROM emails where key_word=? order by id`,
    [req.query.key_word],
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