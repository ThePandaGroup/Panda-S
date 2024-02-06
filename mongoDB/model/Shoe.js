const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/admin', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to admin database');

  const userSchema = new mongoose.Schema({
    user: String,
    pwd: String,
    roles: [String]
  });

  const User = mongoose.model('User', userSchema);

  const newUser = new User({
    user: 'dbAdmin',
    pwd: 'test',
    roles: ['readWriteAnyDatabase', 'dbAdminAnyDatabase', 'clusterAdmin']
  });

  newUser.save((err, user) => {
    if (err) return console.error(err);
    console.log('User saved successfully');
  });
});
