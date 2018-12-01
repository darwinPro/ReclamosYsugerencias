import React, { Component } from 'react';
import Layout from '../components/Layout';
import { Button, Typography } from '@material-ui/core';
import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/database'
import 'firebase/firestore'

import Head from 'next/head'
import { async } from '@firebase/util';


if (!firebase.apps.length) {
    var config= {
        apiKey: "AIzaSyDRr4xJB6BxM5Uu-xHEe7lo_6hVZ_hC8DU",
        authDomain: "facbtaapps-2bd69.firebaseapp.com",
        databaseURL: "https://facbtaapps-2bd69.firebaseio.com",
        projectId: "facbtaapps-2bd69",
        storageBucket: "facbtaapps-2bd69.appspot.com",
        messagingSenderId: "182776326473"
      }

    
    const firebaseApp = firebase.initializeApp(config, {
        timestampsInSnapshots: true
    });

    const api = firebaseApp.firestore()

    const settings = { timestampsInSnapshots: true };
    api.settings(settings)
}

class Index extends Component {

    state = {
        estadosesion: '',
        initialState: false,
        codigo:'',
        estado:false
    }
    componentDidMount() {        
        document.cookie= "nombre=nopse domain=http://192.168.1.97:3000/";
        console.log(document.cookie)
        const database=firebase.database()       
        const dataref=database.ref(`sessions/0hTOcqlEp2Uk7A4uhX1wvWmzsoP2`)
        const collectio=dataref.orderByChild('estado').equalTo(true)
        collectio.on('value',(snapshot)=>{
            if(snapshot.val()){
                this.setState({
                    estadosesion:'Iniciado',
                    estado:true
                })
            }else{
                this.setState({
                    estadosesion:'Cerrardo'
                })
            }
        })
        setTimeout(()=>{
            this.setState({
                initialState:true
            })
        },300)
    }
    
    guidGenerator = () => {
        var S4 = () => {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return ( S4() + S4() + S4());
    }

    iniciarSesion = async (uid) => {
        const codigo=await this.guidGenerator()
        this.setState({
            codigo:codigo
        })
        const database=firebase.database()
        console.log(database)
        const dataref=database.ref(`sessions/${uid}/${codigo}`)
        dataref.set({
            codigo:codigo,
            estado:true
        })
    }
    cerrarSesion = (uid) => {
        const database=firebase.database()
        const dataref=database.ref(`sessions/${uid}/${this.state.codigo}`)
        dataref.update({
            estado:false
        })
    }

    render() {
        return (
            <div>

                {
                    this.state.initialState ?
                        < Layout titlebarra="RapiFac Asistencia" >
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                                <Button variant='contained'
                                    color="primary"
                                    disabled={this.state.estado}
                                    onClick={()=>{
                                        this.iniciarSesion('0hTOcqlEp2Uk7A4uhX1wvWmzsoP2')
                                    }}
                                    style={{ margin: 10 }}>
                                    <Typography>
                                        Iniciar Sesion
                        </Typography>
                                </Button>
                                <Button 
                                color="secondary" 
                                variant='contained'
                                onClick={()=>{
                                    this.cerrarSesion('0hTOcqlEp2Uk7A4uhX1wvWmzsoP2')
                                }}>
                                    <Typography>
                                        Cerrar Sesion
                        </Typography>
                                </Button>
                                <Typography>{this.state.estadosesion}</Typography>
                            </div>
                        </Layout >
                        :
                        <></>
                }
            </div>
        );
    }
}

export default Index;