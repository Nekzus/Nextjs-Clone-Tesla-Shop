import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

import { Box, Grid, Typography, TextField, Button, Link, Chip } from "@mui/material"
import { AuthLayout } from "../../components/layouts"
import { useForm } from 'react-hook-form';
import { validations } from '../../utils';
import { ErrorOutline } from '@mui/icons-material';
import { AuthContext } from '../../context';

type FormData = {
    name: string;
    email: string;
    password: string;
}

const RegisterPage = () => {

    const router = useRouter();
    const { registerUser } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onRegisterForm = async ({ name, email, password }: FormData) => {

        setShowError(false);
        const { hasError, message } = await registerUser(name, email, password);

        if (hasError) {
            setShowError(true);
            setErrorMessage(message!);
            setTimeout(() => setShowError(false), 3000);
            return;
        }
        // TODO: navegar a la pantalla que el usuario estaba
        router.replace('/');
    }

    return (
        <AuthLayout title={'Registro'}>
            <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h1' component='h1'>Crear cuenta</Typography>
                            <Chip
                                label='El usuario ya exite'
                                color='error'
                                icon={<ErrorOutline />}
                                className='fadeIn'
                                sx={{ display: showError ? 'flex' : 'none' }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label='Nombre completo'
                                type='text'
                                variant='filled'
                                fullWidth
                                {...register('name', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                })}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label='Correo'
                                type='email'
                                variant='filled'
                                fullWidth
                                {...register('email', {
                                    required: 'Este campo es requerido',
                                    validate: validations.isEmail

                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label='Contraseña'
                                type='password'
                                variant='filled'
                                fullWidth
                                {...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type='submit'
                                color='secondary'
                                className='circular-btn'
                                size='large'
                                fullWidth
                            >
                                Registrate
                            </Button>
                        </Grid>

                        <Grid item xs={12} display='flex' justifyContent='center'>
                            <NextLink href='/auth/login' passHref>
                                <Link underline='always'>
                                    ¿Ya tienes cuenta? Inicia sesión
                                </Link>
                            </NextLink>
                        </Grid>

                    </Grid>

                </Box>
            </form>
        </AuthLayout>
    )
}

export default RegisterPage