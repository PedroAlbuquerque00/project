const UserRepository = require('../repositories/UserRepository');

class UserController {
  async index(req, res) {
    const { order } = req.query;

    const users = await UserRepository.findAll();


    if(!users){
      res.status(400).json({ error: 'Users not found!'});
      return;
    }

    const sortedUsers = users.sort((a, b) => {
      if(order === 'desc'){
        return a.id < b.id ? 1 : -1;
      }

      return a.id > b.id ? 1 : 1;
    });

    res.status(200).json(sortedUsers);
  }

  async show(req, res) {
    const { id } = req.params;

    const user = await UserRepository.findById(id);

    if(!user){
      res.status(400).json({ error: 'User not found!'});
      return;
    }

    res.status(200).json(user);

  }

  async store(req, res){
    const { name, lastName, email, password } = req.body;

    if(!name || !lastName || !email || !password){
      res.status(400).json({error: 'Missing data'});
      return;
    }

    if(!UserRepository.findByEmail(email)){
      res.status(401).json({ error: 'Email alredy registered'});
      return;
    }

    const registeredUser = await UserRepository.create(name, lastName, email, password);

    if(!registeredUser){
      res.sendStatus(500);
      return;
    }

    res.status(200).json(registeredUser);

  }

  async update(req, res) {
    const { id, name, lastName, email, password } = req.body;

    const idExist = await UserRepository.findById(id);

    if(!idExist) {
      res.send(400).json({ error: 'User not found'});
      return;
    }

    if(!name || !lastName || !email || !password){
      res.send(400).json({ error: 'Missing data'});
      return;
    }

    const user = await UserRepository.update(id, name, lastName, email, password);

    if(!user){
      res.sendStatus(500);
      return;
    }

    res.status(200).json(user);

  }

  async delete(req, res) {
    const { id } = req.params;

    const idExist = await UserRepository.findById(id);

    if(!idExist){
      res.send(401).json({ error: 'User not found'});
      return;
    }

    await UserRepository.delete(id);

    res.sendStatus(204);

  }

}


module.exports = new UserController();
