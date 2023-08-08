const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const { sequelize } = require('./models');

const authRoutes = require('./routes/auth')
const itemRoutes = require('./routes/items')
const fileRoutes = require('./routes/files')
const userRoutes = require('./routes/users')
const cartRoutes = require('./routes/cart')
const latestRoutes = require('./routes/latest')
const orderRoutes = require('./routes/order')

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())



app.use('/auth', authRoutes);
app.use('/file', fileRoutes)
app.use('/item', itemRoutes)
app.use('/user', userRoutes)
app.use('/cart', cartRoutes)
app.use('/latest', latestRoutes)
app.use('/order', orderRoutes)





// sequelize.sync({ force: true }).then((result) => {
//     console.log("migration successful");
// }).catch(err => {
//     console.log(err.message);
// });

module.exports = app;