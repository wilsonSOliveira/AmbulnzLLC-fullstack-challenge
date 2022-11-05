import styled from "styled-components"
import ImgPizza from "../Img/pizza.jpg"

export const ContainerLi = styled.li`
    border: 1px solid black;
    margin: 1em;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding:3px;
    background-color: white;

    h3,
    .card-price {
        text-align: center;
    }


    button{
        width: 60%
    }
`

function PizzaCard(props) {
    const { pizza, addToCart } = props

    return (
        <ContainerLi>
            <img src={ImgPizza}/>
            <h3>{pizza.name}</h3>
            <p className="card-price">
                {pizza.price.toLocaleString(
                    'pt-br',
                    { style: 'currency', currency: 'USD' }
                )}
            </p>
            <p>
                {pizza.ingredients.map((item) => {
                    return (
                        <span key={item}>{`${item} `}</span>
                    )
                })}
            </p>
            <button onClick={() => addToCart(pizza)}>Adicionar no carrinho</button>
        </ContainerLi>
    )
}

export default PizzaCard