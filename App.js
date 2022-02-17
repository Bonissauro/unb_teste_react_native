import { useState, useEffect } from 'react';
import { Alert, Text, View, SafeAreaView, StatusBar, Image, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import React from "react";
import { Dimensions } from 'react-native';

import { Camera } from 'expo-camera';

import Slide from './src/componentes/Slide';

const larguraTela = Dimensions.get('screen').width;
const alturaTela = Dimensions.get('screen').height;
const larguraSlide = (larguraTela*380)/428;
  
export default function App() {

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const [cameraAberta, setCameraAberta] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [lista, setLista] = useState(
    [
      // {
      //   id: "1",
      //   nome: "Tomate",
      //   url: "https://st.depositphotos.com/1063437/1966/i/600/depositphotos_19668189-stock-photo-raw-vegetables-in-wicker-basket.jpg"
      // },
      // {
      //   id: "2",
      //   nome: "Brócolis",
      //   url:"https://static.significados.com.br/foto/verduras-e-legumes-fb.jpg"
      // },
      // {
      //   id: "3",
      //   nome: "Batata",
      //   url:"https://conteudo.imguol.com.br/c/entretenimento/fa/2019/04/18/legumes-e-verduras-1555620381375_v2_615x300.jpg"
      // },
      // {
      //   id: "4",
      //   nome: "Pepino",
      //   url:"https://i.pinimg.com/736x/9f/d9/b7/9fd9b7f8247318207fe3115b01320409.jpg"
      // },
      // {
      //   id: "5",
      //   nome: "Abóbora",
      //   url:"https://a-static.mlcdn.com.br/1500x1500/1200-sementes-verduras-e-legumes-30-tipos-separados-kit-surpresa-isla-sementes/semearshop/14c81a42e40e11eb81eb4201ac18500e/c67c919c3eec962c703f5ae1a48c2524.jpg"
      // },
  ]
  );
    
  listar = () => {

    console.log(" ");
    console.log(" ");
    console.log(" ");
    console.log(" ");
    console.log("================");
    console.log("Lista atualizada");
    console.log("================");

    lista.map(d => {
      console.log(d.nome);
    })
    console.log("================");

    console.log(" ");
    console.log(" ");
    console.log(" ");

  }

  pressionou = () => {

    Alert.alert(
      "Nova imagem",
      "Deseja buscar da galeria ou abrir sua câmera?",
      [
        {
          text: "Deixa pra lá",
          style: "cancel"
        },
        { text: "Câmera", onPress: () => {

          takePicture();

        } },
        { text: "Galeria"}
      ]
    );

  };

  
  const _renderizaSlide = ( { item } ) => {

    return Slide({lista: lista, setLista: setLista, activeIndex: activeIndex, setActiveIndex: setActiveIndex, itemSlide: item});
  
  }
  
  const _corpo = () => {

    return <Text>TESTE</Text>;
  
  }

  takePicture = () => {

    console.log("Camera disparada");

    if (this.camera) {
      console.log("true");
      this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
    }else{
      console.log("false");
    }

 };

  onPictureSaved = photo => {

      var l = lista;

      l.unshift({
        id: photo.uri,
        nome: "SEM LEGENDA",
        url: photo.uri
      })

      setLista(l);

      setActiveIndex(0);

      setCameraAberta(false);

  } 
  
  function Corpo(props) {

    if (lista.length==0){
      
      return <View style={{flex: 1, alignItems:  "center",  paddingTop: 250}}>
        <Text style={{fontSize: 24, fontWeight: "bold", textAlign: "center"}}>AINDA NAO HÁ FOTOS NO SEU ÁLBUM!</Text>
      </View>

    }else{

      return <Carousel
              ref={ref => this.carousel = ref}
              data={lista}
              sliderWidth={larguraTela}
              itemWidth={larguraTela}
              renderItem={_renderizaSlide}
              style={{backgroundColor: "red"}}
              loop={ true }
              onSnapToItem = { (index) => {
                setActiveIndex( index ); 
                } 
              } />;
    }

  }

  if (!cameraAberta){

  return (<SafeAreaView style={{flex: 1}}>
    <View style={{ flex: 1 }}>

        <Text onPress={listar} style={{padding: 30, fontSize: 32, fontWeight: "bold", alignItems: "flex-start"}}>{(cameraAberta)?"Câmera aberta":"App Teste"}</Text>

        <Corpo />

        <Text
              onPress={() => {     
                setCameraAberta(!cameraAberta);            
               }} 
              style={{width: larguraSlide, textAlign: "center", fontSize: 22, fontWeight: "bold", backgroundColor: "green", color: "white", padding: 20, alignItems: "center", margin: 20, borderRadius: 15}}>
              ADD IMAGE
        </Text>

        <StatusBar />

    </View>
    </SafeAreaView>);

  }else{

    return <Camera style={{flex:1}} type={type} 
    ref={ref => {
      this.camera = ref;
    }}>
    <View style={{flex: 1, alignItems: "center", position: "absolute", width: larguraTela-40, height: alturaTela, margin: 20}}>

          <View style={{marginTop: alturaTela-120, flexDirection: "row"}}>
          <TouchableOpacity style={{flex:1}}  onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
            }} >
            <Image                     
                source = {{uri: "https://www.pngkey.com/png/full/242-2424713_the-refresh-button-addiction-update-button-logo-png.png"}} 
                style={{
                width: 60,
                height: 60,
                }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {

            takePicture();

            // setCameraAberta(!cameraAberta);
          }} >
            <Image                     
                source = {{uri: "https://www.sambando.com/wp-content/uploads/camera-icon.png"}} 
                style={{
                width: 60,
                height: 60                    
                }}
            />
          </TouchableOpacity>
          </View>
    </View>
  </Camera>;

  }

}

