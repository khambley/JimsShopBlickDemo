import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { CreateProduct } from './components/CreateProduct';
import { ProductDetails } from './components/ProductDetails';
import { UpdateProduct } from './components/UpdateProduct';

export const routes = <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/home' component={Home} />
    <Route path='/create' component={CreateProduct} />
    <Route path='/product/edit/:prodid' component={CreateProduct} />
    <Route path='/product/details/:prodid' component={ProductDetails} />
    <Route path='/product/update' component={UpdateProduct} />
</Layout>;
