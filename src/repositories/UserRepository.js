let users = [
  {
    id: 1,
    name: 'Teste01',
    lastName: 'testing',
    email: 'teste01@mail.com',
    password: '123456',
    subscribeAt: '06/06/2023'
  },
  {
    id: 2,
    name: 'Teste02',
    lastName: 'testing',
    email: 'teste02@mail.com',
    password: '123456',
    subscribeAt: '01/06/2023'
  },
  {
    id: 3,
    name: 'Teste03',
    lastName: 'testing',
    email: 'teste03@mail.com',
    password: '123456',
    subscribeAt: '20/03/2023'
  },
  {
    id: 4,
    name: 'Teste04',
    lastName: 'testing',
    email: 'teste04@mail.com',
    password: '123456',
    subscribeAt: '03/01/2023'
  },
];

class UserRepository {
  findAll() {
    return new Promise((res) => {
      res(users);
    });
  }

  findById(id) {
    return new Promise((res) => {
      res(users.find(user => user.id === Number(id)));
    });
  }

  findByEmail(email){
    return new Promise((res) => {
      res(users.find(user => user.email === email));
    });
  }

  create(name, lastName, email, password) {
    return new Promise((res) => {

      users.push({
        id: users.length + 1,
        name,
        lastName,
        email,
        password,
        subscribeAt: Date.now()
      });

      res(users[users.length - 1]);
    });
  }

  update(id, name, lastName, email, password) {
    return new Promise((res) => {
      users = users.map(user => {
        if(user.id === id) return { ...user, name, lastName, email, password };
        return user;
      });

      res(this.findById(id));
    });
  }

  delete(id) {
    return new Promise((res) => {

      users = users.filter(user => user.id !== Number(id));

      res({ok: true});
    });
  }

}

module.exports = new UserRepository();
