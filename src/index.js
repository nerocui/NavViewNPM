import React, { Component } from 'react';
import posed from "react-pose";
import Delay from 'react-delay';
import styled from 'styled-components';
import { tween } from "popmotion";
import hover from 'hover.css';

//HamBtn
const Bar1 = posed.div({
    normal:{rotate:0, y:0, transition:props=>tween({...props, duration:50})},
    expand:{rotate:45, y:10, transition:props=>tween({...props, duration:50})},
});

const Bar2 = posed.div({
    normal:{opacity:1, transition:props=>tween({...props, duration:50})},
    expand:{opacity:0, transition:props=>tween({...props, duration:50})}
});

const Bar3 = posed.div({
    normal:{rotate:0, y:0, transition:props=>tween({...props, duration:50})},
    expand:{rotate:-45, y:-10, transition:props=>tween({...props, duration:50})}
});


var StyledBar1 = styled(Bar1)`
    width: 35px;
    height: 4px;
    background-color: white;
    margin: 6px 0;
    transition: 0.4s;
`;

var LightStyledBar1 = styled(Bar1)`
    width: 35px;
    height: 4px;
    background-color: black;
    margin: 6px 0;
    transition: 0.4s;
`;

var StyledBar2 = styled(Bar2)`
    width: 35px;
    height: 4px;
    background-color: white;
    margin: 6px 0;
    transition: 0.4s;
`;

var LightStyledBar2 = styled(Bar2)`
    width: 35px;
    height: 4px;
    background-color: black;
    margin: 6px 0;
    transition: 0.4s;
`;

var StyledBar3 = styled(Bar3)`
    width: 35px;
    height: 4px;
    background-color: white;
    margin: 6px 0;
    transition: 0.4s;
`;

var LightStyledBar3 = styled(Bar3)`
    width: 35px;
    height: 4px;
    background-color: black;
    margin: 6px 0;
    transition: 0.4s;
`;

//HamBtn End

//Pane
var Acrylic = styled(posed.div({
    normal:{width:35, transition:props=>tween({...props, duration:200})},
    expand:{width:250, transition:props=>tween({...props, duration:200})}
}))`
    padding: 1em;
    position: relative;
    overflow: hidden;
    height: 100vh;
    &:before {
        filter: blur(10px);
        content: "";
        position: absolute;
        left: -10px;
        top: -10px;
        width: calc(100% + 20px);
        height: calc(100% + 20px);
        z-index: -1;
        background: url(${props=>props.theme.background}) center/cover;
        background-attachment: fixed;
    }
    &:after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        opacity: 0.35;
        border: 1px solid ${props => props.theme.main};
        background: ${props => props.theme.main};
        background-image: url(data:image/png;base64,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);
    }
    border-radius: 1px;
    box-shadow: 0 10px 30px rgba(121, 121, 121, 0.1), 0 1px 8px rgba(128, 128, 128, 0.2);
`;





//Pane End

//Navi Item
const Image = styled.img`
    height:30px;
    width:30px;
    margin:10px 35px 10px 0px;
    float:left;
`;
const Item = styled.div`
    display:table;
`;


var Text = styled.div`
    padding-top:15px;
    padding-right:20px;
    position:relative;
    float:left;
    color:white;
    -webkit-user-select: none; /* Safari */        
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
`;

var LightText = styled.div`
    padding-top:15px;
    padding-right:20px;
    position:relative;
    float:left;
    color:black;
    -webkit-user-select: none; /* Safari */        
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
`;

const ItemsContainer = styled.div`
    margin-top:40px;
    display:table;
    float:clear;
    cursor:pointer;
`;
//Navi Item End



export default class NavigationView extends Component {
    constructor(props){
        super(props);
        this.state = {
            expanded:false,
            theme:"dark"
        };
    }

    componentWillMount(){
        if(this.props.theme === "dark"){
            this.setState({theme:"dark"})
        }else if(this.props.theme === "light"){
            StyledBar1 = LightStyledBar1;
            StyledBar2 = LightStyledBar2;
            StyledBar3 = LightStyledBar3;
            Text = LightText;
            this.setState({theme:"light"});
        }
        
    }

    renderList(){
        return this.props.items.map(item=>{
            return (
                <Item className="hvr-glow" key={item.text} onClick={item.handler}>
                    <Image src={this.state.theme==="light"?item.lighticon:item.darkicon}/>
                    {this.state.expanded?<Delay wait={50}><Text>{item.text}</Text></Delay>:<div></div>}
                </Item>
            );
        });
    }

   

    render() {
        const theme = {
            main:this.state.theme === "dark"?"#000":"#fff",
            background:this.props.background == null?"":this.props.background
        };
        return (
            <Acrylic theme={theme} pose={this.state.expanded?"expand":"normal"}>
                <link rel="stylesheet" type="text/css" href={this.state.stylePath} />
                <div className="hvr-grow" onClick={()=>this.setState({expanded:!this.state.expanded})}>
                    <StyledBar1 pose={this.state.expanded? "expand":"normal"}/>
                    <StyledBar2 pose={this.state.expanded? "expand":"normal"}/>
                    <StyledBar3 pose={this.state.expanded? "expand":"normal"}/>
                </div>
                <ItemsContainer>
                    {this.renderList()}
                </ItemsContainer>
            </Acrylic>
            
        );
    }
}