import React, { Component } from 'react';
import { Card, Icon, Image, Button, Modal, Input } from 'semantic-ui-react';

import './main.css';

export default class Stream extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            value: 0
        };
    }

    show = () => this.setState({ open: true });
    close = () => this.setState({ open: false });

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        });
    }

    subscribe(userId, index) {
        this.props.subscribe(userId, this.state.value, index);
        this.close();
    }
    
    checkDisabled = () => {
        if (this.props.isSubscribed) {
            return this.props.isSubscribed.get(this.props.user_id);
        }

        return false;
    }

    displayBtnLabel = () => {
        if (this.props.isSubscribed && this.props.isSubscribed.get(this.props.user_id)) {
            return 'Subscribed';
        }

        return 'Subscribe';
    }

    render() {
        return (
            <Card>
                <Image src={this.props.imgSrc} />
                <Card.Content>
                    <Card.Header>
                        {/* Starting from second account, because the first one is the owner */}
                        {`${this.props.usersName} (Account ${this.props.index+2})`}
                    </Card.Header>
                    <Card.Meta>
                        <span className='date'>
                            Started at {new Date(this.props.started_at).toLocaleString()}
                        </span>
                    </Card.Meta>
                    <Card.Description>
                        {this.props.title}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div>
                        <Icon name='user' />
                        {this.props.viewer_count} Views
                        <span className="magn-left">
                            <Modal trigger={<Button disabled={this.checkDisabled()} onClick={this.show}>
                            {this.displayBtnLabel()}</Button>} 
                            open={this.state.open} onClose={this.close}>
                                <Modal.Content>
                                    How much Ether would you give?
                                    <Input focus type="number" className="magn-left" onChange={this.handleChange} />
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color="green" onClick={this.close}>
                                        Cancel
                                    </Button>
                                    <Button primary onClick={this.subscribe.bind(this, this.props.user_id, this.props.index)}>
                                        Done
                                    </Button>
                                </Modal.Actions>
                            </Modal>
                        </span>
                    </div>
                </Card.Content>
            </Card>
        )
    }
}