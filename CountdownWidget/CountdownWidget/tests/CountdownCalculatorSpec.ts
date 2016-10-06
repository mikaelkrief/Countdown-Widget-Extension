﻿/// <reference path="../typings/index.d.ts" />
import moment = require("moment-timezone");
import CountdownCalculator = require("../scripts/countdownCalculator");

describe("countdown ", function () {
    it("from date before to date is valid", function () {
        var calculator = new CountdownCalculator.CountdownCalculator(
            moment("21122015", "DDMMYYYY"),
            moment("01012016", "DDMMYYYY"));

        expect(calculator.isValid()).toBe(true);
    });

    it("from date after to date is invalid", function () {
        var calculator = new CountdownCalculator.CountdownCalculator(
            moment("01012016", "DDMMYYYY"),
            moment("21122015", "DDMMYYYY"));

        expect(calculator.isValid()).toBe(false);
    });

    it("from 1-12-2015 to 31-12-2015 is 30 days", function () {
        var calculator = new CountdownCalculator.CountdownCalculator(
            moment("1-12-2015", "DD-MM-YYYY"),
            moment("31-12-2015", "DD-MM-YYYY"));

        var countdownResult = calculator.getDifference();

        expect(countdownResult.value).toBe(30);
        expect(countdownResult.unit).toBe(CountdownCalculator.Unit.Days);
    });

    it("from 1-12-2015 to 2-12-2015 is 1 day", function () {
        var calculator = new CountdownCalculator.CountdownCalculator(
            moment("01-12-2015", "DD-MM-YYYY"),
            moment("02-12-2015", "DD-MM-YYYY"));

        var countdownResult = calculator.getDifference();
        expect(countdownResult.value).toBe(1);
        expect(CountdownCalculator.Unit[countdownResult.unit]).toBe("Days");
    });

    it("from 1-12-2015 10:00 to 1-12-2015 11:00 is 1 hour", function () {
        var calculator = new CountdownCalculator.CountdownCalculator(
            moment("01-12-2015 10:00", "DD-MM-YYYY HH"),
            moment("01-12-2015 11:00", "DD-MM-YYYY HH"));

        var countdownResult = calculator.getDifference();
        expect(countdownResult.value).toBe(1);
        expect(CountdownCalculator.Unit[countdownResult.unit]).toBe("Hours");
    });

    it("from 1-12-2015 10:00 to 1-12-2015 10:59 is 59 minutes", function () {

        var calculator = new CountdownCalculator.CountdownCalculator(
            moment("01-12-2015 10:00", "DD-MM-YYYY HH:mm"),
            moment("01-12-2015 10:59", "DD-MM-YYYY HH:mm"));

        var countdownResult = calculator.getDifference();
        expect(countdownResult.value).toBe(59);
        expect(CountdownCalculator.Unit[countdownResult.unit]).toBe("Minutes");
    });

    it("from 1-12-2015 10:00:00 to 1-12-2015 10:00:59 is 59 seconds", function () {

        var calculator = new CountdownCalculator.CountdownCalculator(
            moment("01-12-2015 10:00:00", "DD-MM-YYYY HH:mm:ss"),
            moment("01-12-2015 10:00:59", "DD-MM-YYYY HH:mm:ss"));

        var countdownResult = calculator.getDifference();
        expect(countdownResult.value).toBe(59);
        expect(CountdownCalculator.Unit[countdownResult.unit]).toBe("Seconds");
    });

    it("invalid countdown to return a difference of 0", function () {
        var calculator = new CountdownCalculator.CountdownCalculator(
            moment("02-12-2015", "DD-MM-YYYY"),
            moment("01-12-2015", "DD-MM-YYYY"));

        var countdownResult = calculator.getDifference();
        expect(countdownResult.value).toBe(0);
        expect(CountdownCalculator.Unit[countdownResult.unit]).toBe("Invalid");
    });

    it("countdown from 01-12-2015 10:00 Europe/Amsterdam to 01-12-2015 10:00 America/Los_Angeles to be 9 hours", function () {
        var calculator = new CountdownCalculator.CountdownCalculator(
            moment.tz("01-12-2015 10:00", "DD-MM-YYYY H:m", "Europe/Amsterdam"),
            moment.tz("01-12-2015 10:00", "DD-MM-YYYY H:m","America/Los_Angeles"));

        var countdownResult = calculator.getDifference();
        expect(countdownResult.value).toBe(9);
        expect(CountdownCalculator.Unit[countdownResult.unit]).toBe("Hours");
    });


    it("countdown from 06-10-2016 14:20 Europe/Paris to 11-10-2016 02:00 Europe/Paris to be 4 days", function () {
        var DayOfWeeks = ["monday", "tuesday", "wednesday", "thursday","friday"];
        var calculator = new CountdownCalculator.CountdownCalculator(
            moment.tz("06-10-2016 14:00", "DD-MM-YYYY H:m", "Europe/Paris"),
            moment.tz("11-10-2016 23:59", "DD-MM-YYYY H:m", "Europe/Paris"), DayOfWeeks);

        var countdownResult = calculator.getDifference();
        expect(countdownResult.value).toBe(3);
        expect(CountdownCalculator.Unit[countdownResult.unit]).toBe("Days");
    });


    it("diff from 06-10-2016 14:20 Europe/Paris to 11-10-2016 02:00 Europe/Paris to be 5 days", function () {
      
        var from = moment.tz("06-10-2016 14:00", "DD-MM-YYYY H:m", "Europe/Paris");
        var to = moment.tz("11-10-2016 23:59", "DD-MM-YYYY H:m", "Europe/Paris");


        var datediff = to.diff(from, "days", false);
    
        expect(datediff).toBe(5);
       
    });

    it("round diff from 06-10-2016 14:20 Europe/Paris to 11-10-2016 02:00 Europe/Paris to be 5 days", function () {

        var from = moment.tz("06-10-2016 14:00", "DD-MM-YYYY H:m", "Europe/Paris");
        var to = moment.tz("11-10-2016 23:59", "DD-MM-YYYY H:m", "Europe/Paris");


        var datediff = to.diff(from, "days", true);

        expect(datediff).toBeGreaterThan(5);
        expect(datediff).toBeLessThan(6);

    });
});