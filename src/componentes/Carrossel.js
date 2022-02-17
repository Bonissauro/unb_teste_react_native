import { View, Image, TextInput, Alert, TouchableOpacity } from 'react-native';
import React from "react";
import { Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const larguraTela = Dimensions.get('screen').width;
const tamanhoImagem = (larguraTela*360)/428;
const larguraSlide = (larguraTela*380)/428;

export default function Carrossel({ lista, setLista, activeIndex, setActiveIndex, itemSlide }) {
            
    const _renderizaSlide = ( { item } ) => {

      return Slide({lista: lista, setLista: setLista, activeIndex: activeIndex, setActiveIndex: setActiveIndex, itemSlide: item});
    
    }


    return (
        <>        
          <Carousel
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
        </>
    );

}