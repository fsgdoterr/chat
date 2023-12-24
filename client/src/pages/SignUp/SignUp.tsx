import React from 'react'
import styles from './SignUp.module.scss';
import Label from '../../components/UI/Label/Label';
import Input from '../../components/UI/Input/Input';
import { Link } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import { PUBLIC_ROUTES } from '../../utils/consts';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/redux';
import { useFetching } from '../../hooks/useFetching';
import { AuthApi } from '../../http/AuthApi';
import { setIsAuth, setUser } from '../../store/slices/account.slice';
import { ApiError } from '../../types/errors/ApiError';
import FormError from '../../components/UI/FormError/FormError';

interface FormValues {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
}

const SignUp = () => {

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors }
    } = useForm<FormValues>();

    const dispatch = useAppDispatch();

    const [submit, isLoading, fetchErrors] = useFetching<SubmitHandler<FormValues>>(async ({email, name, password, confirmPassword}) => {
        const response = await AuthApi.signup(email, name, password, confirmPassword);
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
                <Label label='Name'>
                    <Input 
                        className={styles.input}
                        placeholder='name'
                        {...register('name', {
                            required: 'Required',
                        })}
                    />
                    {errors.name && <FormError>{errors.name.message}</FormError>}
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
                <Label label='Confirm password'>
                    <Input 
                        className={styles.input}
                        type='password'
                        placeholder='confirm password'
                        {...register('confirmPassword', {
                            required: 'Required',
                            validate: val => val === getValues('password') || 'Passwords must match',
                        })}
                    />
                    {errors.confirmPassword && <FormError>{errors.confirmPassword.message}</FormError>}
                </Label>
                {errs as ApiError && <FormError>{errs?.message}</FormError>}
                <Button variant='default' loading={isLoading}>
                    Sign Up
                </Button>
                <Link to={PUBLIC_ROUTES.SIGN_IN} className={styles.signup}>Already have an account?</Link>
            </form>
        </div>
    )
}

export default SignUp