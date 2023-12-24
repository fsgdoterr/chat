import React, { useState } from 'react'
import styles from './ForgotPassword.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/redux';
import { useFetching } from '../../hooks/useFetching';
import { setIsAuth, setUser } from '../../store/slices/account.slice';
import { ApiError } from '../../types/errors/ApiError';
import { UserApi } from '../../http/UserApi';
import Label from '../../components/UI/Label/Label';
import Input from '../../components/UI/Input/Input';
import FormError from '../../components/UI/FormError/FormError';
import Button from '../../components/UI/Button/Button';
import { PUBLIC_ROUTES } from '../../utils/consts';
import { Link } from 'react-router-dom';

interface FormValues {
    email: string;
    code: string;
    password: string;
    confirmPassword: string;
}

const ForgotPassword = () => {

    const [step, setStep] = useState<1 | 2>(1);

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors }
    } = useForm<FormValues>();

    const dispatch = useAppDispatch();

    const [submit, isLoading, fetchErrors] = useFetching<SubmitHandler<FormValues>>(async ({email, code, password, confirmPassword}) => {
        if(step === 1) await step1Submit(email);
        else if(step === 2) await step2Submit(email, code, password, confirmPassword);
    });

    const step1Submit = async (email: string) => {
        const response = await UserApi.forgotPassword(email);
        setStep(2);
    }

    const step2Submit = async (email: string, code: string, password: string, confirmPassword: string) => {
        const response = await UserApi.changePassword(email, code, password, confirmPassword);
        dispatch(setUser(response.data));
        dispatch(setIsAuth(true));

    }

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
                {step === 2 &&
                    <>
                        <Label label='Change password code'>
                            <Input 
                                className={styles.input}
                                placeholder='code'
                                {...register('code', {
                                    required: 'Required',
                                })}
                            />
                            {errors.code && <FormError>{errors.code.message}</FormError>}
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
                    </>
                }
                {errs as ApiError && <FormError>{errs?.message}</FormError>}
                <Button variant='default' loading={isLoading}>
                    {step === 1 && 'Send reset password message'}
                    {step === 2 && 'Change password'}
                </Button>
                <Link to={PUBLIC_ROUTES.SIGN_IN} className={styles.signup}>Already have an account?</Link>
            </form>
        </div>
    )
}

export default ForgotPassword