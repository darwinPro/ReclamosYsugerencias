import React, { Component } from 'react';
import Head from 'next/head'
import MenuAppbar from './Menu/components/menuAppbar';
import { Typography, IconButton } from '@material-ui/core';

class Layout extends Component {
    render() {
        const {children,titlebarra}=this.props
        return (
            <div>
                 <Head>
                    <title>{titlebarra}</title>
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                    />

                </Head>
                <div id="rootSnackBar"></div>
                <MenuAppbar title="Rapifac" tamano="h4" posision="stiky">
                    <IconButton>

                    </IconButton>
                </MenuAppbar>
                {
                    children
                }
                <MenuAppbar title="© 2018 RapiFac - Derechos Reservados" tamano="subtitle2" posision="fixed" >
                    <div style={{flex:1}}>
                    </div>
                    <Typography variant="subtitle2" style={{fontFamily:'Helvetica Neue'}} >
                            Desarrollado por BtaApps
                    </Typography>
                    <Typography variant="subtitle2" style={{fontFamily:'Helvetica Neue'}} >
                            Nueva versioin
                    </Typography>
                </MenuAppbar>
                 <style jsx global>{`
                    body{
                        margin:0;
                    }                    
                `}</style>
            </div>
        );
    }
}

export default Layout;