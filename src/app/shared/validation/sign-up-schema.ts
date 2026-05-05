import { debounce, required, schema } from '@angular/forms/signals';
import { SignUpDto } from 'src/app/shared/interfaces/sign-up.dto';

export const signUpSchema = schema<SignUpDto>((schema) => {
  required(schema.email, { message: 'Email is required' });
  required(schema.password, { message: 'Password is required'});
  // debounce(schema, 500);
});
