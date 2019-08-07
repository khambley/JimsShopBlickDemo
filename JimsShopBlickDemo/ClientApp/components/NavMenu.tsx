import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <div className='main-nav'>
            <div className='navbar navbar-inverse navbar-fixed-top'>
                <div className='container'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={ '/' }>Jim's Shop</Link>
                </div>
                
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <NavLink to={ '/' } exact activeClassName='active'>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/create' } activeClassName='active'>
                                Create
                            </NavLink>
                        </li>
                        <li>
                                <NavLink to={ '/product/update' } activeClassName='active'>
                                Update
                            </NavLink>
                        </li>
                    </ul>
                </div>
                </div>
            </div>
        </div>;
    }
}
