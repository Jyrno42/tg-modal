import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';

import { assert } from 'chai';
import sinon from 'sinon';

import ModalDialog from '../src/components/dom/ModalDialog';

import { buildContainer } from './util';

const onCancel = () => null;

describe('ModalDialog', () => {
    it('renders correctly', () => {
        const container = ReactDOM.findDOMNode(buildContainer(ModalDialog, { onCancel }));

        // Its a div
        assert.equal(container.nodeName, 'DIV');

        assert.ok(container.classList.contains('tg-modal'));

        // It has the correct default class
        assert.equal(container.querySelectorAll('.tg-modal-dialog').length, 1);

        // Run stopPropagate
        assert.equal(container.querySelectorAll('.tg-modal-content').length, 1);
        TestUtils.Simulate.click(container.querySelector('.tg-modal-content'));
    });

    it('isBasic works', () => {
        const container = ReactDOM.findDOMNode(buildContainer(ModalDialog, { onCancel, isBasic: true }));

        // Its a div
        assert.equal(container.nodeName, 'DIV');

        // It has modal-basic
        assert.ok(container.classList.contains('tg-modal-basic'));

        // It has the correct default class
        assert.ok(container.classList.contains('tg-modal'));
    });

    it('onCancel is called after click', () => {
        const spy = sinon.spy();

        const container = ReactDOM.findDOMNode(buildContainer(ModalDialog, { onCancel: spy }));

        // test spy was not called yet
        assert.equal(spy.callCount, 0);

        // Trigger click
        TestUtils.Simulate.click(container);

        // test spy was called once
        assert.equal(spy.callCount, 1);
    });

    it('stopPropagate is called after click', () => {
        const spy = sinon.spy();

        class TempModalDialog extends ModalDialog {
            stopPropagate = () => {
                spy();
            };
        }

        const container = ReactDOM.findDOMNode(buildContainer(TempModalDialog, { onCancel }));

        // test spy was not called yet
        assert.equal(spy.callCount, 0);

        // Close button is rendered into the container
        assert.equal(container.querySelectorAll('.tg-modal-content').length, 1);

        // Trigger click
        TestUtils.Simulate.click(container.querySelector('.tg-modal-content'));

        // test spy was called once
        assert.equal(spy.callCount, 1);

        // test wrapper click
        TestUtils.Simulate.click(container);

        // test spy wasn't called
        assert.equal(spy.callCount, 1);
    });

    it('custom children work', () => {
        const container = ReactDOM.findDOMNode(
            buildContainer(ModalDialog, { onCancel, children: <span className="child">Sup</span> }),
        );

        assert.equal(container.querySelectorAll('.child').length, 1);
    });
});
