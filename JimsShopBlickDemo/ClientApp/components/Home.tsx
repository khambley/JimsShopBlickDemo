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
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderProductTable(this.state.prodList);

        return <div className='row'>
            <h1 className='text-center'>Welcome to Jim's Shop!</h1>
            <h2>Product List</h2>
            <p><Link to="/create">Create New</Link></p>
            {contents}
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

    //Returns the HTML to the render() method.
    private renderProductTable(prodList: ProductData[]) {
        return <table className='table'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {prodList.map(prod =>
                        <tr key={prod.productId}>
                            <td></td>
                        <td><img className="thumb" src={'/images/' + prod.productImage} alt={prod.productName} /></td>
                            <td>{prod.productName}</td>
                            <td>{prod.productDescription}</td>
                            <td>{prod.productPrice}</td>
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
