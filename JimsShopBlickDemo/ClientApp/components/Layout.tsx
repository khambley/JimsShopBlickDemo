import * as React from 'react';
import { NavMenu } from './NavMenu';
import { Link } from 'react-router-dom';

export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
    public render() {
        return <div className='container'>
            <div className='row'>
                <NavMenu />
            </div>
            <div className='row'>
                <div className='container margin-top'>{this.props.children}</div>
                
            </div>
            <br />
            <div className="row">&copy; 2019 Created by: Katherine Hambley For demo purposes only. Contact info: <a href="mailto:superdesigngirl@mac.com">superdesigngirl@mac.com</a> </div>
        </div>;
    }
}
