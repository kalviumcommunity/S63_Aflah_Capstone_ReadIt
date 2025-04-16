const express = require("express");

const app = express();

app.use('/api/users', require('../Backend/routes/userRoutes'));


const PORT =8000;

app.get('/', (req, res) => {
    res.send('Api is running...');
});


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})
