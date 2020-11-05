const LeonardoIoT = require('../../lib/LeonardoIoT');
const DataHelper = require('./helper/DataHelper');

describe('6) DATA', function () {
    let client;
    let thingTypeName;
    let propertySetName;
    let thingId;

    let currentTime;
    let oneYearAgoTime;

    before(function () {
        client = new LeonardoIoT();
        currentTime = new Date().toISOString();
        oneYearAgoTime = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString();
    });

    describe('5.1) TIME SERIES STORE', function () {
        before(function () {
            thingTypeName = DataHelper.thingType().Name;
            propertySetName = DataHelper.thingType().PropertySets[0].Name;
            thingId = DataHelper.data.thing._id;
        });

        it('create', function () {
            return client.createTimeSeriesData(thingId, thingTypeName, propertySetName, {
                value: [{
                    _time: currentTime,
                    Temperature: 25
                }]
            });
        });

        it('read', function () {
            return client.getTimeSeriesData(thingId, thingTypeName, propertySetName);
        });

        it('read snapshot', function () {
            return client.getThingSnapshot(thingId);
        });

        it('delete', function () {
            return client.deleteTimeSeriesData(thingId, thingTypeName, propertySetName, currentTime, currentTime);
        });
    });

    describe('5.2) TIME SERIES COLD STORE', function () {
        before(function () {
            thingTypeName = DataHelper.thingType().Name;
            propertySetName = DataHelper.thingType().PropertySets[0].Name;
            thingId = DataHelper.data.thing._id;
        });

        it('create', function () {
            return client.createColdStoreTimeSeriesData(thingId, thingTypeName, propertySetName, {
                value: [{
                    _time: oneYearAgoTime,
                    Temperature: 28
                }]
            });
        });

        it('read', function () {
            return client.getColdStoreTimeSeriesData(thingId, thingTypeName, propertySetName, oneYearAgoTime, oneYearAgoTime);
        });

        it('delete', function () {
            return client.deleteColdStoreTimeSeriesData(thingId, thingTypeName, propertySetName, oneYearAgoTime, oneYearAgoTime);
        });
    });
});
