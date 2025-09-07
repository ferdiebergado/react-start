import { paths } from '@/routes';
import type { FC } from 'react';
import { Link } from 'react-router';

const SigninBlock: FC = () => {
  return (
    <div className="mt-4 text-center text-sm">
      Already have an account?{' '}
      <Link to={paths.account.signin} className="underline underline-offset-4">
        Sign In
      </Link>
    </div>
  );
};

export default SigninBlock;
