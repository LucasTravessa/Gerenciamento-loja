import { faker } from "@faker-js/faker"
import SellsTable from "./table"

const sells = [
    {
        id: faker.number.int(),
        product: faker.commerce.productName(),
        amount: faker.number.int(),
        suplier: faker.company.name()
    }
] 

export default function Vendas() {
    return(
        <SellsTable sells={sells}/>
    )
}