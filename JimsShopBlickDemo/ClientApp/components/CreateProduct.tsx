import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { ProductData } from './Home';

interface CreateProductDataState {
    title: string,
    loading: boolean;
    buyerList: Array<any>;
    prodData: ProductData;
}

export class CreateProduct extends React.Component<RouteComponentProps<{}>, CreateProductDataState>{
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            loading: true,
            buyerList: [],
            prodData: new ProductData,
        };

        //This sets state for Create product.
        fetch('api/Product/GetBuyerList')
            .then(response => response.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({ buyerList: data });
            });

        var prodid = this.props.match.params["prodid"];

        //This will set state for Edit product.
        if (prodid > 0) {
            fetch('api/Product/Details/' + prodid)
                .then(response => response.json() as Promise<ProductData>)
                .then(data => {
                    this.setState({ title: "Edit", loading: false, prodData: data });
                });
        }

        //This will set state for Create product.
        else {
            this.state = {
                title: "Create",
                loading: false,
                buyerList: [],
                prodData: new ProductData,
            };
        }

        //Binds "this" to callback
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm(this.state.buyerList);

        return <div>
            <h1>{this.state.title}</h1>
            {contents}
        </div>;
    }

    //This handles the form submit
    private handleSave(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        //PUT request for Edit product.
        if (this.state.prodData.productId) {
            fetch('api/Product/Edit', {
                method: 'PUT',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/home");
                })
        }
         
        //POST request for Create product.
        else {
            fetch('api/Product/Create', {
                method: 'POST',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/home");
                })
        }
    }

    //This handles Cancel button event.
    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/home");
    }

    //Returns the HTML Form to the render() method.
    private renderCreateForm(buyerList: Array<any>) {
        return (
            <form onSubmit={this.handleSave}>
         
                <div className="form-group row">
                    <input type="hidden" name="productId" value={this.state.prodData.productId} /> 
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Image">Product Image</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="productImage" defaultValue={this.state.prodData.productImage} required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Name">Product Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="productName" defaultValue={this.state.prodData.productName} required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Title">Product Title</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="productTitle" defaultValue={this.state.prodData.productTitle} required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Description">Product Description</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="productDescription" defaultValue={this.state.prodData.productDescription} required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Price">Product Price</label>
                    <div className="col-md-4">
                        <input className="form-control" type="number" min="1" step="any" name="productPrice" defaultValue={this.state.prodData.productPrice.toString()} required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Buyer">Buyer</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="buyerName" defaultValue={this.state.prodData.buyerName} required>
                            <option value="">-- Select Buyer --</option>
                            {buyerList.map(buyer =>
                                <option key={buyer.buyerId} value={buyer.buyerName}>{buyer.buyerName}</option>
                            )}
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div>
            </form>
        )
    }
}