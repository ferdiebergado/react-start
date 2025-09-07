import { paths } from '@/routes';
import { type FC } from 'react';
import { Link } from 'react-router';

const SignupBlock: FC = () => (
  <div className="mt-4 text-center text-sm">
    Don&apos;t have an account?{' '}
    <Link to={paths.account.signup} className="underline">
      Sign up
    </Link>
  </div>
);

export default SignupBlock;
