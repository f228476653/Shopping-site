const MongoClient = require('mongodb').MongoClient;

const handleRegister = (req, res, url, bcrypt) => {
  const { email, name, password } = req.body;
  console.log(email)
  console.log(password)
  if (!email || !password) {
    return res.status(400).json('incorrect form submission');
  }
  const hash = bcrypt.hashSync(password);
  const user = { email: email, password: hash};
    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      const dbo = db.db("shoppingWeb");
      dbo.collection("user").insertOne(user, (error, result) => {
        if (error) {
            res.send("Error", error);
            return;
        }
        res.send(result);
        db.close();
      });
    });
}

module.exports = {
  handleRegister: handleRegister
};


