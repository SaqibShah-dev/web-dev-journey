const config = require('./config/env'); // validates env vars on boot, first thing
const app = require('./app');

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});
