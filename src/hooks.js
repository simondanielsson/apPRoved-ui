import { getTokenFromRequest } from '$lib/utils/token.js';

export async function handle({ event, resolve }) {
  const url = event.url.pathname;
  
  const token = getTokenFromRequest(event.request); 

  if (!token && url !== '/login' && url !== '/register') {
    return new Response(null, {
      status: 303, // Redirect
      headers: { location: '/login' }
    });  
  }

  return await resolve(event);
}
