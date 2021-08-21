import { Resolver } from '@nestjs/graphql';
import { AuthService } from '../services';

@Resolver('auth')
export class AuthResolver{
  constructor(private readonly authService: AuthService) {}

}