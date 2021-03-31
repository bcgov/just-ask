import init, { getOrgInstallations } from "../utils/init";
import installations from '../fixtures/installations';
import discovery from '../fixtures/discovery';
import nock from 'nock';


import { getConfig, getSSO } from "../utils/config";
import log from 'log';
import { getOidcDiscovery } from "../utils/sso";

jest.mock('../utils/config.js')
jest.mock('log', () => ({
  warn: jest.fn(),
  error: jest.fn(),
  info: jest.fn(),
}));
jest.mock('../utils/sso.js');


describe('init', () => {
  it('throws if getting SSO config fails', async () => {
    getSSO.mockImplementation(() => {throw new Error('uhoh!')});
    await expect(init()).rejects.toThrow();
    expect(log.warn).toHaveBeenCalledWith("Unable to get sso config. Does it exist?");
  });

  it('initializes without failure', async () => {
    getSSO.mockReturnValueOnce({
      "realm": "devhub",
      "baseURL": "https://oidc.gov.bc.ca",
      "client": "devhub"
    });
    const orgs = installations.filter(installation => installation.target_type === 'Organization');

    getConfig.mockReturnValueOnce(({orgs: orgs.map(o => o.account.login)}));
    getOidcDiscovery.mockReturnValueOnce(Promise.resolve(discovery));
    nock('https://api.github.com').get('/app/installations')
    .reply(200, installations);
    nock.cleanAll();
    await expect(init()).resolves;
  });
});
describe('Octokit initialization', () => {
  afterEach(() => {

  });
  beforeEach(() => {
    nock.disableNetConnect();
  });
  
  describe('getOrgInstallations', () => {

    it('Throws if config.json is undefined or orgs are misconfigured', async () => {
      nock('https://api.github.com').get('/app/installations')
      .reply(200, installations
      );
      getConfig.mockReturnValueOnce('fs');
      getConfig.mockReturnValueOnce(undefined);
      getConfig.mockReturnValueOnce(({orgs: String}));
      getConfig.mockReturnValueOnce(({orgs: [ 1, Boolean, 'hello world']}));
      getConfig.mockReturnValueOnce(({orgs: [ 'hello world']}));
      await expect(getOrgInstallations()).rejects.toThrow();
      await expect(getOrgInstallations()).rejects.toThrow();
      await expect(getOrgInstallations()).rejects.toThrow();
      await expect(getOrgInstallations()).rejects.toThrow();
      await expect( getOrgInstallations()).resolves;
    });

    it('Throws if config.json orgs is empty',async () => {
      nock('https://api.github.com').get('/app/installations')
      .reply(200, installations
      );
      getConfig.mockReturnValueOnce(({orgs: [ ]}));
      await expect( getOrgInstallations(installations)).rejects.toThrow();
    });

    it('logs if App has no installations', async () => {
      nock('https://api.github.com').get('/app/installations')
      .reply(200, []
      );
      getConfig.mockReturnValue(({orgs: [ 'hello world']}));
      await getOrgInstallations()
      expect(log.info).toHaveBeenCalledWith('This github app has no public org installations yet');
    });

    it('logs if App has installations but they don\'t match configured orgs', async () => {
      nock('https://api.github.com').get('/app/installations')
      .reply(200, installations
      );
      getConfig.mockReturnValueOnce(({orgs: [ Math.random() * 100 + '']}));
      await getOrgInstallations()
      expect(log.info).toHaveBeenCalledWith('This github app has no public org installations yet');
    });


    it('it returns only org installations', async () => {
      nock('https://api.github.com').get('/app/installations')
      .reply(200, installations);
      
      const orgs = installations.filter(installation => installation.target_type === 'Organization');

      getConfig.mockReturnValueOnce(({orgs: orgs.map(o => o.account.login)}));
      await expect(getOrgInstallations()).resolves.toEqual(orgs);
    });
  });
})