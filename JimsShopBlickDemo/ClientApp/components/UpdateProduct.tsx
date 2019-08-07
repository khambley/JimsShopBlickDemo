import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { ProductData } from './Home';

interface UpdateProductDataState {
    loading: boolean;
    productList: Array<any>;
    prodData: ProductData;
}

export class UpdateProduct extends React.Component<RouteComponentProps<{}>, UpdateProductDataState> {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            productList: [],
            prodData: new ProductData,
        };

        //This gets the product list to populate the dropdown select box.
        fetch('api/Product/Index')
            .then(response => response.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({ productList: data });
            });

       

        //Binds "this" to callback
        this.handleCancel = this.handleCancel.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
    public render() {
        return <div>
            <h2>Select a product to update:</h2>
            <div className="form-group row">
                <label className="control-label col-md-12" htmlFor="Product">Update Product</label>
                <div className="col-md-4">
                    <select className="form-control" onChange={(id) => this.handleEdit(this.state.prodData.productId)} data-val="true" name="productName" defaultValue={this.state.prodData.productName} required>
                        <option value="">-- Select Product --</option>
                        {this.state.productList.map(prod =>
                            <option key={prod.productId} value={prod.productId}>{prod.productName}</option>
                        )}
                    </select>
                </div>
            </div>
        </div>;
    }


    //This handles Cancel button event.
    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/home");
    }

    private handleEdit(id: number) {
        this.props.history.push("/product/edit/" + id);
    }

    //Returns the HTML Form to the render() method.
    private renderCreateForm(buyerList: Array<any>) {
        return (
            console.log("renderCreateForm called")
        )
    }
}