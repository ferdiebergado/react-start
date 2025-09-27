import ErrorWrapper from '@/components/error/ErrorWrapper';
import NotFound from '@/components/error/NotFound';
import Spinner from '@/components/navigation/Spinner';
import {
  api,
  apiRoutes,
  handleAPIError,
  type SuccessResponse,
} from '@/lib/api';
import { paths } from '@/routes';
import { useMutation } from '@tanstack/react-query';
import { useEffect, type FC } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { toast } from 'sonner';

type VerifyAccountFn = (token: string) => Promise<SuccessResponse | undefined>;

const verifyAccount: VerifyAccountFn = async (token) => {
  try {
    const res: SuccessResponse = await api.post(apiRoutes.auth.verify, {
      token,
    });
    return res;
  } catch (error) {
    handleAPIError(error);
  }
};

const Verify: FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: verifyAccount,
    onSuccess: (res) => {
      if (res?.message) toast.success(res.message);
      navigate(paths.account.signin, { replace: true });
    },
  });

  useEffect(() => {
    if (token) mutate(token);
  }, [mutate, token]);
  if (!token) return <NotFound />;

  if (isPending) return <Spinner />;

  if (isError)
    return (
      <ErrorWrapper>
        <p className="text-destructive">{error.message}</p>
      </ErrorWrapper>
    );
};

export default Verify;
