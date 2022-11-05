import styled from "styled-components"

const Conteiner= styled.main`
width: 100%;
height: 50px;
background-color: red;
    h2{
        color: white;
        font-size: 52px;
        letter-spacing: 10px;
        margin: 0;
        text-shadow: 4px 3px 3px #949191;
    font-style: italic;
       }
       display: flex;
       align-items: center;
    justify-content: center;
    text-align: center;
    margin-bottom: 10px;

`

const Header = ( )=>{
return(
    <Conteiner>
<h2>Pizzaria AMB</h2>
    </Conteiner>
)

} 

export default Header