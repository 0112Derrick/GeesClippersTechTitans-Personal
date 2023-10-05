import { assert } from 'chai';
import { JSDOM } from 'jsdom';
import sinon from 'sinon';
import fetch from 'node-fetch';

import initializeAccountCreation from '../lib/app/initAccountCreation.js';

describe('Account Creation Module', () => {
    let window;
    let document;
    let consoleLogSpy;
    let fetchStub;

    before(() => {
        const dom = new JSDOM('<!DOCTYPE html>');
        window = dom.window;
        document = window.document;

        global.document = document;
        global.window = window;

        // Stub the fetch function once for the entire test suite
        fetchStub = sinon.stub(global, 'fetch');
    });

    after(() => {
        global.document = undefined;
        global.window = undefined;
        window.close();
    });

    beforeEach(() => {
        consoleLogSpy = sinon.spy(console, 'log');
    });

    afterEach(() => {
        consoleLogSpy.restore();
        fetchStub.reset(); // Reset the stub after each test
    });

    it('should prevent form submission and log success message on successful fetch', async () => {
        // Mock a successful fetch
        fetchStub.returns(Promise.resolve({ ok: true }));

        // Create a FormData object
        const fakeFormData = new FormData();

        // Populate FormData with the expected data
        fakeFormData.append('name', 'John Doe');
        fakeFormData.append('username', 'johndoe');
        fakeFormData.append('password', 'password123');
        fakeFormData.append('accountType', 'admin');

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

        initializeAccountCreation();

        // Verify that fetch is called with the expected data
        assert.isTrue(fetchStub.calledWith('/account-creation', {
            method: 'POST',
            body: fakeFormData, // Send the FormData object directly
        }));

        // Restore console.log after assertions
        console.log.restore(); // <-- Add this line

        // Verify that the appropriate message is logged
        assert.isTrue(consoleLogSpy.calledWith('Account Created'));
    });

    it('should handle fetch error', async () => {
        // Mock a fetch with an error
        fetchStub.returns(Promise.reject(new Error('Fetch error')));

        // Rest of the test setup and assertions
    });
});
