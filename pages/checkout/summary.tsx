import NextLink from 'next/link';
import { Button, Card, CardContent, Divider, Grid, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { CartList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts";


const SummaryPage = () => {
    return (
        <ShopLayout title="Resumen de orden" pageDescription="Resumen de la orden">
            <Typography variant='h1' component='h1'>Resumen de la orden</Typography>


            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className='sumary-card'>
                        <CardContent>
                            <Typography variant='h2'>Resumen (3 productos)</Typography>
                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='space-between' >
                            <Typography variant='subtitle1'>Dirección de entrega</Typography>
                                <NextLink href='/checkout/address' passHref>
                                    <Link underline='always'>
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>
                            <Typography>Mauricio Ortega</Typography>
                            <Typography>323 Algun lugar</Typography>
                            <Typography>Puerto Madryn, CP9120</Typography>
                            <Typography>Argentina</Typography>
                            <Typography>+59 2356897125</Typography>

                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='end' >
                                <NextLink href='/cart' passHref>
                                    <Link underline='always'>
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            <OrderSummary />
                            <Box sx={{ mt: 3 }}>
                                <Button color='secondary' className='circular-btn' fullWidth>
                                    Confirmar orden
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

        </ShopLayout>
    )
}

export default SummaryPage;