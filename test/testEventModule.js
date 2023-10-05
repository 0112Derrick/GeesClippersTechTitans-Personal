/* import { assert } from 'chai';
import { JSDOM } from 'jsdom';
import sinon from 'sinon';

import initializeEvents from '../lib/app/initEvents.js';

describe('Event Module', () => {
    let window;
    let document;
    let consoleLogSpy; // Declare the spy here

    before(() => {
        const dom = new JSDOM('<!DOCTYPE html>');
        window = dom.window;
        document = window.document;

        global.document = document;
    });

    after(() => {
        global.document = undefined;
        window.close();
    });

    beforeEach(() => {
        // Create the spy before each test
        consoleLogSpy = sinon.spy(console, 'log');
    });

    afterEach(() => {
        // Restore the spy after each test
        consoleLogSpy.restore();
    });

    it('should prevent form submission and log success message on successful fetch', async () => {
        const fakeFormData = {
            get: () => 'fakeData',
        };

        const fakeResponse = {
            ok: true,
        };

        global.document = {
            getElementById: () => ({
                addEventListener: (event, callback) => {
                    if (event === 'submit') {
                        callback({
                            preventDefault: () => { },
                            target: {
                                reset: () => { },
                            },
                        });
                    }
                },
            }),
        };

        global.fetch = async () => fakeResponse;

        initializeEvents();

        assert.isTrue(consoleLogSpy.calledWith('Image uploaded successfully'));
    });

    it('should handle fetch error', async () => {
        global.document = {
            getElementById: () => ({
                addEventListener: (event, callback) => {
                    if (event === 'submit') {
                        callback({
                            preventDefault: () => { },
                            target: {
                                reset: () => { },
                            },
                        });
                    }
                },
            }),
        };

        global.fetch = async () => {
            throw new Error('Fetch error');
        };

        initializeEvents();

        assert.isTrue(consoleLogSpy.calledWith('Fetch error'));
    });
});
 */