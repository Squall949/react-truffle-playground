import React, { Component } from 'react';
import { Card, Icon, Image, Button, Modal, Input } from 'semantic-ui-react';

import './main.css';

export default class Streams extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };
    }

    show = () => this.setState({ open: true })
    close = () => this.setState({ open: false })

    subscribe(userId) {
        this.props.subscribe(userId);
        this.close();
    } 

    render() {
        const createUserCard = (stream) => {
            return (
                <Card key={stream.id}>
                    <Image src={stream.thumbnail_url.replace('{width}x{height}', '640x480')} />
                    <Card.Content>
                    <Card.Header>
                        {this.props.usersNames.get(stream.user_id)}
                    </Card.Header>
                    <Card.Meta>
                        <span className='date'>
                        Started at {new Date(stream.started_at).toLocaleString()}
                        </span>
                    </Card.Meta>
                    <Card.Description>
                        {stream.title}
                    </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                    <div>
                        <Icon name='user' />
                        {stream.viewer_count} Views
                        <span className="magn-left">
                            <Modal trigger={<Button onClick={this.show}>Subscribe</Button>} open={this.state.open} onClose={this.close}>
                                <Modal.Content>
                                    How much Ether would you give?
                                    <Input focus type="number" className="magn-left" />
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color="green" onClick={this.close}>
                                        Cancel
                                    </Button>
                                    <Button primary onClick={this.subscribe.bind(this, stream.user_id)}>
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

        return (
            <main className="ui cards fluid container main-container">
                <Card.Group itemsPerRow="2">
                    {this.props.streams.map(createUserCard)}
                </Card.Group>
            </main>
        )
    }
}