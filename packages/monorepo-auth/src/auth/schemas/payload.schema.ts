export class PayloadSchema{
  // 登录用户ID
  id: string

  // jwt的签发时间
  iat: number

  // jwt的过期时间
  exp: number
}