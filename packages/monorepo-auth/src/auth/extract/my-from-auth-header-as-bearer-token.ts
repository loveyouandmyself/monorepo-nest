const AUTH_HEADER = 'authorization';
const BEARER_AUTH_SCHEME = 'bearer';
const re = /(\S+)\s+(\S+)/;

function parseAuthHeader(hdrValue: any): { scheme: string; value: string; } {
  if (typeof hdrValue !== 'string') {
    return null;
  }
  const matches = hdrValue.match(re);
  return matches && { scheme: matches[1], value: matches[2] };
}
    
export const MyFromAuthHeaderAsBearerToken = (req: Request): string | null =>{
  const authSchemeLower = BEARER_AUTH_SCHEME.toLowerCase();
  let token = null;
  if (req.headers[AUTH_HEADER]) {
    const authParams = parseAuthHeader(req.headers[AUTH_HEADER]);
    if (authParams && authSchemeLower === authParams.scheme.toLowerCase()) {
      token = authParams.value;
    }
  }
  return token;
};