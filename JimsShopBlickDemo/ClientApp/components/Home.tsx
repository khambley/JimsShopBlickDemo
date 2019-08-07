import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

interface HomeDataState {
    prodList: ProductData[];
    loading: boolean;
}

export class Home extends React.Component<RouteComponentProps<{}>, HomeDataState> {
    constructor() {
        super();
        this.state = { prodList: [], loading: true };

        fetch('api/Product/Index')
            .then(response => response.json() as Promise<ProductData[]>)
            .then(data => {
                this.setState({ prodList: data, loading: false });
            });

        // This binding is necessary to make "this" work in the callback  
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDetails = this.handleDetails.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderProductTable(this.state.prodList);

        return <div className='row'>
            <h1 className='text-center'>Welcome to Jim's Shop!</h1>
            <p className='text-center'>Jim's sells pencils.</p>
            <div className="col-md-9">
            <h2>Product List</h2>
            <p><Link to="/create">Create New</Link></p>
                {contents}
            </div>
        </div>;
    }
    // Handle Delete request for an employee  
    private handleDelete(id: number) {
        if (!confirm("Do you want to delete product with Id: " + id))
            return;
        else {
            fetch('api/Product/Delete/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState({
                    prodList: this.state.prodList.filter((rec) => {
                        return (rec.productId != id);
                    })
                });
            });
        }
    }

    private handleEdit(id: number) {
        this.props.history.push("/product/edit/" + id);
    }

    private handleDetails(id: number) {
        this.props.history.push("/product/details/" + id);
    }

    //Returns the HTML to the render() method.
    private renderProductTable(prodList: ProductData[]) {
        return <table className='table'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {prodList.map(prod =>
                        <tr key={prod.productId}>
                            <td></td>
                        <td><a onClick={(id) => this.handleDetails(prod.productId)}><img className="thumb" src={'/images/' + prod.productImage} alt={prod.productName} /></a></td>
                        <td><a onClick={(id) => this.handleDetails(prod.productId)}>{prod.productTitle}</a></td>
                            <td>${prod.productPrice.toFixed(2)}</td>
                            <td>
                            <a className="action" onClick={(id) => this.handleEdit(prod.productId)}>Edit</a>  |
                            <a className="action" onClick={(id) => this.handleDelete(prod.productId)}>Delete</a>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>;
    }
}


export class ProductData {
    productId: number = 0;
    productImage: string = "";
    productName: string = "";
    productTitle: string = "";
    productDescription: string = "";
    productPrice: number = 0.00;
    buyerName: string = "";
}
