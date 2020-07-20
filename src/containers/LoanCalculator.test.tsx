
import React from 'react';
import * as ShallowRenderer from 'react-test-renderer/shallow';

import LoanCalculator from './LoanCalculator';

const shallow = ShallowRenderer.createRenderer();
shallow.render(<LoanCalculator/>);

const shallowResult = shallow.getRenderOutput();

describe('LoanCalculator', () => {

    it('renders properly', () => {
        expect(shallowResult).toMatchSnapshot()
    });
});