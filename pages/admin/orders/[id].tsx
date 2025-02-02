import { GetServerSideProps, NextPage } from 'next';

import { Box, Card, CardContent, Chip, Divider, Grid, Typography } from "@mui/material";
import { AirplaneTicketOutlined, CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

import { AdminLayout } from "../../../components/layouts";
import { CartList, OrderSummary } from "../../../components/cart";
import { dbOrders } from '../../../database';
import { IOrder } from '../../../interfaces';



interface Props {
    order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {


    const { firstName, lastName, city, country, address, zip, address2, phone } = order.shippingAddress;


    return (
        <AdminLayout title={'Resumen de la orden'} subTitle={`OrdenId: ${order._id}`} icon={<AirplaneTicketOutlined />}>
            {
                order.isPaid
                    ? (
                        <Chip
                            sx={{ my: 2 }}
                            label='Orden ya fue pagada'
                            variant='outlined'
                            color='success'
                            icon={<CreditScoreOutlined />}
                        />
                    )
                    : (
                        <Chip
                            sx={{ my: 2 }}
                            label='Pendiente de pago'
                            variant='outlined'
                            color='error'
                            icon={<CreditCardOffOutlined />}
                        />
                    )
            }

            <Grid container className='fadeIn'>
                <Grid item xs={12} sm={7}>
                    <CartList products={order.orderItems} />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className='sumary-card'>
                        <CardContent>
                            <Typography variant='h2'>Resumen ({order.numberOfItems} {order.numberOfItems == 1 ? 'producto' : 'productos'})</Typography>
                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='space-between' >
                                <Typography variant='subtitle1'>Dirección de entrega</Typography>

                            </Box>
                            <Typography>{firstName} {lastName}</Typography>
                            <Typography>{address}{address2 ? `, ${address2}` : ''}</Typography>
                            <Typography>{city}, {zip}</Typography>
                            <Typography>{country}</Typography>
                            <Typography>{phone}</Typography>

                            <Divider sx={{ my: 1 }} />

                            <OrderSummary
                                orderValues={{
                                    numberOfItems: order.numberOfItems,
                                    subTotal: order.subTotal,
                                    total: order.total,
                                    tax: order.tax,
                                }}
                            />
                            <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>

                                <Box display='flex' flexDirection='column' >
                                    {
                                        order.isPaid
                                            ? (
                                                <Chip
                                                    sx={{ my: 2 }}
                                                    label='Orden ya fue pagada'
                                                    variant='outlined'
                                                    color='success'
                                                    icon={<CreditScoreOutlined />}
                                                />
                                            )
                                            : (
                                                <Chip
                                                    sx={{ my: 2 }}
                                                    label='Pendiente de pago'
                                                    variant='outlined'
                                                    color='error'
                                                    icon={<CreditCardOffOutlined />}
                                                />
                                            )
                                    }
                                </Box>

                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

        </AdminLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const { id = '' } = query;
    const order = await dbOrders.getOrderById(id.toString());

    if (!order) {
        return {
            redirect: {
                destination: '/admin/orders',
                permanent: false,
            }
        }
    }

    return {
        props: {
            order
        }
    }
}

export default OrderPage;