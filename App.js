import{ React, Component,useState,useEffect} from 'react'
import {
  StatusBar,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  Pressable,

} from 'react-native'
import {Slider } from '@miblanchard/react-native-slider'; //npm i --save @miblanchard/react-native-slider
//import CountDown from 'react-native-countdown-component';

import Card from './Card'

 
class App extends Component{

    
 



    state = {
      
      mole:[],
  
      moleInRandom:[],
      noOfMoles:1,

      moleHit: 0,
      hitsCount:0,
      stagekilled:0,
      
      timeRemain: 60,
      isEnded: true,
      isPlaying: false,

      
    }


shuffle = (array) => {

  let currentIndex = array.length,  randomIndex;

 // While there remain elements to shuffle.
 while (currentIndex != 0) {

   // Pick a remaining element.
   randomIndex = Math.floor(Math.random() * currentIndex);
   currentIndex--;

   // And swap it with the current element.
   [array[currentIndex], array[randomIndex]] = [
     array[randomIndex], array[currentIndex]];
 }  


 return array;


}
/*
function shuffle(array) {
 let currentIndex = array.length,  randomIndex;

 // While there remain elements to shuffle.
 while (currentIndex != 0) {

   // Pick a remaining element.
   randomIndex = Math.floor(Math.random() * currentIndex);
   currentIndex--;

   // And swap it with the current element.
   [array[currentIndex], array[randomIndex]] = [
     array[randomIndex], array[currentIndex]];
 }

 return array;
}

above array shuffling method is 
from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array


*/




whackThisMole = (index) =>{
  

 // console.log(this.state.moleInRandom[index])
  let hitsCount= this.state.hitsCount
  hitsCount = hitsCount +1
  
  if(this.state.moleInRandom[index] == 'E' || this.state.moleInRandom[index] == 'K' ){
  
    this.setState({
      hitsCount,
    })
    //console.log('missed ' + this.state.hitsCount) 
    //hitsCount not updated
    }
  
    else if(this.state.moleInRandom[index] == 'M'){
  
    //console.log('whack!')
    
    let moleHit= this.state.moleHit 

    let stagekilled= this.state.stagekilled
    
    let moleInRandom = [...this.state.moleInRandom]

    moleInRandom[index] = 'K'
  
    moleHit= moleHit+1

    stagekilled = stagekilled +1 
  
    this.setState({
      hitsCount,
      moleHit,
      stagekilled,
      moleInRandom
    })
  
    // setstate hitcount ++, molehit ++, stagehit ++, set to K //stagekilled 

    
  
    }
 

}

result = (index) =>{
  //console.log('hitsCount '+this.state.hitsCount + 'molehit ' + this.state.moleHit + 'stagekilled ' + this.state.stagekilled)
  if( this.state.stagekilled == this.state.noOfMoles){
   // console.log('no of moles:'+this.state.noOfMoles +'\n')
   // console.log('all stagekilled, refresh new ')
   // console.log('isplaying?'+this.state.isPlaying)
    this.refreshNewPattern()
  }

}
 


refreshNewPattern = () =>{
  let mole= []

  for(let i=0; i<this.state.noOfMoles; i++){
    mole.push('M') //mole
  }

  for(let i=0;i<9-this.state.noOfMoles; i++){
    mole.push('E') // empty
  }

  let moleInRandom = this.shuffle(mole)
  this.setState({
    mole,
    moleInRandom,
   
    stagekilled:0,

  })

}


play = () =>{

  //console.log('isplaying?'+ this.state.isPlaying)
  let mole= []

  for(let i=0; i<this.state.noOfMoles; i++){
    mole.push('M') //mole
  }

  for(let i=0;i<9-this.state.noOfMoles; i++){
    mole.push('E') // empty
  }

    let moleInRandom = this.shuffle(mole)

    this.setState({
      mole,
      moleInRandom,
      moleHit: 0,
      hitsCount:0,
      stagekilled:0,

      isPlaying: true,
      isEnded: false

    })
    this.timer()

}
resetGame = () =>{
  this.setState({
    isPlaying: false,
    moleHit: 0,
    hitsCount:0,
    stagekilled:0,

  
  })
}


timer = () =>{
// 60*1000 = 60s 

//click start button run timer, time is up , change this.state.isEnd true, this.state.isplaying false
setTimeout(() =>{

    this.setState({

        isEnded :true,
        isplaying: false

    })

    let percentage= this.state.moleHit * 100 / this.state.hitsCount
    percentage = parseFloat(percentage.toPrecision(4));
    if (this.state.hitsCount == 0){
      percentage = 0
    }

   
    //bug***** .....---> 0/0 
  Alert.alert('time is up', `You have whacked ${this.state.moleHit} with ${this.state.hitsCount} hits (percentage: ${percentage}% )  `)
},10000)

}

componentDidUpdate(prevProps,prevState){

  
  
      if((prevState.noOfMoles !=  this.state.noOfMoles)){
        this.resetGame()
        
      }      
      if(prevState.hitsCount != this.state.hitsCount){
          this.result()
      }
   


}


