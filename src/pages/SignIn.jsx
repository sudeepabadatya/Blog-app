import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema } from '../utils/zodSchemas';
import { useAuth } from "../hooks/useAuth";

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function SignIn() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = ({ email }) => {
    signIn(email);
    toast.success('Signed in successfully');
    navigate('/');
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          className="w-full px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800"
          placeholder="Email"
          {...register('email')}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <input
          type="password"
          className="w-full px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800"
          placeholder="Password"
          {...register('password')}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <button className="w-full px-4 py-2 rounded-xl bg-indigo-600 text-white">
          Sign In
        </button>
      </form>
    </div>
  );
}
