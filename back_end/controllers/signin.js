const MongoClient = require('mongodb').MongoClient;
const handleSignin = (url, bcrypt) => (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json('incorrect form submission');
  }

    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      const dbo = db.db("shoppingWeb");
      dbo.collection("user").find({"email":email}).toArray((error, result) => {
          if (error) {
              res.send("Error", error);
              return;
          }
          if (result.length>0){
            if(bcrypt.compareSync(password, result[0].password)){
              res.send(result[0]);
            };
          }else{
            res.status("400").send("Account or Password is wrong")
          }
          db.close();
          return;
      });
  });
}

module.exports = {
  handleSignin: handleSignin
}