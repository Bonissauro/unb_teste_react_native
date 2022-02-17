import { View, Image, TextInput, Alert, TouchableOpacity } from 'react-native';
import React from "react";
import { Dimensions } from 'react-native';
import { icone_excluir } from '../../assets/icone_excluir.png'

const larguraTela = Dimensions.get('screen').width;
const tamanhoImagem = (larguraTela*360)/428;
const larguraSlide = (larguraTela*380)/428;

export default function Slide({ lista, setLista, activeIndex, setActiveIndex, itemSlide }) {

    pressionouExcluir = () => {
    
        Alert.alert(
          "Excluir item",
          "Deseja mesmo excluir este item?",
          [
            {
              text: "Deixa pra lá",
              style: "cancel"
            },
            { text: "Sim", onPress: () => {

                    var t = lista.filter(function(e) { 
                        return (e.id+"") !== (itemSlide.id+"");
                    });

                    setLista(t);

                    if (lista.length>activeIndex){
                        setActiveIndex(lista.length-1);
                    }
    
                } 
            }
          ]
        );
    
    };
            
    return (
        <>        
          <View style={{
            backgroundColor:'lightgrey',
            borderRadius: 10,
            width: larguraSlide ,
            padding: 10,
            marginLeft: 25,
            marginRight: 25, }}>
                  <Image 
                      source = {{ uri: itemSlide.url }}                 
                      style={{
                      width: tamanhoImagem,
                      height: tamanhoImagem,
                      }}
                  />
              <TextInput
                placeholder='Legenda'
                defaultValue={itemSlide.nome}
                onChangeText={novoTexto => (itemSlide.nome = novoTexto)}
                style={{
                  height: 40,
                  margin: 12,
                  padding: 10,
                  borderBottomWidth: 1
                }}        
              />
          </View>
          <View style={{flex: 1, alignItems: "center", position: "absolute", width: tamanhoImagem, height: tamanhoImagem, marginLeft: 30, marginRight: 30, paddingTop: tamanhoImagem-25}}>
                  <TouchableOpacity onPress={pressionouExcluir} >
                  <Image                     
                      source = {require('../../assets/icone_excluir.png')} 
                      style={{
                      width: 60,
                      height: 60                    
                      }}
                  />
                  </TouchableOpacity>
          </View>
        </>
    );

}