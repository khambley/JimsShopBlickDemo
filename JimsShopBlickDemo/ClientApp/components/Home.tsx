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
        return <div className='row'>
            <div className='col-md-4'>
                <div className="media">
                    <div className="media-left">
                        <a href=''>
                            <img className="media-object" src="..." alt="..." />
                        </a>
                    </div>
                        <div className="media-body">
                            <h4 className="media-heading">Media heading</h4>
                            <Link to="/">Home</Link>
                        </div>
                </div>
            </div>
        </div>;
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
