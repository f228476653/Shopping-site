const MongoClient = require('mongodb').MongoClient;

const placeOrder = (req, res, url) => {
  const { order, user_id, total, created } = req.body;
  const user = { order: order, user_id: user_id,total:total,created:created};
    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      const dbo = db.db("shoppingWeb");
      dbo.collection("order").insertOne(user, (error, result) => {
        if (error) {
            res.send("Error", error);
            return;
        }
        res.send(result);
        db.close();
        return;
      });
    });
}
const getOrder =(req, res, url) =>{
    const id = req.params.user_id;
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const dbo = db.db("shoppingWeb");
        dbo.collection("order").find({"user_id":id}).toArray((error, result) => {
            if (error) {
                res.send("Error", error);
                return;
            }
            res.send(result);
            db.close();
            return;
        });
    });
}
module.exports = {
    placeOrder: placeOrder,
    getOrder: getOrder
};