  render(){

    
    return( 
    <> 

      <StatusBar />

      <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.heading}>Whack A Mole</Text>
            
            <Text style={styles.timer}>Time limit: {this.state.timeRemain} seconds

{/* 
            <CountDown
              until={60}
              timeToShow={['M',"S"]}
            /> */}
            
            </Text>
          </View>
          <View style={styles.main}>
                  <View style={styles.slider}>
                <Slider
                
                    value={this.state.noOfMoles}
                    maximumValue={4} minimumValue={1} step={1}
                    onValueChange={noOfMoles => this.setState({noOfMoles})}
                />
                <Text style={styles.sliderText}>Number of moles: {this.state.noOfMoles}</Text>
                {this.state.noOfMoles==4
                ?
                <Text style={styles.sliderText}>Difficulty: Very Hard </Text>
                :
                null
              }
                {this.state.noOfMoles==3
                ?
                <Text style={styles.sliderText}>Difficulty: Hard </Text>
                :
                null
              }
                {this.state.noOfMoles==2
                ?
                <Text style={styles.sliderText}>Difficulty: Medium </Text>
                :
                null
              }
                {this.state.noOfMoles==1
                ?
                <Text style={styles.sliderText}>Difficulty: Easy </Text>
                :
                null
              }
                

            </View>
        
            <View style={styles.gameBoard}>

             
              
             {this.state.isEnded? 
             
             null
           
            : this.state.moleInRandom.map((moleInRandom,index) =>
            <Card key={index} onPress={() => this.whackThisMole(index)} style={styles.button} fontSize={30}  title={moleInRandom} />
            
            )}
              
            </View>
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>
               
                  Whack {this.state.moleHit} moles with {this.state.hitsCount} hits
                
              
            </Text>
          
                { this.state.isEnded
                  ?<TouchableOpacity onPress={() => this.play()} style = {styles.playButtion}>
                  <Text style={styles.playButtionText}> Play </Text>
                  </TouchableOpacity> 
                  :
                   null
                }
               
                

               

          </View>


      </SafeAreaView>


    </>
    
    )
  }
}

export default  App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex:1,
    backgroundColor: '#d3d3d3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading:{
    fontSize:45,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timer:{
    color:"red",
    fontSize:30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  main: {
    flex:3,
    backgroundColor: '#87cefa',
  },
  
   footer: {
      flex:1,
    backgroundColor: '#d3d3d3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText:{

    fontSize:30,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  gameBoard: {
    flex:1,
    flexDirection:'row',
    flexWrap: 'wrap',
    justifyContent:'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  button:{
    backgroundColor:"white",
    borderRadius: 30,
    width:50,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    margin:((Dimensions.get('window').width-50*4))/(3*2),
  },
  buttonText:{
    color:'black',
    fontSize:30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  playButtion:{
    backgroundColor:"red",
    borderRadius: 30,
    width:170,
    height:50,
    justifyContent:'center',
    alignItems:'center',
  },
  playButtionText:{
    color:'white',
    fontSize:30,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  slider: {
    flex: 0.3,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
},
sliderText:{
  color:'black',
  fontSize:30,
  fontWeight: 'bold',
  textAlign: 'center',
},
startButtion:{
  backgroundColor:"red",
  borderRadius: 30,
  width:170,
  height:50,
  justifyContent:'center',
  alignItems:'center',
},
startButtionText:{
  color:'white',
  fontSize:30,
  fontWeight: 'bold',
  textAlign: 'center',


},

})