import React, { useEffect } from 'react'
import styles from './SignIn.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useFetching } from '../../hooks/useFetching';
import Input from '../../components/UI/Input/Input';
import Label from '../../components/UI/Label/Label';
import { Link } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import { PUBLIC_ROUTES } from '../../utils/consts';
import FormError from '../../components/UI/FormError/FormError';
import { AuthApi } from '../../http/AuthApi';
import { ApiError } from '../../types/errors/ApiError';
import { useAppDispatch } from '../../hooks/redux';
import { setIsAuth, setUser } from '../../store/slices/account.slice';

interface FormValues {
    email: string;
    password: string;
}

const SignIn = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValues>();

    const dispatch = useAppDispatch();

    const [submit, isLoading, fetchErrors] = useFetching<SubmitHandler<FormValues>>(async ({email, password}) => {
        const response = await AuthApi.signin(email, password);
        dispatch(setUser(response.data));
        dispatch(setIsAuth(true));
    });

    const errs = fetchErrors ? fetchErrors as ApiError : null;

    return (
        <div className={['h-full', 'd-flex', 'flex-center', styles.page].join(' ')}>
            <form onSubmit={handleSubmit(submit)}>
                <Label label='E-mail'>
                    <Input 
                        className={styles.input}
                        placeholder='email'
                        {...register('email', {
                            required: 'Required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "invalid email address"
                            }
                        })}
                    />
                    {errors.email && <FormError>{errors.email.message}</FormError>}
                </Label>
                <Label label='Password'>
                    <Input 
                        className={styles.input}
                        type='password'
                        placeholder='password'
                        {...register('password', {
                            required: 'Required',
                        })}
                    />
                    {errors.password && <FormError>{errors.password.message}</FormError>}
                </Label>
                <Link to={PUBLIC_ROUTES.FORGOT_PASSWORD} className={styles.forgotpassword}>forgot password?</Link>
                {errs as ApiError && <FormError>{errs?.message}</FormError>}
                <Button variant='default' loading={isLoading}>
                    Sign In
                </Button>
                <Link to={PUBLIC_ROUTES.SIGN_UP} className={styles.signup}>Not have an account?</Link>
            </form>
        </div>
    )
}

export default SignIn