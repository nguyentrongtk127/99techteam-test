import { env } from './config/env';
import { createApp } from './app';

// Start the server
createApp().then((app) => {
  app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
  });
}).catch((err) => {
    console.error('Error:', err);
    process.exit(1);
})
