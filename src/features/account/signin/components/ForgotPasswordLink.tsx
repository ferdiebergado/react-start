import { paths } from '@/routes';
import { memo } from 'react';
import { Link } from 'react-router';

const ForgotPasswordLink = memo(() => (
  <Link
    to={paths.account.forgotPassword}
    className="ml-auto inline-block text-sm underline"
  >
    Forgot your password?
  </Link>
));

export default ForgotPasswordLink;
