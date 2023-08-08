import ChineseCategory from '../assests/ChineseCategory.png'
import BurgerCategory from '../assests/BurgerCategory.png'
import PizzaCategory from '../assests/PizzaCategory.png'
import DrinkCategory from '../assests/DrinkCategory.png'
import PastaCategory from '../assests/PastaCategory.png'
import { BsFillPersonLinesFill } from 'react-icons/bs'
import SoupCategory from '../assests/SoupCategory.png'
import AllCategory from '../assests/AllCategory.png'
import { FaFacebookSquare } from 'react-icons/fa'
import Chinese from '../assests/Chinese.png'
import { BsInstagram } from 'react-icons/bs'
import Drinks from '../assests/Drinks.png'
import Burger from '../assests/Burger.png'
import { FaTiktok } from 'react-icons/fa'
import Pasta from '../assests/Pasta.png'
import Pizza from '../assests/Pizza.png'
import Soup from '../assests/Soup.png'
import H1 from '../assests/H1.png'
import H2 from '../assests/H2.png'
import H3 from '../assests/H3.png'
import H4 from '../assests/H4.png'


export const APIURL = process.env.REACT_APP_API_URL

export const PopularFood =
    [
        { id: 'f1', image: Chinese, name: "Lobster", category: "chinese", price: 1500 },
        { id: 'f2', image: Pizza, name: "Laziz pizza ", category: "pizzas", price: 799 },
        { id: 'f3', image: Soup, name: "Legumes", category: "soups", price: 680 },
        { id: 'f4', image: Pasta, name: "Penne pasta", category: "pastas", price: 320 },
        { id: 'f5', image: Drinks, name: "Mojito", category: "drinks", price: 220 },
        { id: 'f6', image: Burger, name: "Turkey burger", category: "burgers", price: 190 },
    ];



export const FooterItems = [
    { id: "h1", image: H1, title: "No minimum order" },
    { id: "h2", image: H2, title: "Free Delivery " },
    { id: "h3", image: H3, title: "Cash back with every order" },
    { id: "h4", image: H4, title: "TPay online or cash on delivery" }
];

export const MenuCategory = [

    { id: 0, title: "All", category: "all", image: AllCategory },
    { id: 1, title: "Drinks", category: "drinks", image: DrinkCategory },
    { id: 2, title: "Pizzas", category: "pizzas", image: PizzaCategory },
    { id: 3, title: "Soups", category: "soups", image: SoupCategory },
    { id: 4, title: "Chinese", category: "chinese", image: ChineseCategory },
    { id: 5, title: "Burgers", category: "burgers", image: BurgerCategory },
    { id: 6, title: "Pastas", category: "pastas", image: PastaCategory },

]
export const Category = [

    { id: 1, title: "Drinks", category: "drinks", },
    { id: 2, title: "Pizzas", category: "pizzas", },
    { id: 3, title: "Soups", category: "soups", },
    { id: 4, title: "Chinese", category: "chinese", },
    { id: 5, title: "Burgers", category: "burgers", },
    { id: 6, title: "Pastas", category: "pastas", },

]

export const SocialData = [
    {
        id: 1,
        child: <>Facebook <FaFacebookSquare size={25} /></>,
        href: '#',
        style: 'rounded-tr-md',
        delay: 100
    },
    {
        id: 2,
        child: <>Instagram <BsInstagram size={25} /></>,
        href: '#',
        delay: 300
    },
    {
        id: 3,
        child: <> Tiktok <FaTiktok size={25} /></>,
        href: '#',
        delay: 500
    },
    {
        id: 4,
        child: <>Reyzon <BsFillPersonLinesFill size={25} /></>,
        href: 'https://github.com/R3yz0n',
        style: 'rounded-br-md',
        download: true,
        delay: 700
    },
];