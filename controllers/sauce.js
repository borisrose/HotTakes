const Sauce = require('../models/Sauce');



exports.getAllSauces = (req, res, next) => {
    
  Sauce.find().then(
      
    (sauces) => {


      const mappedSauces = sauces.map((oneSauce) => {
        return oneSauce;
      });

      res.status(200).json(mappedSauces);

    }
  ).catch(
    () => {
      res.status(500).send(new Error('Database error!'));
    }
  );


};





exports.getOneSauce = (req, res, next) => {

  Sauce.findById(req.params.id).then(
    (oneSauce) => {

      if (!oneSauce) {
        return res.status(404).send(new Error('Sauce not found!'));
      }
      
      res.status(200).json(oneSauce);
    }
  ).catch(
    () => {
      res.status(500).send(new Error('Database error!'));
    }
  )
};


exports.saveOneSauce = (req, res, next) => {

    if (!req.body.sauce || !req.body.image) {
        return res.status(400).send(new Error('Bad request!'));
    }

    delete req.body._id;
    
    const sauce = new Sauce({
      ...req.body
    });

    sauve.save()
      .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
      .catch(error => res.status(400).json({ error }));
  


};


exports.updateOneSauce = async (req, res, next) => {
    const id = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).send(`No Sauce Image with id: ${userId}`);

    const path = req.file.path.replace(/\\/g, "/");

    await User.findByIdAndUpdate(id, req.body = {ProfilePicture: "http://localhost:5000/" + path}, { new: true });
    res.json(updateAnUser);
}

//router.delete('/:id', auth, sauceCtrl.deleteOneSauce);
//router.post('/:id/like', auth, sauceCtrl.likeOneSauce);


exports.deleteOneSauce =  (req,res,next) => {

        Sauce.findOne({_id:req.params.id}).then(
          (sauce) => {
              if(!sauce) {
                return res.status(404).json({
                  error: new Error('Objet non trouvé !')
                });
              }
              if(sauce.userId !== req.auth.userId){
                return res.status(401).json({
                  error: new Error('Requête non autorisée!')
                });
              }
              Sauce.deleteOne({_id:res.params.id})
              .then(
                  ()=> res.status(200).json({message:'Deleted !'})
              )
              .catch(
                  error=> res.status(400).json({error})
              )

          }
          
        )
       
}

exports.likeOneSauce = (req,res,next) => {

        Product.updateOne({_id:req.params.id}, {...req.body, _id:req.params.id})
            .then( 
                product => res.status(200).json({message: 'Modified !'})
            )
            .catch(
                error => res.status(400).json(
                    {error}
                )
            )
}
