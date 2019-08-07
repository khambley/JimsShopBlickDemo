import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { ProductData } from './Home';

interface ProductDetailsDataState {
    prodData: ProductData;
    loading: boolean;
}

export class ProductDetails extends React.Component<RouteComponentProps<{}>, ProductDetailsDataState>{
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            prodData: new ProductData,
        };

        var prodid = this.props.match.params["prodid"];

        if (prodid > 0) {
            fetch('api/Product/Details/' + prodid)
                .then(response => response.json() as Promise<ProductData>)
                .then(data => {
                    this.setState({ loading: false, prodData: data });
                });
        }
    }
    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderProductDetails(this.state.prodData);

        return <div className="row">
            <div className="col-md-9">
            <h2 className="text-center">Product Details</h2>
            <br />
                {contents}
            </div>
        </div>
    }

    //Returns the Product Details HTML to the render() method.
    private renderProductDetails(prodData: ProductData) {
        return <div className="media">
            <div className="media-left">
                <img className="media-object" src={'/images/' + prodData.productImage} alt={prodData.productName} />
            </div>
                <div className="media-body">
                <h4 className="media-heading"><b>Name</b> <br />{prodData.productName}</h4><br />
                <h4><b>Description</b></h4> <p>{prodData.productDescription}</p><br />
                <h4>${prodData.productPrice}</h4>
            </div><br />
            <Link to={'/'}>Back to home</Link>
            </div>;
    }
}
