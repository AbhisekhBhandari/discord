import { createClient } from 'graphql-ws';

const client = createClient({
  url: 'wss://localhost:5000/graphql',
});

client.subscribe(
  {
    query: 'subscription { greeting }',
  },
  {
    next: (data) => {
      console.log('data', data);
    },
    error: (error) => {
      console.error('error', error);
    },
    complete: () => {
      console.log('no more greetings');
    },
  }
);