const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const requirementRoutes = require('./routes/Requirement');
const attachmentRoutes = require('./routes/Attachment');

const app = express();
const port = 3000;

app.use(bodyParser.json())
app.use(cors());
app.use(express.json());
app.use('/requirement', requirementRoutes);
app.use('/attachment', attachmentRoutes);

app.get('/', (req, res) => {
    res.send('Backend funcionando');
});

app.listen(port, () => {
    console.log(`App corriendo en puerto ${port}.`)
});