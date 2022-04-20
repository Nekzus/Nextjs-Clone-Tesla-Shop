import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { ShopLayout } from "../../components/layouts";
import { countries } from "../../utils";

type FormData = {
    firstName: string;
    lastName: string;
    address: string;
    address2: string;
    zip: string;
    city: string;
    country: string;
    phone: string;
}

const AddressPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onAddressForm = async ({ firstName, lastName, address, address2, zip, city, country, phone }: FormData) => {
        console.log(firstName);
    }

    return (
        <ShopLayout title="Dirección" pageDescription="Confirmar dirección del destino">
            <form onSubmit={handleSubmit(onAddressForm)} noValidate>
                <Typography variant='h1' component='h1'>Dirección</Typography>

                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type='text'
                            label='Nombre'
                            variant='filled'
                            fullWidth
                            {...register('firstName', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type='text'
                            label='Apellido'
                            variant='filled'
                            fullWidth
                            {...register('lastName', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type='text'
                            label='Dirección'
                            variant='filled'
                            fullWidth
                            {...register('address', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={!!errors.address}
                            helperText={errors.address?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type='text'
                            label='Dirección 2'
                            variant='filled'
                            fullWidth
                            {...register('address2', {
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={!!errors.address2}
                            helperText={errors.address2?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type='text'
                            label='Código Postal'
                            variant='filled'
                            fullWidth
                            {...register('zip', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={!!errors.zip}
                            helperText={errors.zip?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type='text'
                            label='Ciudad'
                            variant='filled'
                            fullWidth
                            {...register('city', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={!!errors.city}
                            helperText={errors.city?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <Select
                                variant='filled'
                                label='País'
                                value={'ARG'}
                            >
                                {
                                    countries.map(country => (
                                        <MenuItem
                                            key={country.code}
                                            value={country.code}
                                        >{country.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type='text'
                            label='Teléfono'
                            variant='filled'
                            fullWidth
                            {...register('phone', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                        />
                    </Grid>
                </Grid>
                <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
                    <Button
                        type='submit'
                        color='secondary'
                        className='circular-btn'
                        size='large'
                    >
                        Revisar pedido
                    </Button>
                </Box>
            </form>
        </ShopLayout>
    )
}

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {

//     const { token = '' } = req.cookies;
//     let isValidToken = false;

//     try {
//         await jwt.isValidToken(token);
//         isValidToken = true;

//     } catch (error) {
//         isValidToken = false;
//     }

//     if(!isValidToken) {
//         return {
//             redirect: {
//                 destination: '/auth/login?p=/checkout/address',
//                 permanent: false
//             }
//         }
//     }

//     return {
//         props: {

//         }
//     }
// }

export default AddressPage