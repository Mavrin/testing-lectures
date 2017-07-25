const webdriver = require('selenium-webdriver');
const server = require('./../server');
require('chromedriver');

describe('youtube app', function () {
    before('run app', function (done) {
        this.server = server(done);
    });
    before('run selenium', function () {
        this.driver = new webdriver.Builder().
        withCapabilities(webdriver.Capabilities.chrome()).
        build();
    });
    after('stop server', function () {
        this.server.close();
    });
    after('stop selenium', function () {
        return this.driver.quit();
    });
    it('should open app', function () {
        this.driver.get('http://0.0.0.0:3000');
        return this.driver
            .findElement(webdriver.By.css('input'));
    });
    it('should search video', function () {
        return this.driver
            .findElement(webdriver.By.css('input'))
            .sendKeys('js')
            .then(() => this.driver.findElement(webdriver.By.css('form')).submit())
            .then(() => {
                return new Promise(function(resolve){
                    setTimeout(resolve, 1000)
                })
            })
            .then(() => this.driver
            .findElement(webdriver.By.css('li')));
    });
});