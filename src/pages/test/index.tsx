import { useEffect, useState } from 'react'
import { getUsers } from 'api/common'

const TestIndex = () => {
    const [users, setUsers] = useState<{ id: number; name: string }[]>([])

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const usersData = await getUsers()
                const users = usersData?.data
                setUsers(users)
            } catch (error) {
                console.error('유저 목록 로드 실패:', error)
            }
        }

        loadUsers()
    }, [])

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         try {
    //             const response = await axios.get('/api/users')
    //             setUsers(response?.data?.data)
    //         } catch (error) {
    //             console.error('Error fetching users:', error)
    //             setUsers([])
    //         }
    //     }

    //     fetchUsers()
    // }, [])

    return (
        <div>
            <h1>유저 목록</h1>
            <ul>
                {users.length ? (
                    users.map(user => <li key={user.id}>{user.name}</li>)
                ) : (
                    <li>데이터가 없습니다.</li>
                )}
            </ul>
        </div>
    )
}

export default TestIndex
