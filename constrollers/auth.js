const jwt = require("jsonwebtoken");
const models = require("../models");
const User = models.user;
const Pet = models.pet;
const Spesies = models.spesies;

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email, password } });
    if (user) {
      const token = jwt.sign({ user_id: user.id, level:user.level}, process.env.SECRET_KEY);
      res.send({ email, token, message: "success login" });
    } else {
      res.status(401).send({ message: "Invalid login" });
    }
  } catch (err) {
    console.log(err);
  }
};

// REGISTER
exports.register = async (req, res) => {
try{
  const {breder, email, password, phone, addres,level, pet} = req.body;
  const {name, gender} = pet;
   const spesies = pet.spesies.id;
  const age = pet.age.id;

  const tes = await User.findOne({where: { email } });
  if(tes) {
    res.status(401).send({status:false, message: "email anda sudah digunakan"});
  }else{
    const userKirim = await User.create({
       breder, email, password, phone, addres, level
    });

    const user = userKirim.dataValues.id;
    const petKirim =await Pet.create({
      name, gender, spesies, age, user
    });
 if(userKirim && petKirim){
  const token = jwt.sign({user_id:user.id, level:"user"}, process.env.SECRET_KEY);
  res.status(200).send({email, token,  message: "success register"});
 }else{
  res.status(401).send({status: false, message: 'register gagal'});
 }
}
}catch (err){
  console.log(err);
}
};
