const { json } = require('express');
const Sauce = require('../models/Sauce');



exports.getOneSauce = (req, res, next) => {
    
    
    Sauce.findOne({_id: req.params.id})
      .then( sauce => {

        console.log(sauce)
        res.status(200).json(sauce)
      }
        )
      .catch(error => res.status(404).json({message : error}))


}


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




exports.saveOneSauce = (req, res, next) => {
 
   
    if (!req.body.sauce || !req.file) {
        return res.status(400).send(new Error('Bad request!'));
    }

    const sauceObject = JSON.parse(req.body.sauce);
    
  
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
    });
    sauce.save()
      .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
      .catch(error => {

        console.log(error)
        res.status(400).json({ message : error })
      });
  


};


exports.updateOneSauce = (req, res, next) => {

  if(!req.body) {
    return res.status(400).send(new Error('Bad Request'))
  }

  if(req.file){
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
      _id:req.params.id
    });

    Sauce.updateOne({_id: req.params.id}, sauce)
      .then(()=> res.status(200).json({ message : 'Object modifié'}))
      .catch(error => res.status(400)/json({error}))

  }else{

    Sauce.updateOne({_id: req.params.id}, {...req.body, _id:req.params.id})
    .then(()=> res.status(200).json({ message : 'Objet modifié'}))
    .catch(error => res.status(400)/json({error}))

  }
}

exports.deleteOneSauce = (req, res, next) => {

    Sauce.findOne({_id:req.params.id})
      .then(

          (sauce) => {

            if(!sauce) {

              res.status(404).json({
                error : new Error('Aucune sauce')
              });
            }

            if(sauce.userId !== req.auth.userId){

              res.status(400).json({
                error: new Error('Unauthorized request')
              });
            }
            Sauce.deleteOne({_id: req.params.id}).then(

              ()=> {
                res.status(200).json({

                  message: 'Deleted'
                
                });

              }

            ).catch(

                (error) => {
                  res.status(400).json({
                    error: error
                  });
                }


            );


          }


      )


};






exports.likeOneSauce = (req,res, next) => {

    if(!req.body || !req.body.userId  || !req.body.like){
      return res.status(400).send(new Error('Bad request!'));
    }

    Sauce.findOne({_id:req.params.id})
      .then(

          (s) => {

              console.log(s);

              if(!s) {

                res.status(404).json({
                  error : new Error('Aucune sauce')
                });
              }

              if(s.userId !== req.auth.userId){

                res.status(400).json({
                  error: new Error('Unauthorized request')
                });
              }

              const sauceObject = JSON.parse(s)
              console.log('Sauce Object : ', sauceObject);
              
              let sauce = new Sauce({...sauceObject});
              const isUserInLikesArray = (sauce.usersLiked.filter(user => user = req.body.userId)).length === 1 ? true : false; 
              const isUserInDislikesArray = (sauce.userdisLiked.filter(user => user = req.body.userId)).length === 1 ? true : false; 
              if(isUserInLikesArray && !isUserInDislikesArray){
                  // means that the user likes the item and does not dislike it
                  if(req.body.like === 1){
                    return 
                  }
                  else if(req.body.like === 0){

                    sauce.likes -=1;
                    sauce.usersLiked = sauce.usersLiked.filter(user => user != req.body.userId)
                    
                  }
                  else if(req.body.like === -1){

                    sauce.dislikes = 1;
                    sauce.likes -= 1;
                    sauce.usersLiked = sauce.usersLiked.filter(user => user != req.body.userId)
                    sauce.usersDisliked.push(req.body.userId);
                  }
                  Sauce.updateOne({_id: req.params.id}, sauce)
                  

            

              }else if(!isUserInLikesArray && isUserInDislikesArray){
                  // means the user does not like the item and dislike it
          
                if(req.body.like === 1){
                  sauce.likes += 1
                  sauce.dislikes -= 1;
                  sauce.usersDisliked = sauce.usersDisLiked.filter(user => user != req.body.userId)
                  sauce.usersLiked.push( req.body.userId)
                }
                else if(req.body.like === 0){
                  sauce.dislikes -=1;
                  sauce.usersDisliked = sauce.usersDisliked.filter(user => user != req.body.userId)
                  console.log(sauce);
                }
                else if(req.body.like === -1){

                  return;

                }
                Sauce.updateOne({_id: req.params.id}, sauce)

            } else if(!isUserInLikesArray && !isUserInDislikesArray) {

              if(req.body.like === 1){
                sauce.likes += 1;
                sauce.usersLiked.push( req.body.userId);
              }
              else if(req.body.like === 0){
                return;
              }
              else if(req.body.like === -1){

                sauce.dislikes = 1;
                sauce.usersDisliked.push(req.body.userId);

              }
              
              Sauce.updateOne({_id: req.params.id}, sauce)

            }
        }
      )

}

