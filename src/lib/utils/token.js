import jwt from 'jsonwebtoken';

export function getTokenFromRequest(request) {
  const authorizationHeader = request.headers.get('Authorization');
  
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authorizationHeader.split(' ')[1];

  return token || null;
}

/**
 * Verifies a JWT and extracts the user information.
 * @param {string} token - The JWT token to verify.
 * @returns {Object|null} - The decoded user information or null if the token is invalid.
 */
export function verifyToken(token) {
  try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: ['HS256'],
        });

        return decoded;
    } catch (error) {
        console.error('JWT verification failed:', error);
        return null;
    }

}
