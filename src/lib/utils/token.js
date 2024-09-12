export function getTokenFromRequest(request) {
  const authorizationHeader = request.headers.get('Authorization');
  
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authorizationHeader.split(' ')[1];

  return token || null;
}
