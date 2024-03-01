const express = require('express')
const createError = require('http-errors')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

require('./initDB')()

const userRouter = require('./Routes/User.route.js');
app.use('/users', userRouter);

const artworkRouter = require("./Routes/Artwork.route.js");
app.use("/artworks", artworkRouter);

const ReportRoute = require('./Routes/Report.route.js');
app.use('/reports', ReportRoute);

const CommentRoute = require('./Routes/Comment.route.js')
app.use('/comments', CommentRoute)

const MessageRoute = require('./Routes/Message.route.js')
app.use('/messages', MessageRoute)

const TagRoute = require('./Routes/Tag.route.js')
app.use('/tags', TagRoute)

const OrderRoute = require('./Routes/Order.route.js')
app.use('/orders', OrderRoute)

const ConversationRoute = require('./Routes/Conversation.route.js')
app.use('/conversations', ConversationRoute)

app.use((req, res, next) => {
  next(createError(404, "Not found"))
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  })
})

app.listen(5000, () => {
  console.log('Server started on port 5000')
})