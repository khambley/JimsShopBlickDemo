import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div className='row'>
            <h1 className='text-center'>Welcome to Jim's Shop!</h1>
            
        </div>;
    }
}
