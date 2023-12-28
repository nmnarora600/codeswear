import Connectdb from "@/middleware/mongoose";
import Product from "@/models/Product";

const AddProducts = async (req, res) => {
  if (req.method == "POST") {
    try {
      if (Array.isArray(req.body)) {
        for (let i = 0; i < req.body.length; i++) {
          let form = req.body[i];
          if (
            form.availableQty == "" ||
            form.title == "" ||
            form.color == "" ||
            form.size == "" ||
            form.price == "" ||
            form.category == "" ||
            form.desc == "" ||
            form.img == "" ||
            form.slug == ""
          ) {
            throw "Some Values are missing";
          }

          let p = new Product({
            title: req.body[i].title,
            slug: req.body[i].slug,
            desc: req.body[i].desc,
            img: req.body[i].img,
            category: req.body[i].category,
            size: req.body[i].size,
            color: req.body[i].color,
            price: req.body[i].price,
            availableQty: req.body[i].availableQty,
          });

          await p.save();
          res.status(200).json({ success: "added" });
        }


      } else {
        let form = req.body;
        if (
          form.availableQty == "" ||
          form.title == "" ||
          form.color == "" ||
          form.size == "" ||
          form.price == "" ||
          form.category == "" ||
          form.desc == "" ||
          form.img == "" ||
          form.slug == ""
        ) {
            return res.status(500).json({ error: "Some Fields are missing" });
        }
        let x=await Product.findOne({slug:form.slug});
        if(x){
          console.log(x);
          return  res.status(500).json({ error: "DUPLICATE SLUG" });
        }
       
        let p = new Product({
          title: req.body.title,
          slug: req.body.slug,
          desc: req.body.desc,
          img: req.body.img,
          category: req.body.category,
          size: req.body.size,
          color: req.body.color,
          price: req.body.price,
          availableQty: req.body.availableQty,
        });
        await p.save();
        console.log("added", form.title)
        return res.status(200).json({ success: "added" });
      }
    } catch (error) {
        console.log(error)
      res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
  } else {
    res.status(400).json({ error: "method not allowed" });
  }
  return res.status(200).json({ e: "no resp" });
};

export default Connectdb(AddProducts);
