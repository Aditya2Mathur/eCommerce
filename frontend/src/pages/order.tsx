import React, { ReactElement, useState } from 'react'
import TableHOC from '../components/admin/TableHOC'
import { Link } from 'react-router-dom';

type DataType = {
    productName: string;
    productImage: ReactElement;
    _id: string;
    amount: number;
    quantity: number;
    discount: number;
    status: ReactElement;
    action: ReactElement;
}
const column: Column<DataType>[] = [
    {
        Header: "Name",
        accessor: "productName"
    },
    {
        Header: "Product",
        accessor: "productImage"
    },
    {
        Header: "ID",
        accessor: "_id"
    },
    {
        Header: "Amount",
        accessor: "amount"
    },
    {
        Header: "Quantity",
        accessor: "quantity"
    },
    {
        Header: "Discount",
        accessor: "discount"
    },
    {
        Header: "Status",
        accessor: "status"
    },
    {
        Header: "Action",
        accessor: "action"
    }
]
const Orders = () => {
    const [rows] = useState<DataType[]>([
        {
            productName: "Blue Jeans",
            productImage: <img src="productsImages/1704842703.jpg"></img>,
            _id: "aditya",
            amount: 51515,
            quantity: 5,
            discount: 599,
            status: <span>Processing</span>,
            action: <Link to={`/orders/aditya`}>Views</Link>,
        }]
    )
    const Table = TableHOC<DataType>(column, rows, "dashboard-product-box", "Orders", rows.length > 6)()
    return (
        <div>
            <h1>My order</h1>
            {Table}
        </div>
    )
}

export default Orders