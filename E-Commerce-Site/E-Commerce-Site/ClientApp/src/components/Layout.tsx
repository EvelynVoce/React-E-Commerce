import React, { Component, ReactNode } from 'react';
import { Container } from 'reactstrap';
// @ts-ignore
import NavMenu from './NavMenu';

interface LayoutProps {
    username: string;
    userId: string;
    children: ReactNode;
}

export class Layout extends Component<LayoutProps> {
    static displayName = Layout.name;

    render() {
        const { username, userId } = this.props;

        return (
            <div>
                <NavMenu username={username} userId={userId}/>
                <Container>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}