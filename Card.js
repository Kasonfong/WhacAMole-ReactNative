import React, {Component} from 'react'

import {
    TouchableOpacity,
    Text,
    Image,

}  from 'react-native'


class Card extends Component{
    render(){
        return(
            <TouchableOpacity onPress={this.props.onPress} style={{...this.props.style}}>

                {this.props.title == 'M'?
                <Image style={[{   width:50,
                    height:50, }]}  source={require('./assets/mole.webp')} />
                
                :
                <Image style={[ {   width:50,
                    height:50, }]} source={require('./assets/boom.png')} />
                } 



    
          </TouchableOpacity>
        )
    }
}

export default Card