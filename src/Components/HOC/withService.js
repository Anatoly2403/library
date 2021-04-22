import React from 'react';
import { ServiceConsumer } from '../ServiseContext';

const withService = () => (Wrapped) => (props) => (
    <ServiceConsumer>
        {value => <Wrapped {...props} apiServise={value} />}
    </ServiceConsumer>
)

export default withService;