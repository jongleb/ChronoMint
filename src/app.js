import React from 'react';
import {render} from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import themeDefault from './themeDefault';
import injectTapEventPlugin from 'react-tap-event-plugin';
import router from './router.js';

import IPFSDAO from './dao/IPFSDAO';
import OrbitDAO from './dao/OrbitDAO';
import AppDAO from './dao/AppDAO';
// import ExchangeDAO from './dao/ExchangeDAO';
// import LHTDAO from './dao/LHTDAO';
// import LHTProxyDAO from './dao/LHTProxyDAO';

import './styles.scss';
import 'font-awesome/css/font-awesome.css';
import 'flexboxgrid/css/flexboxgrid.css';

import ErrorPage from './pages/ErrorPage';

class App {
    start() {
        IPFSDAO.init().then(ipfsNode => {
            OrbitDAO.init(ipfsNode);

            /** Needed for onTouchTap @link http://stackoverflow.com/a/34015469/988941 */
            injectTapEventPlugin();

            // TODO: remove;
            // let exchangeAddress;
            // Promise.all([
            //     AppDAO.reissueAsset('LHT', 2500, localStorage.getItem('chronoBankAccount')),
            //     LHTDAO.init(localStorage.getItem('chronoBankAccount')),
            //     ExchangeDAO.getAddress()]
            // ).then((values) => {
            //     exchangeAddress = values[2];
            //     console.log(exchangeAddress);
            //     AppDAO.sendLht(exchangeAddress, 500, localStorage.getItem('chronoBankAccount'));
            //     AppDAO.sendLht(localStorage.getItem('chronoBankAccount'), 500, localStorage.getItem('chronoBankAccount'));
            // }).then(() => LHTProxyDAO.getAccountBalance(exchangeAddress))
            //     .then(res => console.log(res.toNumber()));

            // AppDAO.setExchangePrices(AppDAO.web3.toWei(0.01), AppDAO.web3.toWei(0.02), localStorage.getItem('chronoBankAccount'));

            render(
                <MuiThemeProvider muiTheme={themeDefault}>{router}</MuiThemeProvider>,
                document.getElementById('react-root')
            );
        }).catch(e => {
            render(
                <MuiThemeProvider muiTheme={themeDefault}>
                    <ErrorPage error={e}/>
                </MuiThemeProvider>,
                document.getElementById('react-root')
            );
        });
    }
}

export default new App();
