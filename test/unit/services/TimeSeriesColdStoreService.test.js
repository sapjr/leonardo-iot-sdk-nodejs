const AssertionUtil = require('../AssertionUtil');
const LeonardoIoT = require('../../../lib/LeonardoIoT');

const appiotColdstoreUrl = 'https://appiot-coldstore.cfapps.eu10.hana.ondemand.com';

describe('Time Series Cold Store Service', function () {
    let client;

    beforeEach(function () {
        client = new LeonardoIoT();
    });

    describe('Time Series Data', function () {
        it('create', function () {
            const thingId = 'MyThing';
            const thingTypeName = 'MyThingType';
            const propertySetId = 'MyPropertySet';
            const timeSeriesPayload = { value: [{ Temperature: '25', _time: '2019-01-15T10:00:00Z' }] };

            client.request = (requestConfig) => {
                AssertionUtil.assertRequestConfig(requestConfig, {
                    url: `${appiotColdstoreUrl}/Things('${thingId}')/${thingTypeName}/${propertySetId}`,
                    method: 'PUT',
                    body: timeSeriesPayload
                });
            };
            return client.createColdStoreTimeSeriesData(thingId, thingTypeName, propertySetId, timeSeriesPayload);
        });

        it('read', function () {
            const thingId = 'MyThing';
            const thingTypeName = 'MyThingType';
            const propertySetId = 'MyPropertySet';
            const fromTime = '2019-01-15T08:00:00Z';
            const toTime = '2019-01-15T20:00:00Z';
            client.request = (requestConfig) => {
                AssertionUtil.assertRequestConfig(requestConfig, {
                    url: `${appiotColdstoreUrl}/Things('${thingId}')/${thingTypeName}/${propertySetId}?timerange=${fromTime}-${toTime}`,
                });
            };

            return client.getColdStoreTimeSeriesData(thingId, thingTypeName, propertySetId, fromTime, toTime);
        });

        it('delete', function () {
            const thingId = 'MyThing';
            const thingTypeName = 'MyThingType';
            const propertySetId = 'MyPropertySet';
            const fromTime = '2019-01-15T08:00:00Z';
            const toTime = '2019-01-15T20:00:00Z';
            client.request = (requestConfig) => {
                AssertionUtil.assertRequestConfig(requestConfig, {
                    url: `${appiotColdstoreUrl}/Things('${thingId}')/${thingTypeName}/${propertySetId}?timerange=${fromTime}-${toTime}`,
                    method: 'DELETE'
                });
            };

            return client.deleteColdStoreTimeSeriesData(thingId, thingTypeName, propertySetId, fromTime, toTime);
        });
    });
});
