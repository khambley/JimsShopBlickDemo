import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ProductData } from './Home';
import { RouteComponentProps } from 'react-router';

interface ProductListItemDataState {
    title: string;
    loading: boolean;
    prodData: ProductData;
}


