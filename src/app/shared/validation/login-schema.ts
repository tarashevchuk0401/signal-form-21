import { debounce, required, schema } from '@angular/forms/signals';

export const loginSchema = schema<LoginData>((s) => {
  required(s.email, { message: 'Field is required' });
  required(s.password, { message: 'Field is required' });
  debounce(s, 500);
});
