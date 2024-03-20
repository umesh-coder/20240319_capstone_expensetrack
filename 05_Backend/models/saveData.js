const mongoose = require('mongoose');

const savedata = mongoose.Schema({
    username: ({ type: String }),
    name: ({ type: String }),
    firstlogindate: ({ type: String }),
    lastlogindate: ({ type: String }),
    expenselogged: ({ type: Number }),
    userid: ({ type: String }),
});

module.exports = mongoose.model('savedatas', savedata);