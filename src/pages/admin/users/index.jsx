import { Table } from "antd"
import axios from "axios"
import { useQuery } from "react-query"

const UserAdmin = () => {
    const { data, isLoading } = useQuery("users-admin", () => {
        return axios.get("https://auto-test-api-8ch5.onrender.com/users")
    })

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
            render: (name, item) => {
                return <>{item?.firstname} {item?.lastName}</>
            }
        }, {
            title: 'User Name',
            dataIndex: 'userName',
            key: 'userName',
        }, {
            title: 'Number',
            dataIndex: 'number',
            key: 'number',
        }, {
            title: 'Gmail',
            dataIndex: 'email',
            key: 'email',
        }, {
            title: 'Role',
            dataIndex: 'rol',
            key: 'rol',
        },
    ]

    return <>
        <Table
            columns={columns}
            loading={isLoading}
            dataSource={data?.data} />
    </>
}
export default UserAdmin
